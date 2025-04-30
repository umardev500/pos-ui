import {FormikProps} from 'formik';
import React, {useEffect, useRef, useState} from 'react';
import {View} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-controller';

import {CategorySheet, ProductForm, UnitSheet} from '@app/components/organisms';
import {initialProductState, useAddProductStore} from '@app/stores';
import {Category, ProductInput, Unit} from '@app/types';
import {TrueSheet} from '@lodev09/react-native-true-sheet';

type Props = {};

export const AddProductScreen: React.FC<Props> = () => {
  const categorySheetRef = useRef<TrueSheet>(null);
  const unitSheetRef = useRef<TrueSheet>(null);
  const formikRef = useRef<FormikProps<ProductInput>>(null);

  const {product, trigger, updateProduct} = useAddProductStore();

  const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(product?.category);
  const [selectedUnits, setSelectedUnits] = useState<Unit[]>(product?.units || []);

  useEffect(() => {
    if (trigger > 0) formikRef.current?.submitForm();
  }, [trigger]);

  useEffect(() => {
    if (selectedUnits.length) updateProduct({units: selectedUnits});
  }, [selectedUnits]);

  useEffect(() => {
    if (selectedCategory) updateProduct({category: selectedCategory});
  }, [selectedCategory]);

  const toggleCategory = (category: Category) => {
    setSelectedCategory(prev => (prev?.id === category.id ? undefined : category));
  };

  const toggleUnit = (unit: Unit) => {
    setSelectedUnits(prev => (prev.some(u => u.id === unit.id) ? prev.filter(u => u.id !== unit.id) : [...prev, unit]));
  };

  return (
    <View className="flex-1 bg-white">
      <KeyboardAwareScrollView
        bottomOffset={25}
        contentContainerStyle={{paddingHorizontal: 16, paddingTop: 16, paddingBottom: 150}}>
        <ProductForm
          unitSheetRef={unitSheetRef}
          categorySheetRef={categorySheetRef}
          selectedCategory={selectedCategory}
          selectedUnits={selectedUnits}
          product={product}
          updateProduct={updateProduct}
          initialProductState={initialProductState}
        />
      </KeyboardAwareScrollView>

      <CategorySheet ref={categorySheetRef} selected={selectedCategory} onSelect={toggleCategory} />
      <UnitSheet ref={unitSheetRef} selected={selectedUnits} onSelect={toggleUnit} />
    </View>
  );
};
