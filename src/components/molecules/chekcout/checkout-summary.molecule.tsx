import {Icon} from '@app/components/atoms';
import React from 'react';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {};

export const CheckoutSummary: React.FC<Props> = () => {
  const {bottom} = useSafeAreaInsets();

  return (
    <View
      className="absolute shadow-xl shadow-black left-4 right-4 flex-row items-center justify-between  bg-orange-500 rounded-xl px-4 py-4"
      style={{bottom: bottom + 8}}>
      <View>
        <Icon name="local_mall" size={24} color="white" />
        <View className="absolute items-center justify-center rounded-full bg-white w-6 h-6 -top-1.5 -right-3">
          <Text className="text-xs text-gray-800 leading-tight" numberOfLines={1}>
            3+
          </Text>
        </View>
      </View>
      <Text className="text-white text-base">Continue to checkout</Text>
      <Text className="text-white text-base">Rp 25.500</Text>
    </View>
  );
};
