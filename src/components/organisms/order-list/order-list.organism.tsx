import {OrderItem} from '@app/components/molecules';
import {CartItem} from '@app/types';
import React from 'react';
import {FlatList, ListRenderItem, View} from 'react-native';

type Props = {
  data: CartItem[];
  onIncrement?: (num: number, item?: CartItem) => void;
  onDecrement?: (num: number, item?: CartItem) => void;
  onDelete?: (item?: CartItem) => void;
  onPress?: (id: number, cartItem?: CartItem) => void;
  header?: React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | React.ComponentType<any> | null;
};

export const OrderList: React.FC<Props> = ({data, onIncrement, onDecrement, onDelete, onPress, header}) => {
  const renderItem: ListRenderItem<CartItem> = ({item}) => {
    return (
      <OrderItem
        item={item}
        onDecrement={onDecrement}
        onIncrement={onIncrement}
        onDelete={onDelete}
        onPress={onPress}
      />
    );
  };

  return (
    <FlatList
      contentContainerStyle={{paddingBottom: 16, paddingTop: 8}}
      ItemSeparatorComponent={() => <View className="h-4" />}
      data={data}
      renderItem={renderItem}
      ListHeaderComponent={header}
    />
  );
};
