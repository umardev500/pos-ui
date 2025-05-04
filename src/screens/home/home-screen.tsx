import {CheckoutSummary} from '@app/components/molecules';
import {
  ListProducts,
  MainHeader,
  QuantityBoottomSheet,
  QuantityBottomSheetRef,
  TabView,
} from '@app/components/organisms';
import {dessertProducts, drinkProducts, foodProducts, snackProducts} from '@app/mocks';
import {Product, RenderScene} from '@app/types';
import {useNavigation} from '@react-navigation/native';
import {useRef} from 'react';
import {View} from 'react-native';
import {SystemBars} from 'react-native-edge-to-edge';
import {Route, SceneMap} from 'react-native-tab-view';

type Routes = Route[];

export const HomeScreen = () => {
  const navigation = useNavigation();

  // ————————————————————————————————————————————————
  // 🌟 Refs: Bottom Sheet for Quantity
  // ————————————————————————————————————————————————
  const bottomSheetRef = useRef<QuantityBottomSheetRef>(null);

  // ————————————————————————————————————————————————
  // 📦 Tab Routes Definition
  // ————————————————————————————————————————————————
  const routes: Routes = [
    {key: 'all', title: 'All'},
    {key: 'food', title: 'Food'},
    {key: 'drink', title: 'Drink'},
    {key: 'snack', title: 'Snack'},
    {key: 'dessert', title: 'Dessert'},
  ];

  // ————————————————————————————————————————————————
  // 🧪 Render Scene for Each Tab
  // ————————————————————————————————————————————————
  const renderScene: RenderScene = SceneMap({
    all: () => (
      <ListProducts onAddToCart={handleAddCart} products={[...foodProducts, ...drinkProducts, ...snackProducts]} />
    ),
    food: () => <ListProducts onAddToCart={handleAddCart} products={foodProducts} />,
    drink: () => <ListProducts onAddToCart={handleAddCart} products={drinkProducts} />,
    snack: () => <ListProducts onAddToCart={handleAddCart} products={snackProducts} />,
    dessert: () => <ListProducts onAddToCart={handleAddCart} products={dessertProducts} />,
  });

  // ————————————————————————————————————————————————
  // ⚙️ Handlers for Button Actions
  // ————————————————————————————————————————————————

  // Handler when add to cart button is pressed
  const handleAddCart = (selectedProduct: Product) => {
    bottomSheetRef.current?.open(selectedProduct, 0);
  };

  // Handler when quantity is confirmed
  const handleOnQuantityConfirmed = (qty: number, product: Product) => {
    // TODO: Add to cart
    console.log(qty, product);
  };

  // Navigate to Cart screen
  const handlePressCheckout = () => {
    navigation.navigate('Cart');
  };

  return (
    <>
      <SystemBars style={'dark'} />
      <MainHeader />
      <View className="bg-gray-100 flex-1">
        <TabView routes={routes} renderScene={renderScene} />
        <CheckoutSummary onPress={handlePressCheckout} />
        <QuantityBoottomSheet onConfirm={handleOnQuantityConfirmed} ref={bottomSheetRef} />
      </View>
    </>
  );
};
