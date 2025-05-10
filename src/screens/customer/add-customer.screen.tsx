import {LabeledInput, SelectableItemType} from '@app/components/molecules';
import {SelectionSheet} from '@app/components/organisms';
import {MainStackParamList} from '@app/types';
import {CreateCustomerDTO, createCustomerSchema, defaultCustomerValues} from '@app/validations';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import {StackScreenProps} from '@react-navigation/stack';
import {Formik, FormikProps} from 'formik';
import lodash from 'lodash';
import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';

type Props = StackScreenProps<MainStackParamList, 'AddCustomer'>;

export const AddCustomerScreen: React.FC<Props> = ({navigation, route}) => {
  const formRef = useRef<FormikProps<CreateCustomerDTO>>(null);
  const levelSelectionSheetReff = useRef<TrueSheet>(null);

  const {params} = route;
  const selectionData: SelectableItemType[] = [
    {
      id: 1,
      label: 'Level 1',
    },
    {
      id: 2,
      label: 'Level 2',
    },
    {
      id: 3,
      label: 'Level 3',
    },
  ];

  // ————————————————————————————————————————————————
  // 🧪 Effects
  // ————————————————————————————————————————————————
  useEffect(() => {
    if (params?.triggerSave) {
      formRef.current?.submitForm();

      navigation.setParams({triggerSave: false});
      handleValidateForm();
    }
  }, [params?.triggerSave]);

  // ————————————————————————————————————————————————
  // 🛠 Handlers
  // ————————————————————————————————————————————————
  const handleSubmit = (values: CreateCustomerDTO) => {
    console.log('values:', values);
  };

  const handleValidateForm = async () => {
    const errors = await formRef.current?.validateForm();
    if (!lodash.isEmpty(errors)) {
      Toast.show({
        type: 'error',
        text1: 'Please fill all required fields',
      });
      return;
    }

    Toast.show({
      type: 'success',
      text1: 'Data added successfully 🎉',
    });
  };

  const handlePressLevel = () => {
    levelSelectionSheetReff.current?.present();
  };

  return (
    <>
      <View className="flex-1 bg-white p-4">
        <Formik
          validationSchema={createCustomerSchema}
          innerRef={formRef}
          initialValues={defaultCustomerValues}
          onSubmit={handleSubmit}>
          {({handleChange}) => {
            return (
              <View className="gap-2.5">
                <LabeledInput
                  onChange={handleChange('name')}
                  icon="person_fill"
                  label="Nama*"
                  placeholder="Masukan nama customer"
                />
                <LabeledInput
                  isClickableOnly
                  trailingIcon="chevron_right"
                  icon="layers"
                  label="Level*"
                  placeholder="Pilih level"
                  onPress={handlePressLevel}
                />
                <LabeledInput
                  onChange={handleChange('email')}
                  icon="alternate_email"
                  label="Email*"
                  placeholder="umar......@...com"
                />
                <LabeledInput
                  onChange={handleChange('phone')}
                  icon="call"
                  label="Nomor Telepon"
                  placeholder="+628..........n"
                />
                <LabeledInput
                  onChange={handleChange('address')}
                  isTextArea
                  icon="edit_note"
                  label="Alamat"
                  placeholder="Masukan alamat"
                />
              </View>
            );
          }}
        </Formik>
      </View>

      <SelectionSheet
        items={selectionData}
        selected={[]}
        ref={levelSelectionSheetReff}
        title="Pilih Level"
        onSelect={() => {}}
      />
    </>
  );
};
