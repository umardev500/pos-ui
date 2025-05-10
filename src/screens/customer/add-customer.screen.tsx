import {LabeledInput, SelectableItemType} from '@app/components/molecules';
import {SelectionSheet} from '@app/components/organisms';
import {useCreateCustomer} from '@app/hooks';
import {colors} from '@app/styles';
import {CustomerDTO, DiscountType, Level, MainStackParamList} from '@app/types';
import {isFormValidAndChanged} from '@app/utils';
import {
  CreateCustomerDTO,
  createCustomerSchema,
  defaultCustomerValues,
  defaultUpdateCustomerValues,
  UpdateCustomerDTO,
} from '@app/validations';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import {StackScreenProps} from '@react-navigation/stack';
import {Formik, FormikProps} from 'formik';
import lodash, {isEmpty} from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import Toast from 'react-native-toast-message';

type Props = StackScreenProps<MainStackParamList, 'AddCustomer'>;

const LEVELS: SelectableItemType[] = [
  {id: 1, label: 'Level 1'},
  {id: 2, label: 'Level 2'},
  {id: 3, label: 'Level 3'},
];

export const dummyLevels: Level[] = [
  {
    id: 1,
    merchant_id: 1,
    name: 'Silver',
    description: 'Basic membership tier with limited benefits',
    discount_type: DiscountType.PERCENT,
    discount: 5,
    created_at: '2025-01-01T08:00:00Z',
    updated_at: '2025-01-01T08:00:00Z',
  },
  {
    id: 2,
    merchant_id: 1,
    name: 'Gold',
    description: 'Premium membership with more benefits',
    discount_type: DiscountType.PERCENT,
    discount: 10,
    created_at: '2025-02-15T10:30:00Z',
    updated_at: '2025-02-15T10:30:00Z',
  },
  {
    id: 3,
    merchant_id: 1,
    name: 'Platinum',
    description: 'Elite membership with maximum benefits',
    discount_type: DiscountType.FIXED,
    discount: 20000,
    created_at: '2025-03-10T12:00:00Z',
    updated_at: '2025-03-10T12:00:00Z',
  },
];

export const AddCustomerScreen: React.FC<Props> = ({navigation, route}) => {
  const formRef = useRef<FormikProps<CreateCustomerDTO>>(null);
  const levelSheetRef = useRef<TrueSheet>(null);
  const [selectedLevels, setSelectedLevels] = useState<Level[]>([]);
  const selectedLabel = selectedLevels.map(sl => sl.name).join(', ');

  // ————————————————————————————————————————————————
  // 🧠 State
  // ————————————————————————————————————————————————
  const {params} = route;
  const {item, triggerSave} = params || {};

  // ————————————————————————————————————————————————
  // 📦 Handle Success
  // ————————————————————————————————————————————————
  const handleOnSuccess = () => {
    setOffTrigger();
    formRef.current?.resetForm(); // ✅ Reset form values
    setSelectedLevels([]); // ✅ Clear level selection UI
    Toast.show({
      type: 'success',
      text1: 'Customer created successfully 🎉',
    });
  };

  // ————————————————————————————————————————————————
  // 📦 Hooks
  // ————————————————————————————————————————————————
  const {mutate: createCustomer} = useCreateCustomer(handleOnSuccess);

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
    createCustomer(values);
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
    if (!isValid || triggerSave?.ready) return;

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
          validationSchema={createCustomerSchema}
          initialValues={defaultCustomerValues}
          onSubmit={handleSubmit}
          innerRef={formRef}>
          {({values, handleChange, isValid}) => {
            const isValidInput = isFormValidAndChanged(values, defaultCustomerValues, isValid);
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
                  placeholder={selectedLabel || 'Pilih level customer'}
                  placeholderTextColor={selectedLabel ? colors.gray[800] : undefined}
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
                  value={values.phone}
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
        items={dummyLevels}
        selected={selectedLevels}
        onSelect={handleSelectLevel}
      />
    </>
  );
};
