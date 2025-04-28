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
};

// Size configuration
const SIZE_STYLES = {
  sm: {height: 'h-10', icon: 18, paddingHorizontal: 'px-3', text: 'text-sm'},
  md: {height: 'h-12', icon: 22, paddingHorizontal: 'px-4', text: 'text-base'},
  lg: {height: 'h-14', icon: 26, paddingHorizontal: 'px-5', text: 'text-lg'},
} as const;

export const Input: React.FC<Props> = ({
  placeholder,
  onChangeText,
  onBlur,
  value,
  size = 'md',
  keyboardType = 'default',
  secureTextEntry = false,
  leadingIcon,
  trailingIcon,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  useEffect(() => {
    setHasValue(!!value);
    setIsSecure(secureTextEntry);
  }, []);

  const toggleSecure = useCallback(() => {
    setIsSecure(prev => !prev);
  }, []);

  const {height, icon, paddingHorizontal, text} = SIZE_STYLES[size];

  return (
    <View
      className={clsx('flex-row w-full items-center border rounded-xl', height, paddingHorizontal, {
        'border-gray-400': !isFocused,
        'border-gray-500': isFocused,
      })}>
      {leadingIcon && (
        <View className="mr-2">
          <Icon name={leadingIcon} size={icon} color={colors.gray[500]} />
        </View>
      )}

      <TextInput
        value={value}
        className={clsx('p-0 h-full flex-1', text)}
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
        secureTextEntry={isSecure}
      />

      {trailingIcon && (
        <View className="ml-2">
          <Icon name={trailingIcon} size={icon} color={colors.gray[500]} />
        </View>
      )}

      {secureTextEntry && hasValue && (
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
