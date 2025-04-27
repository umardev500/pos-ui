import {Product} from '@app/types';
import React from 'react';
import {Text, View} from 'react-native';

type Props = {
  width?: number;
  product: Product;
};

export const ProductItem: React.FC<Props> = props => {
  const {width, product} = props;
  const {name} = product;

  return (
    <View className="p-4" style={{width}}>
      <Text>{name}</Text>
    </View>
  );
};
