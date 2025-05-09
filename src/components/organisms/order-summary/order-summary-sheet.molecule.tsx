import {useCartStore} from '@app/stores';
import {numberUtils} from '@app/utils';
import {TrueSheet} from '@lodev09/react-native-true-sheet';
import React from 'react';
import {Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type Props = {
  ref?: React.RefObject<TrueSheet | null>;
  onDismiss?: () => void;
};

export const OrderSummarySheet: React.FC<Props> = ({ref, onDismiss}) => {
  const {bottom} = useSafeAreaInsets();
  const totalPrice = useCartStore(state => state.getTotalPrice());
  const totalDiscount = useCartStore.getState().getTotalDiscount();
  const totalOrderDiscount = useCartStore(state => state.getTotalOrderDiscount());
  const finalAmount = useCartStore(state => state.getFinalAmount());

  const formatCurrency = (amount: number) => `Rp${numberUtils.toDecimal(amount)}`;

  return (
    <TrueSheet onDismiss={onDismiss} edgeToEdge ref={ref} sizes={['auto', 'large']}>
      <View className="pt-6 px-4" style={{paddingBottom: bottom + 16}}>
        {/* Total Before Discount */}
        <Row label="Total" value={formatCurrency(totalPrice)} />

        {/* Voucher Discount Placeholder */}
        <Row label="Voucher Diskon" value={`-${formatCurrency(totalOrderDiscount)}`} bordered />

        {/* Product Discount */}
        <Row label="Diskon Produk" value={`-${formatCurrency(totalDiscount)}`} bordered />

        {/* Final Amount */}
        <Row label="Jumlah Total" value={formatCurrency(finalAmount)} bold bordered />
      </View>
    </TrueSheet>
  );
};

// ————————————————————————————————————————————————
// 🔧 Reusable Row Component
// ————————————————————————————————————————————————
const Row = ({
  label,
  value,
  bordered = false,
  bold = false,
}: {
  label: string;
  value: string;
  bordered?: boolean;
  bold?: boolean;
}) => (
  <View
    className={`flex-row items-center justify-between py-4 ${bordered ? 'border-t-[0.5px] border-t-gray-200' : ''}`}>
    <Text className="text-sm text-gray-800">{label}</Text>
    <Text className={`text-sm text-gray-700 ${bold ? 'font-bold' : 'font-medium'}`}>{value}</Text>
  </View>
);
