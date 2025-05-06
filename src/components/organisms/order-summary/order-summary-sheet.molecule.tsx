import {TrueSheet} from '@lodev09/react-native-true-sheet';
import React from 'react';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  ref?: React.RefObject<TrueSheet | null>;
};

export const OrderSummarySheet: React.FC<Props> = ({ref}) => {
  const {bottom} = useSafeAreaInsets();

  return (
    <TrueSheet edgeToEdge ref={ref} sizes={['auto', 'large']}>
      <View className="pt-6 px-4" style={{paddingBottom: bottom + 16}}>
        <View className="flex-row items-center justify-between py-4">
          <Text className="text-sm text-gray-800">Total</Text>
          <Text className="text-sm text-gray-700 font-medium">Rp75.000</Text>
        </View>

        <View className="flex-row items-center justify-between py-4 border-t-[0.5px] border-t-gray-200">
          <Text className="text-sm text-gray-800">Voucher Diskon</Text>
          <Text className="text-sm text-gray-700">Rp0</Text>
        </View>

        <View className="flex-row items-center justify-between py-4 border-t-[0.5px] border-t-gray-200">
          <Text className="text-sm text-gray-800">Diskon Produk</Text>
          <Text className="text-sm text-gray-700 font-medium">-Rp4.200</Text>
        </View>

        <View className="flex-row items-center justify-between py-4 border-t-[0.5px] border-t-gray-200">
          <Text className="text-sm text-gray-800 font-medium">Jumlah Total</Text>
          <Text className="text-sm text-gray-700 font-bold">Rp70.800</Text>
        </View>
      </View>
    </TrueSheet>
  );
};
