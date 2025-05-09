import {Formik, FormikProps} from 'formik';
import React, {useRef} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';

import {IconButton, Input} from '@app/components/atoms';
import {useCartStore} from '@app/stores';
import {colors} from '@app/styles';
import {AddDPFormValues, addDPSchema, defaultAddDPFormValues} from '@app/validations';

export const AddDPScreen: React.FC = () => {
  const formRef = useRef<FormikProps<AddDPFormValues>>(null);

  const setAdditionalInfo = useCartStore(state => state.setAdditionalInfo);
  const additionalInfo = useCartStore(state => state.additionalInfo);

  const initialValues: AddDPFormValues = additionalInfo?.downPayment
    ? {price: additionalInfo.downPayment}
    : defaultAddDPFormValues;

  const onSubmit = () => {
    // No-op since we manually trigger submission
  };

  const handleSubmit = () => {
    formRef.current?.submitForm();

    setTimeout(() => {
      const errors = formRef.current?.errors;
      if (errors && Object.keys(errors).length > 0) {
        Toast.show({
          type: 'error',
          text1: 'Please enter valid data',
        });
      } else {
        const price = formRef.current?.values.price;
        if (price) {
          setAdditionalInfo({downPayment: price});
          Toast.show({
            type: 'success',
            text1: 'Data added successfully 🎉',
          });
        }
      }
    }, 300);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 flex-row items-center gap-2">
        <Formik innerRef={formRef} initialValues={initialValues} validationSchema={addDPSchema} onSubmit={onSubmit}>
          {({values, handleChange}) => (
            <View className="flex-1">
              <Input
                onChangeText={handleChange('price')}
                keyboardType="number-pad"
                placeholder="Masukan jumlah"
                size="sm"
                value={values.price > 0 ? values.price.toString() : ''}
              />
            </View>
          )}
        </Formik>

        <IconButton
          onPress={handleSubmit}
          activeOpacity={0.7}
          icon="check"
          backgroundColor={colors.orange[500]}
          size="sm"
          roundedSize={12}
          color={colors.white}
        />
      </View>
    </View>
  );
};
