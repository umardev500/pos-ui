import {Icon, ProductTagIndicator} from '@app/components/atoms';
import {ProductDto} from '@app/types';
import {numberUtils} from '@app/utils';
import {Pressable, Text, View} from 'react-native';

type Props = {
  product: ProductDto;
  onAddToCart?: () => void;
};

export const ProductDetails: React.FC<Props> = ({product, onAddToCart}) => {
  const {name, product_variants: variants, product_units: units, base_unit_id} = product;

  // Get base unit's price (fallback to 0)
  const baseUnit = units.find(unit => unit.unit_id === base_unit_id);
  const price = baseUnit?.price ?? 0;

  // Determine if indicators should be shown
  const hasVariants = variants.length > 0;
  const hasMultipleUnits = variants.length === 0 && units.length > 1;

  return (
    <View className="pt-2 pb-2 px-2.5">
      <View className="flex-row items-center justify-between">
        <View className="gap-1 flex-1">
          {/* Product Name */}
          <Text className="text-base leading-5 font-medium text-gray-900">{name}</Text>

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center gap-2">
              {/* Variant Indicator */}
              {hasVariants && <ProductTagIndicator icon="style" value={variants.length} />}
              {hasMultipleUnits && <ProductTagIndicator icon="deployed_code_update" value={units.length} />}

              {/* Price */}
              <View className="flex-row items-end">
                <Text className="text-xs font-medium text-gray-700 mb-0.5">Rp</Text>
                <Text className="text-sm font-medium text-gray-700">{numberUtils.toDecimal(price)}</Text>
              </View>
            </View>

            {/* Add to Cart Button */}
            <Pressable onPress={onAddToCart} className="bg-orange-500 rounded-lg w-7 h-7 items-center justify-center">
              <Icon name="add" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};
