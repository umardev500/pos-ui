import {Icon, IconName} from '@app/components/atoms/icon';
import {colors} from '@app/styles';
import clsx from 'clsx';
import React, {useCallback, useState} from 'react';
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
  size?: 'md' | 'lg';
  keyboardType?: KeyboardTypeOptions;
  secureTextEntry?: boolean;
  leadingIcon?: IconName;
};

export const Input: React.FC<Props> = ({
  placeholder,
  onChangeText,
  onBlur,
  value,
  size = 'md',
  keyboardType = 'default',
  secureTextEntry = false,
  leadingIcon,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const [hasValue, setHasValue] = useState(!!value);

  const toggleSecure = useCallback(() => {
    setIsSecure(prev => !prev);
  }, []);

  return (
    <View
      className={clsx('flex-row items-center border rounded-xl px-4', {
        'border-gray-400': !isFocused,
        'border-gray-500': isFocused,
        'h-12': size === 'md',
        'h-14': size === 'lg',
      })}>
      {leadingIcon && (
        <View className="mr-2">
          <Icon name={leadingIcon} size={size === 'md' ? 22 : 24} color={colors.gray[500]} />
        </View>
      )}

      <TextInput
        value={value}
        className="p-0 h-full flex-1"
        placeholder={placeholder}
        onChangeText={e => {
          setHasValue(!!e);
          onChangeText?.(e);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={e => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        keyboardType={keyboardType}
        secureTextEntry={isSecure}
      />

      <View className="items-center justify-center">
        {secureTextEntry && hasValue && (
          <Pressable onPress={toggleSecure}>
            <Icon
              name={isSecure ? 'visibility_off' : 'visibility'}
              size={24}
              color={isSecure ? colors.gray[600] : colors.gray[400]}
            />
          </Pressable>
        )}
      </View>
    </View>
  );
};
