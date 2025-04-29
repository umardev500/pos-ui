import {TabView, VariantList} from '@app/components/organisms';
import {RenderScene} from '@app/types';
import React from 'react';
import {View} from 'react-native';
import {Route, SceneMap} from 'react-native-tab-view';

const variants = [
  {size: 'M', crust: 'Thin', color: 'White', price: 11.99, stock: 80},
  {size: 'L', crust: 'Thick', color: 'Black', price: 15.99, stock: 50},
  {size: 'XL', crust: 'Large', color: 'Rainbow', price: 25.99, stock: 24},
];

const variants2 = [
  {size: 'M', crust: 'Thin', color: 'White', price: 13.99, stock: 50},
  {size: 'L', crust: 'Thick', color: 'Black', price: 22.99, stock: 10},
  {size: 'XL', crust: 'Large', color: 'Rainbow', price: 31.99, stock: 12},
];

const variants3 = [
  {size: 'M', crust: 'Thin', color: 'White', price: 3.99, stock: 800},
  {size: 'L', crust: 'Thick', color: 'Black', price: 2.99, stock: 250},
  {size: 'XL', crust: 'Large', color: 'Rainbow', price: 1.99, stock: 124},
];

type Props = {};

export const AddProductVariantListScreen: React.FC<Props> = ({}) => {
  const routes: Route[] = [
    {
      key: 'kiloan',
      title: 'Kiloan',
    },
    {
      key: 'satuan',
      title: 'Satuan',
    },
    {
      key: 'pack',
      title: 'Pack',
    },
  ];

  const renderScene: RenderScene = SceneMap({
    kiloan: () => <VariantList data={variants} />,
    satuan: () => <VariantList data={variants2} />,
    pack: () => <VariantList data={variants3} />,
  });

  return (
    <View className="flex-1 bg-white py-4">
      <TabView routes={routes} renderScene={renderScene} />
    </View>
  );
};
