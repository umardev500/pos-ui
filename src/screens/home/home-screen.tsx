import {CheckoutSummary} from '@app/components/molecules';
import {MainHeader, QuantityBoottomSheet, QuantityBottomSheetRef, TabView} from '@app/components/organisms';
import {CatalogTemplate} from '@app/components/templates';
import {useCategories} from '@app/hooks';
import {useCartStore} from '@app/stores';
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

  // Get the total number of items in the cart
  const totalItems = useCartStore(state => state.items.length);
  const totalPrice = useCartStore(state => state.getTotalPrice());

  // ————————————————————————————————————————————————
  // 📦 Handler Functions
  // ————————————————————————————————————————————————

  // Handle adding a product to the cart
  const handleAddCart = (product: ProductDto) => {
    // If the product has multiple units or variants, redirect to a selection screen
    const hasMultipleUnits = product.product_units.length > 1;
    const hasVariants = product.product_variants.length > 0;

    if (hasMultipleUnits || hasVariants) {
      // Navigate to selection screen (e.g., ProductDetail or VariantSelector)
      // navigation.navigate('ProductDetail', {product});
      console.log('continue to selection screen');
      return;
    }

    bottomSheetRef.current?.open(product, 0);
  };

  // Handle when quantity is confirmed
  const handleOnQuantityConfirmed = (qty: number, product: ProductDto) => {
    if (qty <= 0) {
      console.log(`Ignored adding ${product.name} with quantity 0`);
      return;
    }

    // Check if the product is already in the cart
    const existingItem = useCartStore.getState().items.find(item => item.product.id === product.id);

    if (existingItem) {
      // If the product is already in the cart, update the quantity
      useCartStore.getState().updateQuantity(product.id, product.base_unit_id, undefined, existingItem.quantity + qty);
    } else {
      // If the product is not in the cart, add it as a new item
      useCartStore.getState().addItem({
        product,
        quantity: qty,
        unit: product.product_units[0],
      });
    }

    console.log(`Product ${product.name} added with quantity ${qty}`);
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
        {totalItems > 0 && (
          <CheckoutSummary totalItems={totalItems} totalAmount={totalPrice} onPress={handlePressCheckout} />
        )}

        {/* Bottom sheet for quantity input */}
        <QuantityBoottomSheet onConfirm={handleOnQuantityConfirmed} ref={bottomSheetRef} />
      </View>
    </>
  );
};
