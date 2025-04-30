import {Input} from '@app/components/atoms';
import {useTriggerStore} from '@app/stores';
import {CategoryInput, ManageProductStackParamList} from '@app/types';
import {AddCategorySchema} from '@app/validations';
import {StackScreenProps} from '@react-navigation/stack';
import {Formik, FormikProps} from 'formik';
import {debounce} from 'lodash';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

type Props = StackScreenProps<ManageProductStackParamList, 'CategoryDetail'>;

const initialValues: CategoryInput = {
  name: '',
  description: undefined,
};

export const CategoryDetailScreen: React.FC<Props> = ({route}) => {
  const id = route.params?.id;
  // TODO: get category by id if id is provided

  const formikRef = React.useRef<FormikProps<CategoryInput>>(null);

  const isSaveAddCategoryPressed = useTriggerStore(state => state.isSaveAddCategoryPressed);
  const setSaveAddCategoryEnabled = useTriggerStore(state => state.setSaveAddCategoryEnabled);

  useEffect(() => {
    if (isSaveAddCategoryPressed) {
      formikRef?.current?.submitForm();
    }
  }, [isSaveAddCategoryPressed]);

  const onSubmit = (values: CategoryInput) => {
    // TODO: save category
    console.log(values);
  };

  const handleValidInputChange = debounce((isValid: boolean) => {
    setSaveAddCategoryEnabled(isValid);
  }, 500);

  return (
    <>
      <Formik
        innerRef={formikRef}
        validationSchema={AddCategorySchema}
        initialValues={initialValues}
        onSubmit={onSubmit}>
        {({values, handleChange, isValid}) => {
          handleValidInputChange(isValid);

          return (
            <View className="flex-1 bg-white p-4 gap-4">
              <View className="gap-2">
                <Text className="text-base text-gray-800">Nama Kategory*</Text>
                <Input onChangeText={handleChange('name')} placeholder="Kategori" size="md" value={values?.name} />
              </View>

              <View className="gap-2">
                <Text className="text-base text-gray-800">Keterangan</Text>
                <Input
                  onChangeText={handleChange('description')}
                  placeholder="Deskripsi dari kategori"
                  size="md"
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
