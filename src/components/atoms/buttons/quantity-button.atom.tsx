import {Icon} from '@app/components/atoms/icon';
import {colors} from '@app/styles';
import React, {useEffect, useImperativeHandle, useState} from 'react';
import {Pressable, Text, View} from 'react-native';

export type QuantityButtonRef = {
  reset: () => void;
  getValue: () => number;
  setValue: (value: number) => void;
};

type Props = {
  onChange?: (quantity: number) => void;
  ref?: React.RefObject<QuantityButtonRef | null>;
};

export const QuantityButton: React.FC<Props> = ({onChange, ref}) => {
  const [value, setValue] = useState(0);

  const handleIncrement = () => {
    setValue(prev => prev + 1);
  };

  const handleDecrement = () => {
    setValue(prev => prev - 1);
  };

  useImperativeHandle(ref, () => ({
    reset: () => {
      setValue(0);
    },
    getValue: () => value,
    setValue: (val: number) => setValue(val),
  }));

  useEffect(() => {
    onChange?.(value);
  }, [value]);

  return (
    <View className="flex-row items-center justify-between gap-4 bg-white border border-gray-300 rounded-md overflow-hidden">
      <Pressable onPress={handleDecrement} className="border-r border-r-gray-300 w-8 h-8 items-center justify-center">
        <Icon name="check_intermediate_small" size={20} color={value > 0 ? colors.gray[500] : colors.gray[300]} />
      </Pressable>
      <Text className="text-sm text-orange-500">{value}</Text>
      <Pressable onPress={handleIncrement} className="border-l border-l-gray-300 w-8 h-8 items-center justify-center">
        <Icon name="add" size={20} color={colors.gray[600]} />
      </Pressable>
    </View>
  );
};
