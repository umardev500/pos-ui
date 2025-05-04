import {Icon} from '@app/components/atoms';
import {colors} from '@app/styles';
import {ProductDto} from '@app/types';
import {Image, Pressable, View} from 'react-native';

export const ProductImage = ({product}: {product: ProductDto}) => {
  const {image_url} = product;

  const handleExpandPress = () => {
    // TODO: expand product
  };

  return (
    <View className="bg-gray-300 h-40 rounded-tl-lg rounded-tr-lg">
      <Image className="w-full h-full" source={require('@app/assets/images/products/product-1.png')} />

      <Pressable
        className="absolute right-2 top-2 p-1 rounded-lg"
        style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
        onPress={handleExpandPress}>
        <Icon name="expand_content" size={24} color={colors.white} />
      </Pressable>
    </View>
  );
};
