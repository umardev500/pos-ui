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
  // ————————————————————————————————————————————————
  // 🌟 Refs: Formik & Bottom Sheets
  // ————————————————————————————————————————————————
  const categorySheetRef = useRef<TrueSheet>(null);
  const unitSheetRef = useRef<TrueSheet>(null);
  const formikRef = useRef<FormikProps<ProductInput>>(null);

  // ————————————————————————————————————————————————
  // 📦 Global State Store
  // ————————————————————————————————————————————————
  const {product, updateProduct} = useAddProductStore();
  const isSaveAddProductPressed = useTriggerStore(state => state.isSaveAddProductPressed);
  const setSaveAddProductPressed = useTriggerStore(state => state.setSaveAddProductPressed);
  const setSaveAddProductEnabled = useTriggerStore(state => state.setSaveAddProductEnabled);

  // ————————————————————————————————————————————————
  // 🛠 Local UI State
  // ————————————————————————————————————————————————
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(product?.category);
  const [selectedUnits, setSelectedUnits] = useState<Unit[]>(product?.units || []);

  // ————————————————————————————————————————————————
  // 📝 Effects
  // ————————————————————————————————————————————————

  /**
   * Auto-submit the form when the global "save" trigger is toggled.
   * Useful for submitting from a parent or external button.
   */
  useEffect(() => {
    if (formikRef.current && isSaveAddProductPressed) {
      formikRef.current.submitForm();
      setSaveAddProductPressed(false);
    }
  }, [isSaveAddProductPressed]);

  /**
   * Sync selected units with the product in the global store
   * whenever the unit selection changes.
   */
  useEffect(() => {
    if (selectedUnits.length > 0) {
      updateProduct({units: selectedUnits});
    }
  }, [selectedUnits]);

  /**
   * Sync selected category with the product in the global store
   * whenever the category selection changes.
   */
  useEffect(() => {
    if (selectedCategory) {
      updateProduct({category: selectedCategory});
    }
  }, [selectedCategory]);

  /**
   * Reset the selected category and units when the product
   * state matches the initial product state (i.e., form reset).
   */
  useEffect(() => {
    if (lodash.isEqual(product, initialProductState)) {
      setSelectedCategory(undefined);
      setSelectedUnits([]);
    }
  }, [product]);

  // ————————————————————————————————————————————————
  // ⚙️ Handlers
  // ————————————————————————————————————————————————

  /**
   * Toggle category selection.
   * Deselects if the selected category is clicked again.
   */
  const toggleCategory = (category: Category) => {
    setSelectedCategory(prev => (prev?.id === category.id ? undefined : category));
  };

  /**
   * Toggle a unit in the selected unit list.
   * Adds if not present, removes if already selected.
   */
  const toggleUnit = (unit: Unit) => {
    setSelectedUnits(prev => (prev.some(u => u.id === unit.id) ? prev.filter(u => u.id !== unit.id) : [...prev, unit]));
  };

  // ————————————————————————————————————————————————
  // 🧪 Input Validator
  // ————————————————————————————————————————————————

  /**
   * Debounced handler to validate the form input and toggle
   * the save button's enabled state accordingly.
   */
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
