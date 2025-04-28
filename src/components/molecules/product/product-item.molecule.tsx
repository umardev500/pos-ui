import {Product} from '@app/types';
import React from 'react';
import {View} from 'react-native';
import {ProductDetails} from './product-details.molecule';
import {ProductImage} from './product-image.molecule';

type Props = {
  width?: number;
  product: Product;
  onAddToCart?: (product: Product) => void;
};

export const ProductItem: React.FC<Props> = props => {
  const {width, product, onAddToCart} = props;

  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  return (
    <View className="overflow-hidden px-2" style={{width}}>
      <View className="bg-white rounded-lg gap-0 overflow-hidden">
        <ProductImage product={product} />
        <ProductDetails onAddToCart={handleAddToCart} product={product} />
      </View>
    </View>
  );
};
