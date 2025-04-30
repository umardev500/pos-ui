import React, {useState} from 'react';
import {View} from 'react-native';
import {Route, SceneMap} from 'react-native-tab-view';

import {TabView, VariantList} from '@app/components/organisms';
import {useAddProductStore} from '@app/stores';
import {RenderScene} from '@app/types';

// ✅ Define Variant type with flexible keys
type Variant = {
  unit: string;
  stock: number;
  price: number;
  [key: string]: any; // dynamic fields like size, color, crust
};

// ✅ Sample data
const allVariants: Variant[] = [
  {size: 'M', crust: 'Thin', color: 'White', price: 11.99, stock: 80, unit: 'roll'},
  {size: 'L', crust: 'Thick', color: 'Black', price: 15.99, stock: 50, unit: 'roll'},
  {size: 'XL', crust: 'Large', color: 'Rainbow', price: 25.99, stock: 24, unit: 'kilos'},
  {size: 'M', crust: 'Thin', color: 'White', price: 13.99, stock: 50, unit: 'kilos'},
  {size: 'L', crust: 'Thick', color: 'Black', price: 22.99, stock: 10, unit: 'kilos'},
  {size: 'XL', crust: 'Large', color: 'Rainbow', price: 31.99, stock: 12, unit: 'kilos'},
  {size: 'M', crust: 'Thin', color: 'White', price: 3.99, stock: 800, unit: 'pack'},
  {size: 'L', crust: 'Thick', color: 'Black', price: 2.99, stock: 250, unit: 'pack'},
  {size: 'XL', crust: 'Large', color: 'Rainbow', price: 1.99, stock: 124, unit: 'pack'},
];

// ✅ Utility to group by unit
const groupByUnit = (variants: Variant[]) => {
  return variants.reduce<Record<string, Variant[]>>((acc, curr) => {
    const {unit} = curr;
    if (!acc[unit]) acc[unit] = [];
    acc[unit].push(curr);
    return acc;
  }, {});
};

export const AddProductVariantListScreen: React.FC = () => {
  const [variantList, setVariantList] = useState<Variant[]>(allVariants);
  const {product} = useAddProductStore();
  const units = product?.units ?? [];

  // ✅ Handle delete for a given unit and index
  const handleDelete = (unit: string, index: number) => {
    const groupedVariants = groupByUnit(variantList);
    const updatedGroup = [...groupedVariants[unit]];
    updatedGroup.splice(index, 1); // Remove the item at index

    const updatedVariantList: Variant[] = Object.entries(groupedVariants).flatMap(([key, group]) =>
      key === unit ? updatedGroup : group,
    );

    setVariantList(updatedVariantList);
  };

  const groupedVariants = groupByUnit(variantList);

  // ✅ Create routes from units in store
  const routes: Route[] = units.map(unit => ({
    key: unit.name.toLocaleLowerCase(),
    title: unit.name,
  }));

  // ✅ Create scenes for each route
  const renderScene: RenderScene = SceneMap(
    Object.fromEntries(
      units.map(unit => {
        const unitName = unit.name.toLocaleLowerCase();
        const data = groupedVariants[unitName] || [];
        return [
          unitName,
          () => <VariantList data={data} onDelete={(index: number) => handleDelete(unitName, index)} />,
        ];
      }),
    ),
  );

  return (
    <View className="flex-1 bg-white py-4">
      <TabView routes={routes} renderScene={renderScene} />
    </View>
  );
};
