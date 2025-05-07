import {Icon} from '@app/components/atoms/icon';
import {colors} from '@app/styles';
import clsx from 'clsx';
import React, {useEffect, useImperativeHandle, useRef, useState} from 'react';
import {Pressable, Text, View} from 'react-native';

export type QuantityButtonRef = {
  reset: () => void;
  getValue: () => number;
  setValue: (value: number) => void;
};

type Props = {
  onChange?: (quantity: number) => void;
  textColor?: string;
  ref?: React.RefObject<QuantityButtonRef | null>;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  defaultValue?: number;
};

export const QuantityButton: React.FC<Props> = ({
  onChange,
  textColor = colors.orange[500],
  size = 'sm',
  ref,
  defaultValue = 0,
}) => {
  const [value, setValue] = useState(defaultValue);
  const isFirstRender = useRef(true);

  const handleIncrement = () => setValue(prev => prev + 1);
  const handleDecrement = () => setValue(prev => (prev > 0 ? prev - 1 : 0));

  useImperativeHandle(ref, () => ({
    reset: () => setValue(0),
    getValue: () => value,
    setValue: (val: number) => setValue(val),
  }));

  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    // Skip the onChange call on the first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    onChange?.(value);
  }, [value]);

  const sizeClasses = {
    xs: {
      button: 'w-6 h-6',
      icon: 16,
      text: 'text-xs',
    },
    sm: {
      button: 'w-8 h-8',
      icon: 16,
      text: 'text-sm',
    },
    md: {
      button: 'w-10 h-10',
      icon: 20,
      text: 'text-base',
    },
    lg: {
      button: 'w-12 h-12',
      icon: 24,
      text: 'text-lg',
    },
  }[size];

  return (
    <View className="flex-row items-center justify-between gap-4 bg-white border-[0.5px] border-gray-300 rounded-md overflow-hidden">
      <Pressable
        onPress={handleDecrement}
        className={clsx('border-r-[0.5px] border-r-gray-300 items-center justify-center', sizeClasses.button)}>
        <Icon
          name="check_intermediate_small"
          size={sizeClasses.icon}
          color={value > 0 ? colors.gray[500] : colors.gray[300]}
        />
      </Pressable>
      <Text className={clsx('', sizeClasses.text)} style={{color: textColor}}>
        {value}
      </Text>
      <Pressable
        onPress={handleIncrement}
        className={clsx('border-l-[0.5px] border-l-gray-300 items-center justify-center', sizeClasses.button)}>
        <Icon name="add" size={sizeClasses.icon} color={colors.gray[600]} />
      </Pressable>
    </View>
  );
};
