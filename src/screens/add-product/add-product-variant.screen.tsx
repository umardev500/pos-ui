import clsx from 'clsx';
import {Formik, FormikHelpers, FormikProps, FormikValues} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';

import {IconButton, Input} from '@app/components/atoms';
import {useAddProductStore, useTriggerStore} from '@app/stores';
import {colors} from '@app/styles';
import {Unit, VariantInput} from '@app/types';
import {parseToVariant} from '@app/utils';
import {AddProductVariantSchema} from '@app/validations';

// UI constants
const inputSize = 'sm';
const labelSize = 'text-sm';

// Initial form values
const initialValues = {
  unit: {id: 0, name: ''},
  variants: [
    {id: Date.now(), name: '', value: ''},
    {id: Date.now() + 1, name: '', value: ''},
  ],
  price: 0,
  stock: 0,
};

export const AddProductVariant: React.FC = () => {
  // Formik reference for triggering submit externally
  const formikRef = useRef<FormikProps<typeof initialValues>>(null);

  // Local state for selected unit
  const [selectedUnit, setSelectedUnit] = useState<Unit>();

  // Store hooks
  const {product, updateProduct} = useAddProductStore();
  const units = product?.units;
  const saveTrigger = useTriggerStore(state => state.triggerSaveAddVariant);

  // Automatically submit form when saveTrigger is updated
  useEffect(() => {
    if (formikRef.current) formikRef.current.handleSubmit();
  }, [saveTrigger]);

  // Utility to generate a unique ID for variants
  const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

  // Add a new empty variant
  const handleAddVariant = (
    setFieldValue: FormikHelpers<FormikValues>['setFieldValue'],
    values: typeof initialValues,
  ) => {
    const newVariant: VariantInput = {id: generateId(), name: '', value: ''};
    setFieldValue('variants', [...values.variants, newVariant]);
  };

  // Remove a variant by ID
  const handleRemoveVariant = (
    id: number,
    setFieldValue: FormikHelpers<FormikValues>['setFieldValue'],
    values: typeof initialValues,
  ) => {
    const updated = values.variants.filter(v => v.id !== id);
    setFieldValue('variants', updated);
  };

  // Update a specific field of a variant by ID
  const handleChangeVariant = (
    id: number,
    field: keyof VariantInput,
    value: string,
    values: typeof initialValues,
    setFieldValue: FormikHelpers<FormikValues>['setFieldValue'],
  ) => {
    const updated = values.variants.map(v => (v.id === id ? {...v, [field]: value} : v));
    setFieldValue('variants', updated);
  };

  // Renders a row of inputs for a single variant
  const renderVariantInputs = (
    variant: VariantInput,
    values: typeof initialValues,
    setFieldValue: FormikHelpers<FormikValues>['setFieldValue'],
  ) => (
    <View className="flex-row gap-2 items-center mb-1.5 flex-1">
      {/* Variant name input */}
      <View className="flex-1 gap-2">
        <Input
          onChangeText={text => handleChangeVariant(variant.id, 'name', text, values, setFieldValue)}
          leadingIcon="layers"
          placeholder="Contoh: Color"
          size={inputSize}
          value={variant.name}
        />
      </View>
      {/* Variant value input */}
      <View className="flex-1 gap-2">
        <Input
          onChangeText={text => handleChangeVariant(variant.id, 'value', text, values, setFieldValue)}
          placeholder="Contoh: Green"
          size={inputSize}
          value={variant.value}
        />
      </View>
    </View>
  );

  return (
    <View className="flex-1 bg-white">
      <Formik
        innerRef={formikRef}
        initialValues={initialValues}
        validationSchema={AddProductVariantSchema}
        onSubmit={values => {
          const variant = parseToVariant(values);
          updateProduct({variants: [...(product?.variants || []), variant]});
        }}>
        {({values, handleChange, setFieldValue}) => (
          <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: 25}} bottomOffset={25}>
            <View className="px-4 pt-8">
              {/* ----------- Unit Selector Section ----------- */}
              <View className="mb-4 gap-2">
                <Text className="text-sm text-gray-800">Pilih satuan</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View className="flex-row gap-2">
                    {units?.map(item => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                          setSelectedUnit(item);
                          setFieldValue('unit', item);
                        }}
                        className={clsx('border border-dashed border-gray-300 rounded-xl px-4 py-3', {
                          'bg-gray-100': selectedUnit?.id === item.id,
                        })}>
                        <Text>{item.name}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </ScrollView>
              </View>

              {/* ----------- Variant Header ----------- */}
              <View className="flex-row gap-2 items-center mb-2">
                <Text className={clsx('flex-1 text-gray-800', labelSize)}>Varian</Text>
                <Text className={clsx('flex-1 text-gray-800', labelSize)}>Detail</Text>
                {/* Spacer for delete icon column */}
                <IconButton disabled color="transparent" icon="delete" size="xs" />
              </View>

              {/* ----------- Variant Inputs ----------- */}
              {/* Render all variants except the last one (which includes an add button) */}
              {values.variants.slice(0, -1).map(variant => (
                <View key={variant.id} className="flex-row items-center gap-2">
                  {renderVariantInputs(variant, values, setFieldValue)}
                  <IconButton
                    icon="delete"
                    color={colors.gray[500]}
                    size="xs"
                    onPress={() => handleRemoveVariant(variant.id, setFieldValue, values)}
                  />
                </View>
              ))}

              {/* ----------- Last Variant Input + Add Button ----------- */}
              <View className="flex-row items-center gap-2">
                {renderVariantInputs(values.variants.at(-1)!, values, setFieldValue)}
                <IconButton
                  icon="add"
                  size="xs"
                  color="white"
                  backgroundColor={colors.orange[500]}
                  roundedSize={12}
                  onPress={() => handleAddVariant(setFieldValue, values)}
                />
              </View>

              {/* ----------- Price and Stock Inputs ----------- */}
              <View className="flex-row gap-2 items-center mt-6">
                {/* Price input */}
                <View className="flex-1 gap-2">
                  <Text className={clsx('text-gray-800', labelSize)}>Harga variasi</Text>
                  <Input
                    leadingIcon="attch_money"
                    onChangeText={handleChange('price')}
                    placeholder="3.500"
                    size={inputSize}
                  />
                </View>

                {/* Stock input */}
                <View className="flex-1 gap-2">
                  <Text className={clsx('text-gray-800', labelSize)}>Stok</Text>
                  <Input
                    leadingIcon="deployed_code_update"
                    onChangeText={handleChange('stock')}
                    placeholder="45"
                    size={inputSize}
                  />
                </View>
              </View>
            </View>
          </KeyboardAwareScrollView>
        )}
      </Formik>
    </View>
  );
};
