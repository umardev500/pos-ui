import {IconButton, Input} from '@app/components/atoms';
import {useCartStore} from '@app/stores';
import {colors} from '@app/styles';
import {AddDPFormValues, addDPSchema, defaultAddDPFormValues} from '@app/validations';
import {Formik, FormikProps} from 'formik';
import React, {useRef} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';

type Props = {};

export const AddDPScreen: React.FC<Props> = ({}) => {
  const formRef = useRef<FormikProps<AddDPFormValues>>(null);
  const setAdditionalInfo = useCartStore(state => state.setAdditionalInfo);
  const additionalInfo = useCartStore(state => state.additionalInfo);
  const defaultFormValues: AddDPFormValues = additionalInfo?.downPayment
    ? {price: additionalInfo.downPayment}
    : defaultAddDPFormValues;

  const onSubmit = () => {};
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
        Toast.show({
          type: 'success',
          text1: 'Data added successfully 🎉',
        });

        setAdditionalInfo({downPayment: formRef.current?.values.price});
      }
    }, 300);
  };

  return (
    <View className="flex-1 bg-white">
      <View className="p-4 flex-row items-center gap-2">
        <Formik innerRef={formRef} validationSchema={addDPSchema} initialValues={defaultFormValues} onSubmit={onSubmit}>
          {({values, handleChange}) => {
            return (
              <>
                <View className="flex-1">
                  <Input
                    onChangeText={handleChange('price')}
                    keyboardType="number-pad"
                    placeholder="Masukan jumlah"
                    size="sm"
                    value={values.price > 0 ? values.price.toString() : ''}
                  />
                </View>
              </>
            );
          }}
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
