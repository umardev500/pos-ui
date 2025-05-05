import {product5} from '@app/assets/images';
import {Button, Icon, ProductTagIndicator} from '@app/components/atoms';
import {LabeledInput} from '@app/components/molecules';
import {useProductById} from '@app/hooks';
import {colors} from '@app/styles';
import {MainStackParamList} from '@app/types';
import {numberUtils} from '@app/utils';
import {StackScreenProps} from '@react-navigation/stack';
import React from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// ————————————————————————————————————————————————
// 📦 Props and State
// ————————————————————————————————————————————————
type Props = StackScreenProps<MainStackParamList, 'ProductView'>;

export const ProductView: React.FC<Props> = ({route}) => {
  const {id} = route.params; // Get product ID from route params

  // ————————————————————————————————————————————————
  // 🛠 Data Fetching and Transformation
  // ————————————————————————————————————————————————

  /**
   * Fetch product data by ID.
   */
  const {data} = useProductById(id);

  // Destructure product data into usable variables
  const {name, description, category, product_variants: variants, product_units: units, base_unit_id} = data || {};

  /**
   * Get the base unit's price (defaults to 0 if not found).
   */
  const baseUnit = units?.find(unit => unit.unit_id === base_unit_id);
  const price = baseUnit?.price ?? 0;

  /**
   * Calculate the total number of variants for the product.
   * Uses variants count if available; otherwise, uses units length.
   */
  let totalVariants = units?.length || 0;
  const hasVariants = (variants?.length || 0) > 0;
  if (hasVariants) totalVariants = variants?.length || 0;

  // ————————————————————————————————————————————————
  // 👀 State Management
  // ————————————————————————————————————————————————

  /**
   * Toggle the description visibility state.
   */
  const [isDescriptionExpanded, setIsDescriptionExpanded] = React.useState(false);

  const toggleDescription = () => setIsDescriptionExpanded(!isDescriptionExpanded); // Handle description toggle state

  // Get safe area insets for padding in the UI
  const {bottom} = useSafeAreaInsets();

  // ————————————————————————————————————————————————
  // 📱 UI Rendering
  // ————————————————————————————————————————————————
  return (
    <View className="flex-1 bg-white">
      {/* 📝 Scrollable Content */}
      <KeyboardAwareScrollView
        contentContainerStyle={{paddingBottom: 25}}
        bottomOffset={25}
        showsVerticalScrollIndicator={false}>
        {/* 🖼 Product Image */}
        <View className="flex-row bg-red-100">
          <Image className="w-full h-[350px]" source={product5} />
        </View>

        <View className="p-4">
          {/* 📍 Product Info */}
          <View className="flex-row items-center justify-between">
            <View className="gap-1.5">
              <Text className="text-xl text-gray-800 font-semibold">{name}</Text>

              <View className="flex-row items-center gap-3">
                {/* 🔢 Product Variants */}
                <ProductTagIndicator icon="deployed_code_update" value={totalVariants} />
                <View className="bg-gray-300 w-[1px] h-[10px] rounded-full" />
                <View className="flex-row items-center gap-1">
                  <Icon name="sell" size={14} color={colors.gray[500]} />
                  <Text className="text-sm text-gray-500">{category?.name}</Text>
                </View>
              </View>
            </View>

            {/* 💸 Price */}
            <View>
              <Text className="text-xl font-medium text-orange-500">Rp{numberUtils.toDecimal(price)}</Text>
            </View>
          </View>

          {/* 📃 Description */}
          <View className="mt-8">
            <TouchableOpacity activeOpacity={0.7} onPress={toggleDescription} className="flex-row items-center gap-1">
              <Icon
                name={isDescriptionExpanded ? 'chevron_down' : 'chevron_right'}
                size={16}
                color={colors.gray[500]}
              />
              <Text className="text-sm text-gray-600">Description</Text>
            </TouchableOpacity>

            {isDescriptionExpanded && (
              <Pressable onPress={toggleDescription}>
                <View className="mt-4">
                  <Text className="text-base text-gray-800">{description}</Text>
                </View>
              </Pressable>
            )}
          </View>

          {/* 🛒 Order Options */}
          <View className="mt-6">
            <View className="gap-2">
              {/* 📦 Order Type */}
              <LabeledInput
                isClickableOnly
                onPress={() => console.log('Open modal')}
                trailingIcon="chevron_right"
                label="Tipe order"
                placeholder="Pilih tipe order"
              />
              <View className="gap-2 flex-row">
                {/* 🧳 Unit */}
                <LabeledInput
                  isClickableOnly
                  onPress={() => console.log('Open modal')}
                  trailingIcon="chevron_right"
                  label="Satuan"
                  placeholder="Pilih satuan"
                />
                {/* ⚙️ Variant */}
                <LabeledInput
                  isClickableOnly
                  onPress={() => console.log('Open modal')}
                  trailingIcon="chevron_right"
                  label="Variasi"
                  placeholder="Pilih variasi"
                />
              </View>

              {/* ✏️ Notes */}
              <LabeledInput icon="description" isTextArea label="Catatan" placeholder="Catatan tambahan" />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* 🛍 Add to Cart Button */}
      <View className="px-4 pt-4 border-t border-t-gray-100" style={{paddingBottom: bottom + 16}}>
        <Button title="Add to Cart" containerColor={colors.orange[500]} textColor={colors.white} />
      </View>
    </View>
  );
};
