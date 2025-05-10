import {LabeledInput} from '@app/components/molecules';
import {SelectionSheet} from '@app/components/organisms';
import {useCreateCustomer, useCustomerLevels, useUpdateCustomer} from '@app/hooks';
import {colors} from '@app/styles';
import {CustomerDTO, Level, MainStackParamList} from '@app/types';
import {isFormValidAndChanged} from '@app/utils';
import {
  CreateCustomerDTO,
  createCustomerSchema,
  defaultCustomerValues,
  defaultUpdateCustomerValues,
  UpdateCustomerDTO,
  updateCustomerSchema,
} from '@app/validations';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import {StackScreenProps} from '@react-navigation/stack';
import {Formik, FormikProps} from 'formik';
import lodash, {isEmpty} from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';

type Props = StackScreenProps<MainStackParamList, 'AddCustomer'>;

export const AddCustomerScreen: React.FC<Props> = ({navigation, route}) => {
  const formRef = useRef<FormikProps<UpdateCustomerDTO>>(null);
  const levelSheetRef = useRef<TrueSheet>(null);
  const [selectedLevels, setSelectedLevels] = useState<Level[]>([]);

  // ————————————————————————————————————————————————
  // 🧠 State
  // ————————————————————————————————————————————————
  const {params} = route;
  const {item, triggerSave} = params || {};
  const isUpdate = !!item;

  // ————————————————————————————————————————————————
  // 📦 Handle Success
  // ————————————————————————————————————————————————
  const handleOnSuccess = () => {
    setOffTrigger();
    formRef.current?.resetForm(); // ✅ Reset form values
    setSelectedLevels([]); // ✅ Clear level selection UI
    Toast.show({
      type: 'success',
      text1: isUpdate ? 'Customer updated successfully 🎉' : 'Customer created successfully 🎉',
    });
  };

  // ————————————————————————————————————————————————
  // 📦 Hooks
  // ————————————————————————————————————————————————
  const {mutate: createCustomer} = useCreateCustomer(handleOnSuccess);
  const {mutate: updateCustomer} = useUpdateCustomer(handleOnSuccess);
  const {data: customerLevels} = useCustomerLevels();

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

  const handleSubmit = async (values: CreateCustomerDTO | UpdateCustomerDTO) => {
    if (isUpdate) {
      updateCustomer({id: item!.id, data: values});
      return;
    }
    createCustomer(values as CreateCustomerDTO);
  };

  // ————————————————————————————————————————————————
  // 🧪 Effects
  // ————————————————————————————————————————————————
  useEffect(() => {
    if (triggerSave?.pressed) {
      submitForm();
    }
  }, [triggerSave?.pressed]);

  useEffect(() => {
    if (!item) return;

    Object.keys(defaultUpdateCustomerValues).forEach(key => {
      const value = item[key as keyof CustomerDTO];
      if (key === 'level') {
        setFieldValue<UpdateCustomerDTO>('level', item.level);
        return;
      }
      setFieldValue<UpdateCustomerDTO>(key as keyof UpdateCustomerDTO, value);
    });

    setSelectedLevels(item?.level ? [item.level] : []);
  }, [item]);

  // ————————————————————————————————————————————————
  // 🛠 Handlers
  // ————————————————————————————————————————————————
  const handleSelectLevel = (items: Level[]) => {
    setSelectedLevels(items);
    setFieldValue<CreateCustomerDTO>('level', items[0]);
  };

  const setFieldValue = <T,>(field: keyof T, value: T[keyof T]) => {
    formRef.current?.setFieldValue(field as string, value); // Using Formik's `setFieldValue`
  };

  const setOffTrigger = () => {
    navigation.setParams({
      triggerSave: {
        pressed: false,
      },
    });
  };

  const handleValidInput = lodash.debounce((isValid: boolean) => {
    console.log(isValid);
    if (!isValid) {
      if (!triggerSave?.ready) return;

      navigation.setParams({
        triggerSave: {
          ready: false,
        },
      });

      return;
    }

    if (triggerSave?.ready) return;

    navigation.setParams({
      triggerSave: {
        ready: true,
      },
    });
  }, 500);

  return (
    <>
      <View className="flex-1 bg-white p-4">
        <Formik
          validationSchema={isUpdate ? updateCustomerSchema : createCustomerSchema}
          initialValues={isUpdate ? defaultUpdateCustomerValues : defaultCustomerValues}
          onSubmit={handleSubmit}
          innerRef={formRef}>
          {({values, handleChange, isValid, errors}) => {
            console.log('erros', errors);
            const isValidInput = isFormValidAndChanged(
              values,
              isUpdate ? defaultUpdateCustomerValues : defaultCustomerValues,
              isValid,
            );
            handleValidInput(isValidInput);

            return (
              <View className="gap-2.5">
                <LabeledInput
                  icon="person_fill"
                  label="Nama*"
                  placeholder="Contoh: Alex Wijaya"
                  onChange={handleChange('name')}
                  value={values.name}
                />
                <LabeledInput
                  icon="layers"
                  label="Level*"
                  isClickableOnly
                  trailingIcon="chevron_right"
                  placeholder={values.level.name || 'Pilih level customer'}
                  placeholderTextColor={values.level.name ? colors.gray[800] : undefined}
                  onPress={() => levelSheetRef.current?.present()}
                />
                <LabeledInput
                  icon="alternate_email"
                  label="Email*"
                  placeholder="Contoh: alex@email.com"
                  onChange={handleChange('email')}
                  value={values.email}
                />
                <LabeledInput
                  icon="call"
                  label="Nomor Telepon"
                  placeholder="Contoh: +6281234567890"
                  onChange={handleChange('phone')}
                  value={values.phone || ''}
                />
                <LabeledInput
                  icon="edit_note"
                  label="Alamat"
                  isTextArea
                  placeholder="Masukkan alamat lengkap"
                  onChange={handleChange('address')}
                  value={values.address || ''}
                />
              </View>
            );
          }}
        </Formik>
      </View>

      <SelectionSheet
        ref={levelSheetRef}
        title="Pilih Level"
        items={customerLevels}
        selected={selectedLevels}
        onSelect={handleSelectLevel}
      />
    </>
  );
};
