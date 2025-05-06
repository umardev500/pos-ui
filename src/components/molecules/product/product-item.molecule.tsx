import {ProductDto} from '@app/types';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {ProductDetails} from './product-details.molecule';
import {ProductImage} from './product-image.molecule';

type Props = {
  width?: number;
  product: ProductDto;
  onAddToCart?: (product: ProductDto) => void;
  onPress?: (id: number) => void;
};

export const ProductItem: React.FC<Props> = props => {
  const {width, product, onAddToCart, onPress} = props;

  const handleAddToCart = () => {
    onAddToCart?.(product);
  };

  const handlePress = () => {
    onPress?.(product.id);
  };

  return (
    <View className="overflow-hidden px-2" style={{width}}>
      <View className="bg-white rounded-lg gap-0 overflow-hidden">
        <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
          <ProductImage product={product} />
        </TouchableOpacity>
        <ProductDetails onAddToCart={handleAddToCart} product={product} />
      </View>
    </View>
  );
};
