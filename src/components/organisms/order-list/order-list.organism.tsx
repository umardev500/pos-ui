import {OrderItem} from '@app/components/molecules';
import {CartItem} from '@app/types';
import React from 'react';
import {FlatList, View} from 'react-native';

type Props = {
  onIncrement?: (num: number, item?: CartItem) => void;
  onDecrement?: (num: number, item?: CartItem) => void;
};

export const OrderList: React.FC<Props> = ({onIncrement, onDecrement}) => {
  const renderItem = () => {
    return <OrderItem onDecrement={onDecrement} onIncrement={onIncrement} />;
  };

  return (
    <FlatList
      contentContainerStyle={{paddingBottom: 50, paddingTop: 16}}
      ItemSeparatorComponent={() => <View className="h-4" />}
      data={[1, 2, 3, 4, 5]}
      renderItem={renderItem}
    />
  );
};
