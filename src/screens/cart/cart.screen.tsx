import {cartAnim} from '@app/assets/anim';
import {OrderConfigSheet, OrderList, OrderListHeader, OrderSummary, OrderSummarySheet} from '@app/components/organisms';
import {useCreateOrder} from '@app/hooks';
import {useCartStore} from '@app/stores';
import {CartItem, MainStackRouteNames} from '@app/types';
import {mapCartToCreateOrderDTO} from '@app/utils';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import {useIsFocused, useNavigation, useNavigationState} from '@react-navigation/native';
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
  const needReshownConfigSheetRef = useRef(false);

  // ————————————————————————————————————————————————
  // 📦 Hooks
  // ————————————————————————————————————————————————
  const isFocused = useIsFocused();
  const cartItems = useCartStore(state => state.items);
  const {bottom} = useSafeAreaInsets();
  const navstate = useNavigationState(state => state);
  const activeRouteName = navstate.routes[navstate.index].name as MainStackRouteNames;
  const {mutate: createOrder} = useCreateOrder();

  const haveItems = cartItems.length > 0;

  // ————————————————————————————————————————————————
  // 🧭 Navigation
  // ————————————————————————————————————————————————
  const navigation = useNavigation();

  // ————————————————————————————————————————————————
  // 📡 Effects
  // ————————————————————————————————————————————————
  /**
   * Trigger the bottom sheet to be shown when returning to 'AddDP' ...etc, screen.
   * This is controlled by the `needReshownConfigSheetRef` flag, which is set
   * when the 'AddDP', 'VoucherList', ...etc screen becomes active.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      if (isFocused && needReshownConfigSheetRef.current) {
        orderConfigRef.current?.present();

        needReshownConfigSheetRef.current = false;
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [isFocused]);

  /**
   * Set the flag to show the bottom sheet when navigating to 'AddDP' screen.
   */
  useEffect(() => {
    switch (activeRouteName) {
      case 'AddDP': {
        needReshownConfigSheetRef.current = true;
        break;
      }
      case 'VoucherList': {
        needReshownConfigSheetRef.current = true;
        break;
      }
    }
  }, [activeRouteName]);

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
    orderConfigRef.current?.present();
  };

  const handlePressItem = (id: number, cartItem?: CartItem) => {
    navigation.navigate('ProductView', {id, cartItem});
  };

  const handleConfigSeetDismiss = () => {
    // configHasbeenShownBefore.current = false;
  };

  const handlePressSaveOrder = () => {
    const items = useCartStore.getState().items;
    const additionalInfo = useCartStore.getState().additionalInfo;
    const orderData = mapCartToCreateOrderDTO(items, additionalInfo);

    createOrder(orderData);
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

      <OrderConfigSheet ref={orderConfigRef} onDismiss={handleConfigSeetDismiss} />
      <OrderSummary
        haveItems={haveItems}
        onPressOrderConfig={handlePressConfig}
        onPressMoreSummary={handlePressMoreOnSummary}
        onPressPayment={handlePressSaveOrder}
      />
      <OrderSummarySheet ref={orderSummaryRef} />
    </View>
  );
};
