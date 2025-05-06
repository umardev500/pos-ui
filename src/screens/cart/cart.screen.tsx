import {OrderList, OrderSummary, OrderSummarySheet} from '@app/components/organisms';
import {CartItem} from '@app/types';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import React, {useRef} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export const CartScreen: React.FC = () => {
  const orderSummaryRef = useRef<TrueSheet>(null);

  const {bottom} = useSafeAreaInsets();

  const handleIncrement = (num: number, item?: CartItem) => {
    console.log('increment', num);
  };

  const handleDecrement = (num: number, item?: CartItem) => {
    console.log('decrement', num);
  };

  // ————————————————————————————————————————————————
  // 🛠 Handlers
  // ————————————————————————————————————————————————
  const handlePressMoreOnSummary = () => orderSummaryRef.current?.present();

  return (
    <View className="flex-1 bg-white" style={{paddingBottom: bottom}}>
      <OrderList onDecrement={handleDecrement} onIncrement={handleIncrement} />

      <OrderSummary onPressMoreSummary={handlePressMoreOnSummary} />
      <OrderSummarySheet ref={orderSummaryRef} />
    </View>
  );
};
