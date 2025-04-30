import {Button, IconButton, Input} from '@app/components/atoms';
import {useAddProductStore, useTriggerStore} from '@app/stores';
import {colors} from '@app/styles';
import {Unit, Variant, VariantInput} from '@app/types';
import {AddProductVariantSchema} from '@app/validations';
import clsx from 'clsx';
import {Formik, FormikHelpers, FormikProps, FormikValues} from 'formik';
import React, {useEffect, useRef} from 'react';
import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';

type Props = {};

const inputSize = 'sm';
const labelSize = 'text-sm';

const initialValues = {
  unit: {id: 0, name: ''}, // or ID if preferred
  variants: [
    {id: Date.now(), name: '', value: ''},
    {id: Date.now() + 1, name: '', value: ''},
  ],
  price: 0,
  stock: 0,
};

export const AddProductVariant: React.FC<Props> = ({}) => {
  const formikRef = useRef<FormikProps<typeof initialValues>>(null);
  const [selectedUnit, setSelectedUnit] = React.useState<Unit>();
  const {product, updateProduct} = useAddProductStore();
  const units = product?.units;

  const generateId = () => Date.now() + Math.floor(Math.random() * 1000);

  const handleAddDynamicVariant = (
    setFieldValue: FormikHelpers<FormikValues>['setFieldValue'],
    values: typeof initialValues,
  ) => {
    const newVariant: VariantInput = {
      id: generateId(),
      name: '',
      value: '',
    };

    const updatedVariants = [...values.variants, newVariant];
    setFieldValue('variants', updatedVariants);
  };

  const handleRemoveDynamicVariant = (
    id: number,
    setFieldValue: FormikHelpers<FormikValues>['setFieldValue'],
    values: typeof initialValues,
  ) => {
    const updatedVariants = values.variants.filter(variant => variant.id !== id);
    setFieldValue('variants', updatedVariants);
  };

  const handleChangeDynamicText = (
    id: number,
    field: keyof VariantInput,
    value: string,
    values: typeof initialValues,
    setFieldValue: FormikHelpers<FormikValues>['setFieldValue'],
  ) => {
    const updatedVariants = values.variants.map(variant =>
      variant.id === id ? {...variant, [field]: value} : variant,
    );
    setFieldValue('variants', updatedVariants);
  };

  const renderVariantInput = (
    variant: VariantInput,
    setFieldValue: FormikHelpers<FormikValues>['setFieldValue'],
    values: typeof initialValues,
  ) => {
    return (
      <View className="flex-row gap-2 items-center mb-1.5 flex-1">
        <View className="flex-1 gap-2">
          <Input
            // onChangeText={text => handleChangeText(variant.id, 'name', text)}
            onChangeText={text => handleChangeDynamicText(variant.id, 'name', text, values, setFieldValue)}
            leadingIcon="layers"
            placeholder="Contoh: Color"
            size={inputSize}
            value={variant.name}
          />
        </View>
        <View className="flex-1 gap-2">
          <Input
            // onChangeText={text => handleChangeText(variant.id, 'value', text)}
            onChangeText={text => handleChangeDynamicText(variant.id, 'value', text, values, setFieldValue)}
            placeholder="Contoh: Green"
            size={inputSize}
            value={variant.value}
          />
        </View>
      </View>
    );
  };

  const handleSelectUnit = (unit: Unit) => {
    setSelectedUnit(unit);
  };

  const parseToVariant = (data: {
    price: number;
    stock: number;
    unit?: {id: number; name: string};
    variants: {name: string; value: string}[];
  }): Variant => {
    const dynamicFields = data.variants.reduce(
      (acc, curr) => {
        if (curr.name && curr.value) {
          acc[curr.name] = curr.value;
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    return {
      price: Number(data.price),
      stock: Number(data.stock),
      unit: data.unit?.name,
      ...dynamicFields,
    };
  };

  const saveTrigger = useTriggerStore(state => state.triggerSaveAddVariant);

  // Listen trigher save
  useEffect(() => {
    if (formikRef.current) {
      formikRef.current.handleSubmit();
    }
  }, [saveTrigger]);

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
        {({values, handleChange, setFieldValue, errors}) => {
          console.log('err:', errors);
          return (
            <KeyboardAwareScrollView contentContainerStyle={{paddingBottom: 25}} bottomOffset={25}>
              <View className="px-4 pt-8">
                <View className="mb-4 gap-2">
                  <Text className="text-sm text-gray-800">Pilih satuan</Text>

                  <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <View className="flex-row gap-2">
                      {units?.map(item => (
                        <TouchableOpacity
                          onPress={() => {
                            handleSelectUnit(item);
                            setFieldValue('unit', item);
                          }}
                          key={item.id}
                          className={clsx('border border-dashed border-gray-300 rounded-xl px-4 py-3', {
                            'bg-gray-100': selectedUnit?.id === item.id,
                          })}>
                          <Text>{item.name}</Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  </ScrollView>
                </View>

                <View className="flex-row gap-2 items-center mb-2">
                  <View className="flex-1">
                    <Text className={clsx('text-gray-800', labelSize)}>Varian</Text>
                  </View>
                  <View className="flex-1">
                    <Text className={clsx('text-gray-800', labelSize)}>Detail</Text>
                  </View>
                  <IconButton disabled color={'transparent'} icon="delete" size={'xs'} />
                </View>

                <>
                  {values.variants.slice(0, -1).map((item, _) => {
                    return (
                      <View key={item.id} className="flex-row items-center gap-2">
                        {renderVariantInput(item, setFieldValue, values)}
                        <IconButton
                          color={colors.gray[500]}
                          onPress={() => handleRemoveDynamicVariant(item.id, setFieldValue, values)}
                          icon="delete"
                          size={'xs'}
                        />
                      </View>
                    );
                  })}

                  <View className="flex-row items-center gap-2">
                    {renderVariantInput(values.variants.slice(-1)[0], setFieldValue, values)}
                    <IconButton
                      roundedSize={12}
                      color="white"
                      backgroundColor={colors.orange[500]}
                      onPress={() => {
                        handleAddDynamicVariant(setFieldValue, values);
                      }}
                      size="xs"
                      icon="add"
                    />
                  </View>

                  <View className="flex-row gap-2 items-center mt-6">
                    <View className="flex-1 gap-2">
                      <Text className={clsx('text-gray-800', labelSize)}>Harga variasi</Text>
                      <Input
                        leadingIcon="attch_money"
                        onChangeText={handleChange('price')}
                        placeholder="3.500"
                        size={inputSize}
                      />
                    </View>
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

                  <View className="mt-4">
                    <Button
                      onPress={() => {
                        formikRef.current?.submitForm();
                      }}
                      title="Submit"
                      containerColor={colors.orange[500]}
                    />
                  </View>
                </>
              </View>
            </KeyboardAwareScrollView>
          );
        }}
      </Formik>
    </View>
  );
};
