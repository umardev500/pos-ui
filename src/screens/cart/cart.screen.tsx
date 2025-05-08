import {OrderConfigSheet, OrderList, OrderSummary, OrderSummarySheet} from '@app/components/organisms';
import {useCartStore} from '@app/stores';
import {CartItem} from '@app/types';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {View} from 'react-native';
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

  return (
    <View className="flex-1 bg-white" style={{paddingBottom: bottom}}>
      <OrderList
        data={cartItems}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
        onDelete={handleDelete}
        onPress={handlePressItem}
      />

      <OrderConfigSheet ref={orderConfigRef} />
      <OrderSummary onPressOrderConfig={handlePressConfig} onPressMoreSummary={handlePressMoreOnSummary} />
      <OrderSummarySheet ref={orderSummaryRef} />
    </View>
  );
};
