import {Icon, Input} from '@app/components/atoms';
import {OrderConfigSheet, OrderList, OrderSummary, OrderSummarySheet} from '@app/components/organisms';
import {useCartStore} from '@app/stores';
import {colors} from '@app/styles';
import {CartItem} from '@app/types';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import React, {useEffect, useRef} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
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

  const renderHeader = () => {
    return (
      <>
        <View className="px-4 flex-row items-center gap-3">
          <View className="flex-1">
            <Input leadingIcon="person_plus_fill" size="sm" placeholder="Nama pelanggan..." />
          </View>

          <TouchableOpacity className="bg-gray-100 rounded-xl w-10 h-10 items-center justify-center">
            <Icon name="add" size={20} color={colors.gray[600]} />
          </TouchableOpacity>
        </View>

        <View className="px-4 pb-3 mt-5">
          <Text className="text-base font-medium text-gray-800">Order List</Text>
        </View>
      </>
    );
  };

  return (
    <View className="flex-1 bg-white" style={{paddingBottom: bottom}}>
      <OrderList
        data={cartItems}
        onDecrement={handleDecrement}
        onIncrement={handleIncrement}
        onDelete={handleDelete}
        onPress={handlePressItem}
        header={renderHeader}
      />

      <OrderConfigSheet ref={orderConfigRef} />
      <OrderSummary onPressOrderConfig={handlePressConfig} onPressMoreSummary={handlePressMoreOnSummary} />
      <OrderSummarySheet ref={orderSummaryRef} />
    </View>
  );
};
