import {OrderConfigSheet, OrderList, OrderSummary, OrderSummarySheet} from '@app/components/organisms';
import {useCartStore} from '@app/stores';
import {CartItem} from '@app/types';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import React, {useRef} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const CartScreen: React.FC = () => {
  const orderSummaryRef = useRef<TrueSheet>(null);
  const orderConfigRef = useRef<TrueSheet>(null);

  const {bottom} = useSafeAreaInsets();

  // ————————————————————————————————————————————————
  // 📦 Hooks
  // ————————————————————————————————————————————————
  const cartItems = useCartStore(state => state.items);

  // ————————————————————————————————————————————————
  // 🛠 Handlers
  // ————————————————————————————————————————————————
  const handleIncrement = (num: number, item?: CartItem) => {
    console.log('increment', num);
  };

  const handleDecrement = (num: number, item?: CartItem) => {
    console.log('decrement', num);
  };

  const handlePressMoreOnSummary = () => orderSummaryRef.current?.present();
  const handlePressConfig = () => orderConfigRef.current?.present();

  return (
    <View className="flex-1 bg-white" style={{paddingBottom: bottom}}>
      <OrderList data={cartItems} onDecrement={handleDecrement} onIncrement={handleIncrement} />

      <OrderConfigSheet ref={orderConfigRef} />
      <OrderSummary onPressOrderConfig={handlePressConfig} onPressMoreSummary={handlePressMoreOnSummary} />
      <OrderSummarySheet ref={orderSummaryRef} />
    </View>
  );
};
