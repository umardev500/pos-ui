import {CheckoutSummary} from '@app/components/molecules';
import {MainHeader, QuantityBoottomSheet, QuantityBottomSheetRef, TabView} from '@app/components/organisms';
import {CatalogTemplate} from '@app/components/templates';
import {useCategories} from '@app/hooks';
import {ProductDto, RenderScene} from '@app/types';
import {useNavigation} from '@react-navigation/native';
import React, {useRef} from 'react';
import {View} from 'react-native';
import {SystemBars} from 'react-native-edge-to-edge';
import {Route, SceneMap} from 'react-native-tab-view';

type Routes = Route[];

export const HomeScreen = () => {
  const navigation = useNavigation();
  const {data: categories} = useCategories();

  // Refs for handling bottom sheet interactions
  const bottomSheetRef = useRef<QuantityBottomSheetRef>(null);

  // ————————————————————————————————————————————————
  // 📦 Handler Functions
  // ————————————————————————————————————————————————

  // Handle adding a product to the cart
  const handleAddCart = (selectedProduct: ProductDto) => {
    bottomSheetRef.current?.open(selectedProduct, 0);
  };

  // Handle when quantity is confirmed
  const handleOnQuantityConfirmed = (qty: number, product: ProductDto) => {
    // TODO: Add product to cart after confirmation
    console.log(qty, product);
  };

  // Navigate to the Cart screen
  const handlePressCheckout = () => {
    navigation.navigate('Cart');
  };

  // ————————————————————————————————————————————————
  // 📦 Dynamic Routes Based on Categories
  // ————————————————————————————————————————————————

  // Dynamically create tab routes based on the categories
  const routes: Routes = categories
    ? [
        {key: 'all', title: 'All'},
        ...categories.map(category => ({
          key: category.id.toString(), // Ensure the key is a string
          title: category.name,
        })),
      ]
    : [];

  // ————————————————————————————————————————————————
  // 📦 Render Scene for Each Tab
  // ————————————————————————————————————————————————

  // Dynamically render each scene for each category
  const renderScene: RenderScene = SceneMap(
    categories
      ? {
          all: () => <CatalogTemplate onAddToCart={handleAddCart} />, // Placeholder for 'All' products
          ...categories.reduce((acc: {[key: string]: () => React.JSX.Element}, category) => {
            // Add scene for each category
            acc[category.id] = () => <CatalogTemplate categoryId={category.id} onAddToCart={handleAddCart} />;
            return acc;
          }, {}),
        }
      : {},
  );

  // ————————————————————————————————————————————————
  // 📦 Component Render
  // ————————————————————————————————————————————————

  return (
    <>
      <SystemBars style={'dark'} />
      <MainHeader />

      <View className="bg-gray-100 flex-1">
        {/* TabView Component for Switching Categories */}
        {categories && routes.length > 0 && <TabView routes={routes} renderScene={renderScene} />}

        {/* Checkout Summary Section */}
        <CheckoutSummary onPress={handlePressCheckout} />

        {/* Bottom sheet for quantity input */}
        <QuantityBoottomSheet onConfirm={handleOnQuantityConfirmed} ref={bottomSheetRef} />
      </View>
    </>
  );
};
