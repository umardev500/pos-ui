import {OrderItem} from '@app/components/molecules';
import {CartItem} from '@app/types';
import React from 'react';
import {FlatList, ListRenderItem, View} from 'react-native';

type Props = {
  data: CartItem[];
  onIncrement?: (num: number, item?: CartItem) => void;
  onDecrement?: (num: number, item?: CartItem) => void;
};

export const OrderList: React.FC<Props> = ({data, onIncrement, onDecrement}) => {
  const renderItem: ListRenderItem<CartItem> = ({item}) => {
    return <OrderItem item={item} onDecrement={onDecrement} onIncrement={onIncrement} />;
  };

  return (
    <FlatList
      contentContainerStyle={{paddingBottom: 16, paddingTop: 16}}
      ItemSeparatorComponent={() => <View className="h-4" />}
      data={data}
      renderItem={renderItem}
    />
  );
};
