import {useNavigation} from '@react-navigation/native';
import {Formik, FormikProps} from 'formik';
import {Text, TouchableOpacity, View} from 'react-native';

import {Icon} from '@app/components/atoms';
import {LabeledInput} from '@app/components/molecules';
import {useAddProductStore, useTriggerStore} from '@app/stores';
import {colors} from '@app/styles';
import {Category, ProductInput, Unit} from '@app/types';
import {AddProductSchema} from '@app/validations';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import {useEffect} from 'react';

const inputSize = 'sm';

type Props = {
  product?: ProductInput | null;
  updateProduct: (product: ProductInput) => void;
  initialProductState: ProductInput;
  categorySheetRef: React.RefObject<TrueSheet | null>;
  unitSheetRef: React.RefObject<TrueSheet | null>;
  selectedCategory?: Category;
  selectedUnits?: Unit[];
  formikRef?: React.RefObject<FormikProps<ProductInput> | null>;
};

export const ProductForm = ({
  product,
  updateProduct,
  initialProductState,
  categorySheetRef,
  unitSheetRef,
  selectedCategory,
  selectedUnits,
  formikRef,
}: Props) => {
  const navigation = useNavigation();
  const resetProduct = useAddProductStore(state => state.resetProduct);

  const isSaveAddProductEnabled = useTriggerStore(state => state.isSaveAddProductEnabled);
  const toggleSaveAddProduct = useTriggerStore(state => state.toggleSaveAddProduct);

  /**
   * Auto-submit form when the trigger changes
   */
  useEffect(() => {
    if (formikRef?.current && isSaveAddProductEnabled) {
      formikRef?.current.submitForm();
      toggleSaveAddProduct(false); // Toggle back to false after submission
    }
  }, [isSaveAddProductEnabled]);

  /**
   * Sync input value changes with both Formik and external product state
   */
  const handleSyncChange = (field: keyof ProductInput) => (text: string) => {
    updateProduct({[field]: text});
    formikRef?.current?.setFieldValue(field, text);
  };

  /**
   * Format numeric fields and pass the result to updateProduct
   */
  const handleSubmit = (values: ProductInput) => {
    updateProduct({
      ...values,
      capital: Number(values.capital),
      price: Number(values.price),
      quantity: Number(values.quantity),
      discount: Number(values.discount),
    });
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={product || initialProductState}
      validationSchema={AddProductSchema}
      onSubmit={handleSubmit}
      enableReinitialize>
      {({values, handleBlur, resetForm, errors}) => {
        console.log('errors:', errors);

        return (
          <>
            {/* Main Product Information */}
            <View className="gap-4">
              <LabeledInput
                label="Nama Produk"
                icon="deployed_code_update"
                placeholder="Masukan nama produk"
                value={values?.name}
                onChange={handleSyncChange('name')}
                onBlur={handleBlur('name')}
                size={inputSize}
              />

              {/* Category and Unit Selection */}
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
                  placeholder={selectedUnits?.length ? `${selectedUnits.length} Terpilih` : 'Pilih satuan'}
                  isClickableOnly
                  onPress={() => unitSheetRef.current?.present()}
                  size={inputSize}
                  placeholderTextColor={selectedUnits?.length ? colors.gray[800] : undefined}
                />
              </View>

              {/* Pricing Inputs */}
              <View className="flex-row gap-2">
                <LabeledInput
                  label="Harga Pokok"
                  icon="attch_money"
                  placeholder="3.500"
                  value={values.capital?.toString() === '0' ? '' : values.capital?.toString()}
                  onChange={handleSyncChange('capital')}
                  onBlur={handleBlur('capital')}
                  size={inputSize}
                />
                <LabeledInput
                  label="Harga Jual"
                  icon="finance_mode"
                  placeholder="5.000"
                  value={values.price?.toString() === '0' ? '' : values.price?.toString()}
                  onChange={handleSyncChange('price')}
                  onBlur={handleBlur('price')}
                  size={inputSize}
                />
              </View>
            </View>

            {/* Additional Product Data */}
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
                  value={values.sku}
                  onChange={handleSyncChange('sku')}
                  onBlur={handleBlur('sku')}
                  size={inputSize}
                />

                <LabeledInput
                  label="Barcode"
                  icon="barcode_scanner"
                  trailingIcon="barcode_reader"
                  placeholder="31245847"
                  value={values.barcode}
                  onChange={handleSyncChange('barcode')}
                  onBlur={handleBlur('barcode')}
                  size={inputSize}
                />

                {/* Image Upload Placeholder */}
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

                {/* Product Description */}
                <LabeledInput
                  label="Deskripsi"
                  icon="description"
                  placeholder="Masukan deskripsi produk"
                  value={values.description}
                  onChange={handleSyncChange('description')}
                  onBlur={handleBlur('description')}
                  isTextArea
                  size={inputSize}
                />

                {/* Product Variants */}
                <View>
                  <TouchableOpacity onPress={() => navigation.navigate('AddProductVariantList')} className="mb-2">
                    <Text className="text-gray-600">{product?.variants?.length} variasi</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('AddProductVariant')}
                    className="border border-dashed border-gray-300 rounded-xl">
                    <Text className="text-center text-gray-600 text-sm px-4 py-2.5">Tambah varian produk</Text>
                  </TouchableOpacity>
                </View>

                {/* Reset Form Button */}
                <TouchableOpacity
                  onPress={() => {
                    resetProduct();
                    resetForm();
                  }}
                  className="flex-row">
                  <Text className="text-center text-orange-400">Reset</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        );
      }}
    </Formik>
  );
};
