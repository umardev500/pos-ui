import {useNavigation} from '@react-navigation/native';
import {Formik, FormikProps} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';

import {Icon, IconName, Input} from '@app/components/atoms';
import {initialProductState, useAddProductStore} from '@app/stores';
import {colors} from '@app/styles';
import {Category, ProductInput, Unit} from '@app/types';
import {AddProductSchema} from '@app/validations';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import clsx from 'clsx';

type Props = {};

export const AddProductScreen: React.FC<Props> = () => {
  const categorySheetRef = useRef<TrueSheet>(null);
  const unitSheetRef = useRef<TrueSheet>(null);
  const formikRef = useRef<FormikProps<ProductInput>>(null);

  const navigation = useNavigation();
  const {product, trigger, updateProduct} = useAddProductStore();

  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(product?.category);
  const [selectedUnits, setSelectedUnits] = useState<Unit[]>(product?.units || []);

  const inputSize = 'sm';

  useEffect(() => {
    if (trigger > 0) formikRef.current?.submitForm();
  }, [trigger]);

  useEffect(() => {
    if (selectedUnits.length) updateProduct({units: selectedUnits});
  }, [selectedUnits]);

  useEffect(() => {
    if (selectedCategory) updateProduct({category: selectedCategory});
  }, [selectedCategory]);

  const handleSubmit = (values: ProductInput) => {
    updateProduct({
      ...values,
      capital: Number(values.capital),
      price: Number(values.price),
      quantity: Number(values.quantity),
      discount: Number(values.discount),
    });
  };

  const handleSyncChange = (field: keyof ProductInput) => (text: string) => {
    updateProduct({[field]: text});
    formikRef.current?.setFieldValue(field, text);
  };

  const toggleCategory = (category: Category) => {
    setSelectedCategory(prev => (prev?.id === category.id ? undefined : category));
  };

  const toggleUnit = (unit: Unit) => {
    setSelectedUnits(prev => (prev.some(u => u.id === unit.id) ? prev.filter(u => u.id !== unit.id) : [...prev, unit]));
  };

  return (
    <View className="flex-1 bg-white">
      <KeyboardAwareScrollView
        bottomOffset={25}
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 16, paddingBottom: 150}}>
        <Formik
          innerRef={formikRef}
          initialValues={product || initialProductState}
          validationSchema={AddProductSchema}
          onSubmit={handleSubmit}>
          {({handleBlur}) => (
            <>
              <View className="gap-4">
                <LabeledInput
                  label="Nama Produk"
                  icon="deployed_code_update"
                  placeholder="Masukan nama produk"
                  value={product?.name}
                  onChange={handleSyncChange('name')}
                  onBlur={handleBlur('name')}
                  size={inputSize}
                />

                <View className="flex-row gap-2">
                  <LabeledInput
                    label="Kategori"
                    trailingIcon="chevron_right"
                    placeholder={selectedCategory?.name || 'Pilih kategori'}
                    isClickableOnly
                    onPress={() => categorySheetRef.current?.present()}
                    size={inputSize}
                    placeholderTextColor={selectedCategory ? colors.gray[800] : undefined}
                  />
                  <LabeledInput
                    label="Satuan"
                    trailingIcon="chevron_right"
                    placeholder={selectedUnits.length ? `${selectedUnits.length} Terpilih` : 'Pilih satuan'}
                    isClickableOnly
                    onPress={() => unitSheetRef.current?.present()}
                    size={inputSize}
                    placeholderTextColor={selectedUnits.length ? colors.gray[800] : undefined}
                  />
                </View>

                <View className="flex-row gap-2">
                  <LabeledInput
                    label="Harga Pokok"
                    icon="attch_money"
                    placeholder="3.500"
                    value={product?.capital?.toString() || ''}
                    onChange={handleSyncChange('capital')}
                    onBlur={handleBlur('capital')}
                    size={inputSize}
                  />
                  <LabeledInput
                    label="Harga Jual"
                    icon="finance_mode"
                    placeholder="5.000"
                    value={product?.price?.toString() || ''}
                    onChange={handleSyncChange('price')}
                    onBlur={handleBlur('price')}
                    size={inputSize}
                  />
                </View>
              </View>

              {/* Additional Info */}
              <View className="pt-6">
                <View className="flex-row items-center justify-between">
                  <Text className="text-sm text-gray-800">Data Tambahan</Text>
                  <Icon name="chevron_down" size={22} color={colors.gray[500]} />
                </View>

                <View className="pt-4 gap-4">
                  <LabeledInput
                    label="SKU"
                    icon="style"
                    placeholder="XLM-0001"
                    value={product?.sku}
                    onChange={handleSyncChange('sku')}
                    onBlur={handleBlur('sku')}
                    size={inputSize}
                  />

                  <LabeledInput
                    label="Barcode"
                    icon="barcode_scanner"
                    trailingIcon="barcode_reader"
                    placeholder="31245847"
                    value={product?.barcode}
                    onChange={handleSyncChange('barcode')}
                    onBlur={handleBlur('barcode')}
                    size={inputSize}
                  />

                  {/* Drop Zone */}
                  <View className="border border-dashed border-gray-300 rounded-xl flex-row items-center gap-4 justify-between pr-4">
                    <View className="w-20 h-20 bg-gray-200 rounded-xl items-center justify-center">
                      <Icon name="deployed_code_update" size={24} color={colors.gray[500]} />
                    </View>
                    <TouchableOpacity>
                      <View className="border border-orange-500 rounded-xl px-4 py-2">
                        <Text className="text-orange-500 font-medium">Pilih foto</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  <LabeledInput
                    label="Deskripsi"
                    icon="description"
                    placeholder="Masukan deskripsi produk"
                    value={product?.description}
                    onChange={handleSyncChange('description')}
                    onBlur={handleBlur('description')}
                    isTextArea
                    size={inputSize}
                  />

                  <View>
                    <TouchableOpacity onPress={() => navigation.navigate('AddProductVariantList')} className="mb-2">
                      <Text className="text-gray-600">2 variasi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate('AddProductVariant')}
                      className="border border-dashed border-gray-300 rounded-xl">
                      <Text className="text-center text-gray-600 text-sm px-4 py-2.5">Tambah varian produk</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>

      <CategorySheet ref={categorySheetRef} selected={selectedCategory} onSelect={toggleCategory} />
      <UnitSheet ref={unitSheetRef} selected={selectedUnits} onSelect={toggleUnit} />
    </View>
  );
};

// Reusable bottom sheets
const CategorySheet = ({
  selected,
  onSelect,
  ref,
}: {
  selected?: Category;
  onSelect: (cat: Category) => void;
  ref?: React.RefObject<TrueSheet | null>;
}) => (
  <TrueSheet edgeToEdge ref={ref} sizes={['auto', 'large']}>
    <View className="pt-8 px-4 pb-10">
      <Text className="text-sm text-gray-800">Pilih Kategori</Text>
      <View className="mt-4 gap-2">
        {[
          {id: 1, name: 'Snack'},
          {id: 2, name: 'Junk Food'},
          {id: 3, name: 'Drink'},
        ].map(cat => (
          <TouchableOpacity
            key={cat.id}
            onPress={() => onSelect(cat)}
            className={clsx('border border-dashed border-gray-300 rounded-xl px-4 py-3', {
              'bg-gray-100': selected?.id === cat.id,
            })}>
            <Text className="text-sm text-gray-800 font-medium">{cat.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </TrueSheet>
);

const UnitSheet = ({
  selected,
  onSelect,
  ref,
}: {
  selected: Unit[];
  onSelect: (unit: Unit) => void;
  ref?: React.RefObject<TrueSheet | null>;
}) => (
  <TrueSheet edgeToEdge ref={ref} sizes={['auto', 'large']}>
    <View className="pt-8 px-4 pb-10">
      <Text className="text-sm text-gray-800">Pilih Satuan</Text>
      <View className="mt-4 gap-2">
        {[
          {id: 1, name: 'Pack'},
          {id: 2, name: 'Roll'},
          {id: 3, name: 'Kilos'},
        ].map(unit => (
          <TouchableOpacity
            key={unit.id}
            onPress={() => onSelect(unit)}
            className={clsx('border border-dashed border-gray-300 rounded-xl px-4 py-3', {
              'bg-gray-100': selected.some(u => u.id === unit.id),
            })}>
            <Text className="text-sm text-gray-800 font-medium">{unit.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  </TrueSheet>
);

const LabeledInput = ({
  label,
  icon,
  trailingIcon,
  isClickableOnly,
  placeholder,
  value,
  onChange,
  onBlur,
  onPress,
  isTextArea,
  placeholderTextColor,
  size = 'sm',
}: {
  label: string;
  icon?: IconName;
  trailingIcon?: IconName;
  isClickableOnly?: boolean;
  placeholder: string;
  value?: string;
  onChange?: (text: string) => void;
  onBlur?: (e: any) => void;
  onPress?: () => void;
  isTextArea?: boolean;
  placeholderTextColor?: string;
  size?: 'sm' | 'md' | 'lg';
}) => (
  <View className="flex-1 gap-2">
    <Text className="text-sm text-gray-800">{label}</Text>
    <Input
      leadingIcon={icon}
      trailingIcon={trailingIcon}
      isClickableOnly={isClickableOnly}
      placeholder={placeholder}
      value={value}
      onChangeText={onChange}
      onBlur={onBlur}
      onPress={onPress}
      isTextArea={isTextArea}
      placeholderTextColor={placeholderTextColor}
      size={size}
    />
  </View>
);
