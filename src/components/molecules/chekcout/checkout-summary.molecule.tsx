import {Icon} from '@app/components/atoms';
import {numberUtils} from '@app/utils';
import React from 'react';
import {Pressable, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  totalItems?: number;
  totalAmount?: number;
  onPress?: () => void;
};

export const CheckoutSummary: React.FC<Props> = ({onPress, totalItems, totalAmount = 0}) => {
  const {bottom} = useSafeAreaInsets();

  return (
    <Pressable onPress={onPress}>
      <View
        className="absolute shadow-xl shadow-black left-4 right-4 flex-row items-center justify-between  bg-orange-500 rounded-xl px-4 py-4"
        style={{bottom: bottom + 8}}>
        <View>
          <Icon name="local_mall" size={24} color="white" />
          <View className="absolute items-center justify-center rounded-full bg-white w-6 h-6 -top-1.5 -right-3">
            <Text className="text-xs text-gray-800 leading-tight" numberOfLines={1}>
              {totalItems}+
            </Text>
          </View>
        </View>
        <Text className="text-white text-base">Continue to checkout</Text>
        <Text className="text-white text-base font-semibold">Rp {numberUtils.toDecimal(totalAmount)}</Text>
      </View>
    </Pressable>
  );
};
