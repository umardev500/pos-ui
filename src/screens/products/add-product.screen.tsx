import {FormikProps} from 'formik';
import lodash from 'lodash';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';

import {CategorySheet, ProductForm, UnitSheet} from '@app/components/organisms';
import {initialProductState, useAddProductStore, useTriggerStore} from '@app/stores';
import {Category, ProductInput, Unit} from '@app/types';
import {createDebouncedInputValidator} from '@app/utils';
import {TrueSheet} from '@lodev09/react-native-true-sheet';

type Props = {};

export const AddProductScreen: React.FC<Props> = () => {
  // ————————————————————————————————
  // 🌟 Refs: Formik & Bottom Sheets
  // ————————————————————————————————
  const categorySheetRef = useRef<TrueSheet>(null);
  const unitSheetRef = useRef<TrueSheet>(null);
  const formikRef = useRef<FormikProps<ProductInput>>(null);

  // ————————————————————————————————
  // 📦 Global State Store
  // ————————————————————————————————
  const {product, updateProduct} = useAddProductStore();
  const isSaveAddProductPressed = useTriggerStore(state => state.isSaveAddProductPressed);
  const setSaveAddProductPressed = useTriggerStore(state => state.setSaveAddProductPressed);
  const setSaveAddProductEnabled = useTriggerStore(state => state.setSaveAddProductEnabled);

  // ————————————————————————————————
  // 🛠 Local UI State
  // ————————————————————————————————
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(product?.category);
  const [selectedUnits, setSelectedUnits] = useState<Unit[]>(product?.units || []);

  // ————————————————————————————————
  // 📝 Effects
  // ————————————————————————————————

  // Auto-submit form on save trigger
  useEffect(() => {
    if (formikRef.current && isSaveAddProductPressed) {
      formikRef.current.submitForm();
      setSaveAddProductPressed(false);
    }
  }, [isSaveAddProductPressed]);

  // Update product units when selection changes
  useEffect(() => {
    if (selectedUnits.length > 0) {
      updateProduct({units: selectedUnits});
    }
  }, [selectedUnits]);

  // Update product category when selection changes
  useEffect(() => {
    if (selectedCategory) {
      updateProduct({category: selectedCategory});
    }
  }, [selectedCategory]);

  // Reset local state when product is cleared
  useEffect(() => {
    if (lodash.isEqual(product, initialProductState)) {
      setSelectedCategory(undefined);
      setSelectedUnits([]);
    }
  }, [product]);

  // ————————————————————————————————
  // ⚙️ Handlers
  // ————————————————————————————————

  // Toggle category selection
  const toggleCategory = (category: Category) => {
    setSelectedCategory(prev => (prev?.id === category.id ? undefined : category));
  };

  // Toggle unit selection
  const toggleUnit = (unit: Unit) => {
    setSelectedUnits(prev => (prev.some(u => u.id === unit.id) ? prev.filter(u => u.id !== unit.id) : [...prev, unit]));
  };

  // ————————————————————————————————
  // 🧪 Input Validator
  // ————————————————————————————————
  const handleValidInputChange = useMemo(() => {
    return createDebouncedInputValidator(setSaveAddProductEnabled, 500);
  }, []);

  return (
    <View className="flex-1 bg-white">
      <KeyboardAwareScrollView
        bottomOffset={25}
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 16, paddingBottom: 150}}>
        <ProductForm
          formikRef={formikRef}
          unitSheetRef={unitSheetRef}
          onIsValidInputChanged={handleValidInputChange}
          categorySheetRef={categorySheetRef}
          selectedCategory={selectedCategory}
          selectedUnits={selectedUnits}
          product={product}
          updateProduct={updateProduct}
          initialProductState={initialProductState}
        />
      </KeyboardAwareScrollView>

      {/* Bottom sheets for selecting category and units */}
      <CategorySheet ref={categorySheetRef} selected={selectedCategory} onSelect={toggleCategory} />
      <UnitSheet ref={unitSheetRef} selected={selectedUnits} onSelect={toggleUnit} />
    </View>
  );
};
