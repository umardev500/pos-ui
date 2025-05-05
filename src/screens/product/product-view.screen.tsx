import {product5} from '@app/assets/images';
import {Button, Icon, ProductTagIndicator} from '@app/components/atoms';
import {LabeledInput} from '@app/components/molecules';
import {UnitSheet} from '@app/components/organisms';
import {useProductById} from '@app/hooks';
import {colors} from '@app/styles';
import {MainStackParamList, UnitDto} from '@app/types';
import {numberUtils} from '@app/utils';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useRef, useState} from 'react';
import {Image, Pressable, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

// ————————————————————————————————————————————————
// 📦 Props and Setup
// ————————————————————————————————————————————————
type Props = StackScreenProps<MainStackParamList, 'ProductView'>;

export const ProductView: React.FC<Props> = ({route}) => {
  const {id} = route.params;

  // ————————————————————————————————————————————————
  // 🔗 Refs
  // ————————————————————————————————————————————————
  const unitSheetRef = useRef<TrueSheet>(null);

  // ————————————————————————————————————————————————
  // 📡 Data Fetching
  // ————————————————————————————————————————————————
  const {data} = useProductById(id);
  const {name, description, category, product_variants: variants, product_units: units, base_unit_id} = data || {};

  // ————————————————————————————————————————————————
  // 🧠 Data Transformation
  // ————————————————————————————————————————————————
  const unitsDto: UnitDto[] = units?.map(pu => pu.unit) || [];
  const baseUnit = units?.find(unit => unit.unit_id === base_unit_id);
  const price = baseUnit?.price ?? 0;
  const hasVariants = (variants?.length || 0) > 0;
  const totalVariants = hasVariants ? variants?.length || 0 : units?.length || 0;

  // ————————————————————————————————————————————————
  // 🎛 State
  // ————————————————————————————————————————————————
  const [selectedUnit, setSelectedUnit] = useState<UnitDto>(unitsDto[0]);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const {bottom} = useSafeAreaInsets();

  // ————————————————————————————————————————————————
  // 🛠 Handlers
  // ————————————————————————————————————————————————
  const toggleDescription = () => setIsDescriptionExpanded(prev => !prev);

  const handleSelectUnit = (unit: UnitDto) => {
    setSelectedUnit(unit);
    setTimeout(() => {
      unitSheetRef.current?.dismiss();
    }, 500);
  };

  // ————————————————————————————————————————————————
  // 🧱 UI Rendering
  // ————————————————————————————————————————————————
  return (
    <View className="flex-1 bg-white">
      {/* 🖼 Header Image */}
      <KeyboardAwareScrollView
        contentContainerStyle={{paddingBottom: 25}}
        bottomOffset={25}
        showsVerticalScrollIndicator={false}>
        <View className="flex-row bg-red-100">
          <Image className="w-full h-[350px]" source={product5} />
        </View>

        {/* 📝 Product Details */}
        <View className="p-4">
          {/* 🧾 Title & Price */}
          <View className="flex-row items-center justify-between">
            <View className="gap-1.5">
              <Text className="text-xl text-gray-800 font-semibold">{name}</Text>
              <View className="flex-row items-center gap-3">
                <ProductTagIndicator icon="deployed_code_update" value={totalVariants} />
                <View className="bg-gray-300 w-[1px] h-[10px] rounded-full" />
                <View className="flex-row items-center gap-1">
                  <Icon name="sell" size={14} color={colors.gray[500]} />
                  <Text className="text-sm text-gray-500">{category?.name}</Text>
                </View>
              </View>
            </View>

            <Text className="text-xl font-medium text-orange-500">Rp{numberUtils.toDecimal(price)}</Text>
          </View>

          {/* 📃 Description */}
          <View className="mt-8">
            <TouchableOpacity onPress={toggleDescription} activeOpacity={0.7} className="flex-row items-center gap-1">
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

          {/* 🎛 Product Config */}
          <View className="mt-6 gap-2">
            <LabeledInput
              isClickableOnly
              onPress={() => console.log('Open modal')}
              trailingIcon="chevron_right"
              label="Tipe order"
              placeholder="Pilih tipe order"
            />

            <View className="flex-row gap-2">
              <LabeledInput
                isClickableOnly
                onPress={() => unitSheetRef.current?.present()}
                trailingIcon="chevron_right"
                label="Satuan"
                placeholder={selectedUnit ? selectedUnit.name : 'Pilih satuan'}
                placeholderTextColor={selectedUnit ? colors.gray[800] : undefined}
              />
              <LabeledInput
                isClickableOnly
                onPress={() => console.log('Open modal')}
                trailingIcon="chevron_right"
                label="Variasi"
                placeholder="Pilih variasi"
              />
            </View>

            <LabeledInput icon="description" isTextArea label="Catatan" placeholder="Catatan tambahan" />
          </View>
        </View>
      </KeyboardAwareScrollView>

      {/* 🛒 Add to Cart */}
      <View className="px-4 pt-4 border-t border-t-gray-100" style={{paddingBottom: bottom + 16}}>
        <Button title="Add to Cart" containerColor={colors.orange[500]} textColor={colors.white} />
      </View>

      {/* 📋 Unit Selector */}
      <UnitSheet units={unitsDto} ref={unitSheetRef} selected={[selectedUnit]} onSelect={handleSelectUnit} />
    </View>
  );
};
