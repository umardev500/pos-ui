import {Icon} from '@app/components/atoms';
import {colors} from '@app/styles';
import {Product} from '@app/types';
import {getImageSource, numberUtils} from '@app/utils';
import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  product: Product;
  onPress?: (product: Product) => void;
};

export const ManageProductItem: React.FC<Props> = ({product, onPress}) => {
  const {name, price, photo, quantity, variants} = product;

  return (
    <View className="px-4 pt-4">
      <TouchableOpacity onPress={() => onPress?.(product)}>
        <View className="flex-row items-center gap-4">
          <Image source={getImageSource(photo)} className="w-14 h-14 rounded-lg" />

          <View className="gap-0.5">
            <Text className="text-lg font-medium text-gray-800">{name}</Text>
            <View className="flex-row items-center gap-2">
              {variants.length > 0 && (
                <View className="flex-row gap-0.5 px-0.5 border border-orange-500 bg-orange-50 rounded items-center justify-center">
                  <Icon name="style" size={14} color={colors.orange[500]} />
                  <Text className="text-xs text-orange-500 mr-0.5">{variants.length}</Text>
                </View>
              )}

              <View className="flex-row items-center gap-2">
                <Text className="text-sm text-gray-600">Rp{numberUtils.toDecimal(price)}</Text>
                <View className="w-[1px] h-3 bg-gray-400 rounded-full" />
                <Text className="text-sm text-gray-600">Stock: {quantity}</Text>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      <View className="h-[1px] bg-gray-200 mt-4" />
    </View>
  );
};
