import {Icon, IconName} from '@app/components/atoms/icon';
import {colors} from '@app/styles';
import clsx from 'clsx';
import React, {useCallback, useEffect, useState} from 'react';
import {
  KeyboardTypeOptions,
  NativeSyntheticEvent,
  Pressable,
  TextInput,
  TextInputFocusEventData,
  View,
} from 'react-native';

type Props = {
  placeholder?: string;
  onChangeText?: (text: string) => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  value?: string;
  size?: 'sm' | 'md' | 'lg';
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  leadingIcon?: IconName;
  trailingIcon?: IconName;
  isTextArea?: boolean;
  numberOfLines?: number;
};

const SIZE_STYLES = {
  sm: {height: 'h-10', icon: 18, paddingHorizontal: 'px-3', text: 'text-sm', textAreaMinHeight: 'min-h-24'},
  md: {height: 'h-12', icon: 22, paddingHorizontal: 'px-4', text: 'text-base', textAreaMinHeight: 'min-h-32'},
  lg: {height: 'h-14', icon: 26, paddingHorizontal: 'px-5', text: 'text-lg', textAreaMinHeight: 'min-h-40'},
} as const;

export const TextArea: React.FC<Props> = ({
  placeholder,
  onChangeText,
  onBlur,
  value,
  size = 'md',
  keyboardType = 'default',
  secureTextEntry = false,
  leadingIcon,
  trailingIcon,
  isTextArea = false,
  numberOfLines = 4,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    setHasValue(!!value);
    setIsSecure(secureTextEntry);
  }, [value, secureTextEntry]);

  const toggleSecure = useCallback(() => {
    setIsSecure(prev => !prev);
  }, []);

  const {height, icon, paddingHorizontal, text, textAreaMinHeight} = SIZE_STYLES[size];

  return (
    <View
      className={clsx('flex-row w-full border rounded-xl', isTextArea ? textAreaMinHeight : height, paddingHorizontal, {
        'items-start': isTextArea,
        'items-center': !isTextArea,
        'border-gray-400': !isFocused,
        'border-orange-500': isFocused,
      })}>
      {leadingIcon && (
        <View className={clsx('mr-2', isTextArea && 'mt-3')}>
          <Icon name={leadingIcon} size={icon} color={colors.gray[500]} />
        </View>
      )}

      <TextInput
        value={value}
        className={clsx('p-0 flex-1 h-full', text, {
          'pt-3': isTextArea,
        })}
        placeholder={placeholder}
        onChangeText={e => {
          setHasValue(!!e);
          onChangeText?.(e);
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={e => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        keyboardType={keyboardType}
        secureTextEntry={!isTextArea && isSecure}
        multiline={isTextArea}
        numberOfLines={isTextArea ? numberOfLines : 1}
        textAlignVertical={isTextArea ? 'top' : 'center'}
      />

      {trailingIcon && (
        <View className={clsx('ml-2', isTextArea && 'mt-3')}>
          <Icon name={trailingIcon} size={icon} color={colors.gray[500]} />
        </View>
      )}

      {!isTextArea && secureTextEntry && hasValue && (
        <Pressable onPress={toggleSecure} className="ml-2">
          <Icon
            name={isSecure ? 'visibility_off' : 'visibility'}
            size={icon}
            color={isSecure ? colors.gray[400] : colors.gray[600]}
          />
        </Pressable>
      )}
    </View>
  );
};
