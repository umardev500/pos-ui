import {CheckoutSummary} from '@app/components/molecules';
import {ListProducts, MainHeader, TabView} from '@app/components/organisms';
import {dessertProducts, drinkProducts, foodProducts, snackProducts} from '@app/mocks';
import {RenderScene} from '@app/types';
import {View} from 'react-native';
import {SystemBars} from 'react-native-edge-to-edge';
import {Route, SceneMap} from 'react-native-tab-view';

export const HomeScreen = () => {
  const routes: Route[] = [
    {
      key: 'all',
      title: 'All',
    },
    {
      key: 'food',
      title: 'Food',
    },
    {
      key: 'drink',
      title: 'Drink',
    },
    {
      key: 'snack',
      title: 'Snack',
    },
    {
      key: 'dessert',
      title: 'Dessert',
    },
  ];

  const renderScene: RenderScene = SceneMap({
    all: () => <ListProducts products={[...foodProducts, ...drinkProducts, ...snackProducts]} />,
    food: () => <ListProducts products={foodProducts} />,
    drink: () => <ListProducts products={drinkProducts} />,
    snack: () => <ListProducts products={snackProducts} />,
    dessert: () => <ListProducts products={dessertProducts} />,
  });

  return (
    <>
      <SystemBars style={'dark'} />
      <MainHeader />
      <View className="bg-gray-100 flex-1">
        <TabView routes={routes} renderScene={renderScene} />
        {/* <ListProducts products={products} /> */}
        <CheckoutSummary />
      </View>
    </>
  );
};
