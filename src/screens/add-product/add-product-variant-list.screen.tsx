import {VariantList} from '@app/components/organisms';
import React from 'react';
import {View} from 'react-native';

const variants = [
  {size: 'M', crust: 'Thin', color: 'White', price: 11.99, stock: 80},
  {size: 'L', crust: 'Thick', color: 'Black', price: 15.99, stock: 50},
  {size: 'XL', crust: 'Large', color: 'Rainbow', price: 25.99, stock: 24},
];

type Props = {};

export const AddProductVariantListScreen: React.FC<Props> = ({}) => {
  return (
    <View className="flex-1 bg-white py-4">
      <VariantList data={variants} />
    </View>
  );
};
