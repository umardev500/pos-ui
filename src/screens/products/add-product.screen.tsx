import {FormikProps} from 'formik';
import lodash from 'lodash';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';

import {CategorySheet, ProductForm, UnitSheet} from '@app/components/organisms';
import {initialProductState, useAddProductStore, useTriggerStore} from '@app/stores';
import {Category, ProductInput, Unit} from '@app/types';
import {TrueSheet} from '@lodev09/react-native-true-sheet';

type Props = {};

export const AddProductScreen: React.FC<Props> = () => {
  // Refs for Formik and bottom sheets
  const categorySheetRef = useRef<TrueSheet>(null);
  const unitSheetRef = useRef<TrueSheet>(null);
  const formikRef = useRef<FormikProps<ProductInput>>(null);

  // Global state store
  const {product, updateProduct} = useAddProductStore();
  const isSaveAddProductEnabled = useTriggerStore(state => state.isSaveAddProductEnabled);
  const toggleSaveAddProduct = useTriggerStore(state => state.toggleSaveAddProduct);

  // Local UI state
  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(product?.category);
  const [selectedUnits, setSelectedUnits] = useState<Unit[]>(product?.units || []);

  /**
   * Auto-submit form when the trigger changes
   */
  useEffect(() => {
    if (formikRef.current && isSaveAddProductEnabled) {
      formikRef.current.submitForm();
      toggleSaveAddProduct(false); // Toggle back to false after submission
    }
  }, [isSaveAddProductEnabled]);

  /**
   * Update product units when selection changes
   */
  useEffect(() => {
    if (selectedUnits.length) {
      updateProduct({units: selectedUnits});
    }
  }, [selectedUnits]);

  /**
   * Update product category when selection changes
   */
  useEffect(() => {
    if (selectedCategory) {
      updateProduct({category: selectedCategory});
    }
  }, [selectedCategory]);

  /**
   * Reset selected category and units if the product is cleared
   */
  useEffect(() => {
    if (lodash.isEqual(product, initialProductState)) {
      setSelectedCategory(undefined);
      setSelectedUnits([]);
    }
  }, [product]);

  /**
   * Toggle selected category (select or deselect)
   */
  const toggleCategory = (category: Category) => {
    setSelectedCategory(prev => (prev?.id === category.id ? undefined : category));
  };

  /**
   * Toggle selected unit (add or remove)
   */
  const toggleUnit = (unit: Unit) => {
    setSelectedUnits(prev => (prev.some(u => u.id === unit.id) ? prev.filter(u => u.id !== unit.id) : [...prev, unit]));
  };

  return (
    <View className="flex-1 bg-white">
      <KeyboardAwareScrollView
        bottomOffset={25}
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 16, paddingBottom: 150}}>
        <ProductForm
          formikRef={formikRef}
          unitSheetRef={unitSheetRef}
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
