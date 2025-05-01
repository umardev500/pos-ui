import {Input} from '@app/components/atoms';
import {useTriggerStore} from '@app/stores';
import {CategoryInput, ManageProductStackParamList} from '@app/types';
import {createDebouncedInputValidator} from '@app/utils';
import {AddUnitSchema} from '@app/validations';
import {StackScreenProps} from '@react-navigation/stack';
import {Formik, FormikProps} from 'formik';
import React, {useEffect, useMemo} from 'react';
import {Text, View} from 'react-native';

type Props = StackScreenProps<ManageProductStackParamList, 'AddUnit'>;

const initialValues: CategoryInput = {
  name: '',
  description: undefined,
};

export const AddUnitScreen: React.FC<Props> = ({route}) => {
  // ————————————————————————————————————————————————
  // 🛠 References and State
  // ————————————————————————————————————————————————
  const formikRef = React.useRef<FormikProps<CategoryInput>>(null);
  const id = route.params?.id; // TODO: get category by id if id is provided

  // ————————————————————————————————————————————————
  // 📦 Store States
  // ————————————————————————————————————————————————
  const isSaveAddUnitPressed = useTriggerStore(state => state.isSaveAddUnitPressed);
  const setSaveAddUnitEnabled = useTriggerStore(state => state.setSaveAddUnitEnabled);

  // ————————————————————————————————————————————————
  // 🧪 Effects
  // ————————————————————————————————————————————————
  // Trigger form submission when save category is pressed
  useEffect(() => {
    if (isSaveAddUnitPressed) {
      formikRef?.current?.submitForm();
    }
  }, [isSaveAddUnitPressed]);

  // ————————————————————————————————————————————————
  // 📝 Handlers
  // ————————————————————————————————————————————————
  const onSubmit = (values: CategoryInput) => {
    // TODO: save category
    console.log(values);
  };

  // ————————————————————————————————————————————————
  // 🧪 Input Validator
  // ————————————————————————————————————————————————
  const handleValidInputChange = useMemo(() => {
    return createDebouncedInputValidator(setSaveAddUnitEnabled, 500);
  }, [setSaveAddUnitEnabled]);

  return (
    <>
      <Formik
        innerRef={formikRef}
        validationSchema={AddUnitSchema}
        initialValues={initialValues}
        validateOnMount
        onSubmit={onSubmit}>
        {({values, handleChange, isValid}) => {
          handleValidInputChange(isValid);

          return (
            <View className="flex-1 bg-white p-4 gap-4">
              <View className="gap-2">
                <Text className="text-sm text-gray-800">Nama Satuan*</Text>
                <Input
                  leadingIcon="sell"
                  onChangeText={handleChange('name')}
                  placeholder="contoh: Kiloan"
                  size="sm"
                  value={values?.name}
                />
              </View>

              <View className="gap-2">
                <Text className="text-sm text-gray-800">Keterangan</Text>
                <Input
                  isTextArea
                  onChangeText={handleChange('description')}
                  placeholder="Deskripsi dari satuan"
                  size="sm"
                  value={values?.description}
                />
              </View>
            </View>
          );
        }}
      </Formik>
    </>
  );
};
