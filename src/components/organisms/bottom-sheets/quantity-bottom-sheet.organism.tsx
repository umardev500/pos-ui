import {QuantityButton, QuantityButtonRef} from '@app/components/atoms';
import {Product} from '@app/types';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import React, {useImperativeHandle, useRef, useState} from 'react';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export type QuantityBottomSheetRef = {
  open: (product: Product, defaultQty?: number) => void;
};

type Props = {
  ref?: React.RefObject<QuantityBottomSheetRef | null>;
  onConfirm?: (qty: number, product: Product) => void;
};

export const QuantityBoottomSheet: React.FC<Props> = ({ref, onConfirm}) => {
  const qtyBtnRef = useRef<QuantityButtonRef>(null);
  const sheet = useRef<TrueSheet>(null);
  const {bottom} = useSafeAreaInsets();
  const [product, setProduct] = useState<Product>();
  let currentQty = 0;

  useImperativeHandle(ref, () => ({
    open: (selectedProduct: Product, defaultQty: number = 0) => {
      setProduct(selectedProduct);
      sheet.current?.present();

      //   Set default quantity if provided
      qtyBtnRef.current?.setValue(defaultQty);
    },
  }));

  // Close will confirm the quantity changes
  const handleDismiss = () => {
    if (!product) return;

    onConfirm?.(currentQty, product);

    // Reset quantity
    qtyBtnRef.current?.reset();
  };

  const onQuantityChange = (qty: number) => {
    currentQty = qty;
  };

  return (
    <>
      <TrueSheet
        onDismiss={handleDismiss}
        grabber={false}
        edgeToEdge
        maxHeight={120}
        ref={sheet}
        sizes={['auto', 'large']}
        cornerRadius={0}>
        <View className="bg-white px-4 pt-6" style={{paddingBottom: bottom + 16}}>
          <View className="w-full flex-row items-center gap-4 justify-between">
            <Text className="text-lg text-gray-800">Quantity</Text>

            <QuantityButton ref={qtyBtnRef} onChange={onQuantityChange} />
          </View>
        </View>
      </TrueSheet>
    </>
  );
};
