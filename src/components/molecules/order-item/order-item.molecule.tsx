import {product10} from '@app/assets/images';
import {IconButton} from '@app/components/atoms';
import {QuantityControl} from '@app/components/molecules';
import {colors} from '@app/styles';
import {CartItem} from '@app/types';
import React from 'react';
import {Image, Text, View} from 'react-native';

type Props = {
  item?: CartItem;
  onIncrement?: (num: number, item?: CartItem) => void;
  onDecrement?: (num: number, item?: CartItem) => void;
};

export const OrderItem: React.FC<Props> = ({item, onIncrement, onDecrement}) => {
  const handleIncrement = (num: number) => onIncrement?.(num, item);
  const handleDecrement = (num: number) => onDecrement?.(num, item);

  return (
    <View className="px-4">
      <View className="border bg-white border-gray-300 border-dashed rounded-xl px-1.5 py-1.5 overflow-hidden">
        <View className="flex-row gap-2.5">
          <Image source={product10} className="w-20 h-20 rounded-lg" />

          <View className="flex-1 justify-between">
            <View>
              <Text className="text-base font-medium text-gray-800 leading-6">Italliano Ice Cream</Text>
              <Text className="text-xs text-gray-400">Size: Medium, Flavor: Beef</Text>
            </View>

            <View className="flex-row justify-between items-center mt-2">
              <Text className="text-base font-medium text-orange-500">Rp 30.000</Text>

              <View className="flex-row items-center gap-2">
                <QuantityControl onIncrement={handleIncrement} onDecrement={handleDecrement} />
                <IconButton onPress={() => {}} icon="delete" size="xs" color={colors.gray[400]} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
