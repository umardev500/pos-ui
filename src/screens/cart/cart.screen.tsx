import {cartAnim} from '@app/assets/anim';
import {OrderConfigSheet, OrderList, OrderListHeader, OrderSummary, OrderSummarySheet} from '@app/components/organisms';
import {useCartStore} from '@app/stores';
import {CartItem} from '@app/types';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import clsx from 'clsx';
import LottieView from 'lottie-react-native';
import React, {useEffect, useMemo, useRef} from 'react';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const CartScreen: React.FC = () => {
  // ————————————————————————————————————————————————
  // 🧩 Refs
  // ————————————————————————————————————————————————
  const orderSummaryRef = useRef<TrueSheet>(null);
  const orderConfigRef = useRef<TrueSheet>(null);
  const configHasbeenShownBefore = useRef(false);

  // ————————————————————————————————————————————————
  // 📦 Hooks
  // ————————————————————————————————————————————————
  const isFocused = useIsFocused();
  const cartItems = useCartStore(state => state.items);
  const {bottom} = useSafeAreaInsets();

  const haveItems = cartItems.length > 0;

  // ————————————————————————————————————————————————
  // 🧭 Navigation
  // ————————————————————————————————————————————————
  const navigation = useNavigation();

  // ————————————————————————————————————————————————
  // 📡 Effects
  // ————————————————————————————————————————————————
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isFocused && configHasbeenShownBefore.current) {
        orderConfigRef.current?.present();
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [isFocused]);

  // ————————————————————————————————————————————————
  // 🛠 Handlers
  // ————————————————————————————————————————————————
  const handleIncrement = (num: number, item?: CartItem) => {
    if (item) useCartStore.getState().incrementQuantity(item);
  };

  const handleDecrement = (num: number, item?: CartItem) => {
    if (item) useCartStore.getState().decrementQuantity(item);
  };

  const handleDelete = (item?: CartItem) => {
    if (item) useCartStore.getState().removeItem(item);
  };

  const handlePressMoreOnSummary = () => {
    orderSummaryRef.current?.present();
  };

  const handlePressConfig = () => {
    if (!configHasbeenShownBefore.current) {
      configHasbeenShownBefore.current = true;
    }
    orderConfigRef.current?.present();
  };

  const handlePressItem = (id: number, cartItem?: CartItem) => {
    navigation.navigate('ProductView', {id, cartItem});
  };

  const renderHeader = useMemo(() => {
    return (
      <>
        <OrderListHeader />
      </>
    );
  }, []);

  return (
    <View className="flex-1 bg-white" style={{paddingBottom: bottom}}>
      <View
        className={clsx({
          'flex-1': haveItems,
        })}>
        <OrderList
          data={cartItems}
          onDecrement={handleDecrement}
          onIncrement={handleIncrement}
          onDelete={handleDelete}
          onPress={handlePressItem}
          header={renderHeader}
        />
      </View>

      {!haveItems && (
        <View className="items-center justify-center flex-1">
          <LottieView autoPlay source={cartAnim} style={{width: 150, height: 150}} />
          <Text className="text-sm text-gray-500">Keranjang belanja kosong...</Text>
        </View>
      )}

      <OrderConfigSheet ref={orderConfigRef} />
      <OrderSummary
        haveItems={haveItems}
        onPressOrderConfig={handlePressConfig}
        onPressMoreSummary={handlePressMoreOnSummary}
      />
      <OrderSummarySheet ref={orderSummaryRef} />
    </View>
  );
};
