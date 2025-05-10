import {LabeledInput, SelectableItemType} from '@app/components/molecules';
import {SelectionSheet} from '@app/components/organisms';
import {colors} from '@app/styles';
import {MainStackParamList} from '@app/types';
import {CreateCustomerDTO, createCustomerSchema, defaultCustomerValues} from '@app/validations';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import {StackScreenProps} from '@react-navigation/stack';
import {Formik, FormikProps} from 'formik';
import {isEmpty} from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';

type Props = StackScreenProps<MainStackParamList, 'AddCustomer'>;

const LEVELS: SelectableItemType[] = [
  {id: 1, label: 'Level 1'},
  {id: 2, label: 'Level 2'},
  {id: 3, label: 'Level 3'},
];

export const AddCustomerScreen: React.FC<Props> = ({navigation, route}) => {
  const formRef = useRef<FormikProps<CreateCustomerDTO>>(null);
  const levelSheetRef = useRef<TrueSheet>(null);
  const [selectedLevels, setSelectedLevels] = useState<SelectableItemType[]>([]);
  const selectedLabel = selectedLevels.map(sl => sl.label).join(', ');

  // ————————————————————————————————————————————————
  // 📦 Submit + Validation
  // ————————————————————————————————————————————————
  const submitForm = () => {
    formRef.current?.submitForm();
    validateForm();
  };

  const validateForm = async () => {
    const errors = await formRef.current?.validateForm();
    if (!isEmpty(errors)) {
      Toast.show({
        type: 'error',
        text1: 'Please enter valid data',
        onShow: () => {
          setTimeout(() => {
            setOffTrigger();
          }, 100);
        },
      });
    }
  };

  const handleSubmit = (values: CreateCustomerDTO) => {
    console.log('Submitted values:', values);

    Toast.show({
      type: 'success',
      text1: 'Customer added successfully 🎉',
      onShow: () => {
        setTimeout(() => {
          setOffTrigger();
        }, 100);
      },
    });
  };

  // ————————————————————————————————————————————————
  // 🧪 Effects
  // ————————————————————————————————————————————————
  useEffect(() => {
    if (route.params?.triggerSave) {
      submitForm();
    }
  }, [route.params?.triggerSave]);

  // ————————————————————————————————————————————————
  // 🛠 Handlers
  // ————————————————————————————————————————————————
  const handleSelectLevel = (items: SelectableItemType[]) => {
    setSelectedLevels(items);
    setFieldValue('level_id', items[0].id as number);
  };

  const setFieldValue = <K extends keyof CreateCustomerDTO>(field: K, value: CreateCustomerDTO[K]) => {
    formRef.current?.setFieldValue(field, value);
  };

  const setOffTrigger = () => {
    navigation.setParams({triggerSave: false});
  };

  return (
    <>
      <View className="flex-1 bg-white p-4">
        <Formik
          validationSchema={createCustomerSchema}
          initialValues={defaultCustomerValues}
          onSubmit={handleSubmit}
          innerRef={formRef}>
          {({handleChange}) => (
            <View className="gap-2.5">
              <LabeledInput
                icon="person_fill"
                label="Nama*"
                placeholder="Contoh: Alex Wijaya"
                onChange={handleChange('name')}
              />
              <LabeledInput
                icon="layers"
                label="Level*"
                isClickableOnly
                trailingIcon="chevron_right"
                placeholder={selectedLabel || 'Pilih level customer'}
                placeholderTextColor={selectedLabel ? colors.gray[800] : undefined}
                onPress={() => levelSheetRef.current?.present()}
              />
              <LabeledInput
                icon="alternate_email"
                label="Email*"
                placeholder="Contoh: alex@email.com"
                onChange={handleChange('email')}
              />
              <LabeledInput
                icon="call"
                label="Nomor Telepon"
                placeholder="Contoh: +6281234567890"
                onChange={handleChange('phone')}
              />
              <LabeledInput
                icon="edit_note"
                label="Alamat"
                isTextArea
                placeholder="Masukkan alamat lengkap"
                onChange={handleChange('address')}
              />
            </View>
          )}
        </Formik>
      </View>

      <SelectionSheet
        ref={levelSheetRef}
        title="Pilih Level"
        items={LEVELS}
        selected={selectedLevels}
        onSelect={handleSelectLevel}
      />
    </>
  );
};
