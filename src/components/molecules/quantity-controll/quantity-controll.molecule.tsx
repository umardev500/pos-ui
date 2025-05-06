// components/molecules/QuantityControl.tsx
import {Icon} from '@app/components/atoms';
import {colors} from '@app/styles';
import React, {useEffect, useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

type Props = {
  value?: number; // initial value
  onIncrement?: (value: number) => void;
  onDecrement?: (value: number) => void;
};

export const QuantityControl: React.FC<Props> = ({value = 0, onIncrement, onDecrement}) => {
  const [currentValue, setCurrentValue] = useState(value);

  const handleDecrement = () => {
    if (!(currentValue <= 1)) {
      const newValue = currentValue - 1;
      setCurrentValue(newValue);
      onDecrement?.(newValue);
    }
  };

  const handleIncrement = () => {
    const newValue = currentValue + 1;
    setCurrentValue(newValue);
    onIncrement?.(newValue);
  };

  // If parent value prop changes, update local state (optional sync)
  useEffect(() => {
    setCurrentValue(value);
  }, [value]);

  return (
    <View className="flex-row items-center gap-2">
      <TouchableOpacity onPress={handleDecrement} disabled={currentValue <= 0}>
        <Icon
          name="check_intermediate_small"
          size={16}
          color={currentValue > 0 ? colors.gray[400] : colors.gray[300]}
        />
      </TouchableOpacity>
      <Text className="text-gray-500 text-sm">{currentValue}</Text>
      <TouchableOpacity onPress={handleIncrement}>
        <Icon name="add" size={16} color={colors.gray[500]} />
      </TouchableOpacity>
    </View>
  );
};
