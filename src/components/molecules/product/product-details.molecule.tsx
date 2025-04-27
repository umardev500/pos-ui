import {Icon} from '@app/components/atoms';
import {colors} from '@app/styles';
import {Product} from '@app/types';
import {numberUtils} from '@app/utils';
import {View, Text, Pressable} from 'react-native';

export const ProductDetails = ({product}: {product: Product}) => {
  const {name, price, variants} = product;

  const handleAddToCart = () => {
    // TODO: add product to cart
  };

  return (
    <View className="pt-2 pb-2 px-2.5">
      <View className="flex-row items-center justify-between">
        <View className="gap-1">
          <Text className="text-base leading-5 font-medium text-gray-900">{name}</Text>

          <View className="flex-row justify-between w-full">
            <View className="flex-row items-center gap-1">
              {variants.length > 0 && (
                <View className="flex-row gap-0.5 px-0.5 border border-orange-500 bg-orange-50 rounded items-center justify-center">
                  <Icon name="style" size={14} color={colors.orange[500]} />
                  <Text className="text-xs text-orange-500 mr-0.5">{variants.length}</Text>
                </View>
              )}

              <View className="flex-row items-end">
                <Text className="text-xs font-medium text-gray-700 mb-0.5">Rp</Text>
                <Text className="text-sm font-medium text-gray-700">{numberUtils.toDecimal(price)}</Text>
              </View>
            </View>
            <Pressable
              onPress={handleAddToCart}
              className="bg-orange-500 rounded-lg w-7 h-7 items-center justify-center">
              <Icon name="add" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
