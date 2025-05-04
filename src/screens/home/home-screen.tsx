import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {View} from 'react-native';
import {SystemBars} from 'react-native-edge-to-edge';
import {Route, SceneMap} from 'react-native-tab-view';

import {CheckoutSummary} from '@app/components/molecules';
import {MainHeader, QuantityBoottomSheet, QuantityBottomSheetRef, TabView} from '@app/components/organisms';
import {CatalogTemplate} from '@app/components/templates';

import {useCategories} from '@app/hooks';
import {useCartStore} from '@app/stores';
import {ProductDto, RenderScene} from '@app/types';

type Routes = Route[];

export const HomeScreen = () => {
  // ————————————————————————————————————————————————
  // 📦 Hooks
  // ————————————————————————————————————————————————
  const navigation = useNavigation();
  const {data: categories} = useCategories();
  const bottomSheetRef = useRef<QuantityBottomSheetRef>(null);

  const totalItems = useCartStore(state => state.items.length);
  const totalPrice = useCartStore(state => state.getTotalPrice());

  // ————————————————————————————————————————————————
  // 📦 Handlers
  // ————————————————————————————————————————————————
  const handleAddCart = (product: ProductDto) => {
    const hasMultipleUnits = product.product_units.length > 1;
    const hasVariants = product.product_variants.length > 0;

    if (hasMultipleUnits || hasVariants) {
      console.log('continue to selection screen');
      navigation.navigate('ProductView', {id: product.id});
      return;
    }

    bottomSheetRef.current?.open(product, 0);
  };

  const handleOnQuantityConfirmed = (qty: number, product: ProductDto) => {
    if (qty <= 0) return;

    useCartStore.getState().addItem({
      product,
      quantity: qty,
      unit: product.product_units[0],
    });
  };

  const handlePressCheckout = () => navigation.navigate('Cart');

  // ————————————————————————————————————————————————
  // 📦 Route and Scene Mapping
  // ————————————————————————————————————————————————
  const generateRoutes = (): Routes =>
    categories
      ? [{key: 'all', title: 'All'}].concat(
          categories.map(category => ({
            key: category.id.toString(),
            title: category.name,
          })),
        )
      : [];

  const generateScenes = (): RenderScene =>
    categories
      ? SceneMap({
          all: () => <CatalogTemplate onAddToCart={handleAddCart} />,
          ...categories.reduce(
            (acc, category) => ({
              ...acc,
              [category.id]: () => <CatalogTemplate categoryId={category.id} onAddToCart={handleAddCart} />,
            }),
            {},
          ),
        })
      : SceneMap({});

  const routes = generateRoutes();
  const renderScene = generateScenes();

  // ————————————————————————————————————————————————
  // 📦 Render
  // ————————————————————————————————————————————————
  return (
    <>
      <SystemBars style="dark" />
      <MainHeader />

      <View className="bg-gray-100 flex-1">
        {categories && routes.length > 0 && <TabView routes={routes} renderScene={renderScene} />}

        {totalItems > 0 && (
          <CheckoutSummary totalItems={totalItems} totalAmount={totalPrice} onPress={handlePressCheckout} />
        )}

        <QuantityBoottomSheet ref={bottomSheetRef} onConfirm={handleOnQuantityConfirmed} />
      </View>
    </>
  );
};
