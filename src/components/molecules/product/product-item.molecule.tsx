import {Product} from '@app/types';
import React from 'react';
import {Image, ImageSourcePropType, Text, View} from 'react-native';

type Props = {
  width?: number;
  product: Product;
};

export const ProductItem: React.FC<Props> = props => {
  const {width, product} = props;
  const {name, price, photo} = product;

  return (
    <View className="overflow-hidden px-2" style={{width}}>
      <View className="bg-white rounded-lg flex-1 gap-0 overflow-hidden">
        <View className="bg-gray-300 h-32 rounded-tl-lg rounded-tr-lg">
          <Image className="w-full h-full" source={photo as ImageSourcePropType} />
        </View>

        <View className="pt-1 pb-2 px-2.5">
          <Text className="text-base font-medium text-gray-900">{name}</Text>
          <View className="flex-row items-end">
            <Text className="text-xs font-medium text-gray-700 mb-0.5">Rp</Text>
            <Text className="text-sm font-medium text-gray-700">{price}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
