import React from 'react';
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
  const product = useAddProductStore(state => state.product);
  const updateProduct = useAddProductStore(state => state.updateProduct);
  const units = product?.units ?? [];

  // ✅ Handle delete for a given unit and index
  const handleDelete = (unit: string, index: number, item: any) => {
    if (!product) return;

    const updated = variants.filter(v => JSON.stringify(v) !== JSON.stringify(item));

    updateProduct({
      variants: updated,
    });
  };

  const variants = product?.variants ?? [];
  const groupedVariants = groupByUnit(variants as Variant[]);

  // ✅ Create routes from units in store
  const routes: Route[] = units.map(unit => ({
    key: unit.name,
    title: unit.name,
  }));

  // ✅ Create scenes for each route
  const renderScene: RenderScene = SceneMap(
    Object.fromEntries(
      units.map(unit => {
        const unitName = unit.name;
        const data = groupedVariants[unitName] || [];

        return [
          unitName,
          () => <VariantList data={data} onDelete={(index: number, item) => handleDelete(unitName, index, item)} />,
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
