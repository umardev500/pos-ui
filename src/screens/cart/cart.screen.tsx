import {OrderList} from '@app/components/organisms';
import {CartItem} from '@app/types';
import React from 'react';
import {View} from 'react-native';

type Props = {};

export const CartScreen: React.FC<Props> = ({}) => {
  const handleIncrement = (num: number, item?: CartItem) => {
    console.log('increment', num);
  };

  const handleDecrement = (num: number, item?: CartItem) => {
    console.log('decrement', num);
  };

  return (
    <>
      <View className="flex-1 bg-white">
        <OrderList onDecrement={handleDecrement} onIncrement={handleIncrement} />
      </View>
    </>
  );
};
