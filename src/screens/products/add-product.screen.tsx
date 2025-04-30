import {Icon, Input} from '@app/components/atoms';
import {initialProductState, useAddProductStore} from '@app/stores';
import {colors} from '@app/styles';
import {ProductInput} from '@app/types';
import {AddProductSchema} from '@app/validations';
import {useNavigation} from '@react-navigation/native';
import clsx from 'clsx';
import {Formik, FormikProps} from 'formik';
import React, {useEffect, useRef} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native-gesture-handler';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';

type Props = {};

export const AddProductScreen: React.FC<Props> = ({}) => {
  const navigation = useNavigation();
  const {product, trigger, updateProduct} = useAddProductStore();
  const formikRef = useRef<FormikProps<ProductInput>>(null);
  const size = 'sm';
  const labelSize = 'text-sm';

  useEffect(() => {
    if (trigger > 0) {
      formikRef.current?.submitForm();
    }
  }, [trigger]);

  const handleSubmit = (values: ProductInput) => {
    console.log('val:', values);

    updateProduct({
      ...values,
      capital: Number(values.capital),
      price: Number(values.price),
      quantity: Number(values.quantity),
      discount: Number(values.discount),
      category_id: Number(values.category_id),
    });
  };

  return (
    <View className="flex-1 bg-white">
      <KeyboardAwareScrollView
        bottomOffset={25}
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 16, paddingBottom: 150}}>
        <Formik
          validationSchema={AddProductSchema}
          innerRef={formikRef}
          initialValues={product || initialProductState}
          onSubmit={handleSubmit}>
          {({handleBlur, errors, setFieldValue}) => {
            console.log(errors);
            const handleSyncChange = (field: keyof ProductInput) => (text: string) => {
              setFieldValue(field, text);
              updateProduct({[field]: text});
            };

            return (
              <>
                {/* Main info */}
                <View className="gap-4">
                  <View className="gap-2">
                    <Text className={clsx('text-gray-800', labelSize)}>Nama Produk</Text>
                    <Input
                      leadingIcon="deployed_code_update"
                      onChangeText={handleSyncChange('name')}
                      onBlur={handleBlur('name')}
                      placeholder="Masukan nama produk"
                      size={size}
                      value={product?.name}
                    />
                  </View>

                  <View className="flex-row gap-2 items-center">
                    <View className="flex-1 gap-2">
                      <Text className={clsx('text-gray-800', labelSize)}>Kategori</Text>
                      <Input trailingIcon="chevron_right" placeholder="Pilih kategori" size={size} />
                    </View>
                    <View className="flex-1 gap-2">
                      <Text className={clsx('text-gray-800', labelSize)}>Satuan</Text>
                      <Input
                        trailingIcon="chevron_right"
                        onChangeText={() => {}}
                        placeholder="Pilih satuan"
                        size={size}
                      />
                    </View>
                  </View>

                  <View className="flex-row gap-2 items-center">
                    <View className="flex-1 gap-2">
                      <Text className={clsx('text-gray-800', labelSize)}>Harga Pokok</Text>
                      <Input
                        leadingIcon="attch_money"
                        onChangeText={handleSyncChange('capital')}
                        onBlur={handleBlur('capital')}
                        placeholder="3.500"
                        size={size}
                        value={product?.capital ? product.capital.toString() : ''}
                      />
                    </View>
                    <View className="flex-1 gap-2">
                      <Text className={clsx('text-gray-800', labelSize)}>Harga Jual</Text>
                      <Input
                        onChangeText={handleSyncChange('price')}
                        onBlur={handleBlur('price')}
                        leadingIcon="finance_mode"
                        placeholder="5.000"
                        size={size}
                        value={product?.price ? product.price.toString() : ''}
                      />
                    </View>
                  </View>
                </View>

                {/* Additional info */}
                <View className="pt-6">
                  <View className="flex-row items-center justify-betwee gap-1">
                    <Text className="text-sm text-gray-800">Data Tambahan</Text>
                    <Icon name="chevron_down" size={22} color={colors.gray[500]} />
                  </View>

                  <View className="pt-4 gap-4">
                    <View className="gap-2">
                      <Text className={clsx('text-gray-800', labelSize)}>SKU</Text>
                      <Input
                        leadingIcon="style"
                        onChangeText={handleSyncChange('sku')}
                        onBlur={handleBlur('sku')}
                        placeholder="XLM-0001"
                        size={size}
                        value={product?.sku}
                      />
                    </View>

                    <View className="gap-2">
                      <Text className={clsx('text-gray-800', labelSize)}>Barcode</Text>
                      <Input
                        leadingIcon="barcode_scanner"
                        trailingIcon="barcode_reader"
                        onChangeText={handleSyncChange('barcode')}
                        onBlur={handleBlur('barcode')}
                        placeholder="31245847"
                        size={size}
                        value={product?.barcode}
                      />
                    </View>

                    {/* Drop zone */}
                    <View>
                      <View className="border border-dashed border-gray-300 rounded-xl flex-row items-center gap-4 justify-between pr-4">
                        <View className="w-20 h-20 bg-gray-200 rounded-xl items-center justify-center">
                          <Icon name="deployed_code_update" size={24} color={colors.gray[500]} />
                        </View>

                        <TouchableOpacity onPress={() => {}}>
                          <View className="border border-orange-500 rounded-xl px-4 py-2 items-center justify-center">
                            <Text className="text-orange-500 text-center font-medium">Pilih foto</Text>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>

                    <View className="gap-2">
                      <Text className={clsx('text-gray-800', labelSize)}>Deskripsi</Text>
                      <Input
                        isTextArea
                        leadingIcon="description"
                        onChangeText={handleSyncChange('description')}
                        onBlur={handleBlur('description')}
                        placeholder="Masukan deskripsi produk"
                        size={size}
                        value={product?.description}
                      />
                    </View>

                    <View>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('AddProdcutVariantList');
                        }}
                        className="mb-2">
                        <Text className="text-gray-600">2 variasi</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('AddProductVariant');
                        }}
                        className="border border-dashed border-gray-300 rounded-xl">
                        <Text className="text-center text-gray-600 text-sm px-4 py-2.5">Tambah varian produk</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </>
            );
          }}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
};
