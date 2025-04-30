import React from 'react';
import {View} from 'react-native';
import {Route, SceneMap} from 'react-native-tab-view';

import {TabView, VariantList} from '@app/components/organisms';
import {useAddProductStore} from '@app/stores';
import {RenderScene} from '@app/types';

/**
 * Variant type with dynamic custom keys (e.g., size, color, crust)
 */
type Variant = {
  unit: string;
  stock: number;
  price: number;
  [key: string]: any;
};

/**
 * Utility: Groups variant data by unit name
 */
const groupByUnit = (variants: Variant[]) =>
  variants.reduce<Record<string, Variant[]>>((acc, curr) => {
    const {unit} = curr;
    if (!acc[unit]) acc[unit] = [];
    acc[unit].push(curr);
    return acc;
  }, {});

export const AddProductVariantListScreen: React.FC = () => {
  const {product, updateProduct} = useAddProductStore();
  const units = product?.units ?? [];
  const variants = product?.variants ?? [];
  const groupedVariants = groupByUnit(variants as Variant[]);

  /**
   * Handle deletion of a variant from a specific unit
   */
  const handleDelete = (unit: string, index: number, item: Variant) => {
    if (!product) return;

    const updated = variants.filter(v => JSON.stringify(v) !== JSON.stringify(item));
    updateProduct({variants: updated});
  };

  /**
   * Map units to tab routes
   */
  const routes: Route[] = units.map(unit => ({
    key: unit.name,
    title: unit.name,
  }));

  /**
   * Render a tab scene per unit
   */
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
