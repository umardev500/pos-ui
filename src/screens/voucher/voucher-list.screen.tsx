import {SelectableListTemplate} from '@app/components/templates';
import {useDiscounts} from '@app/hooks';
import {useCartStore} from '@app/stores';
import {DiscountDTO, DiscountScope} from '@app/types';
import React from 'react';
import {View} from 'react-native';

export const VoucherListScreen: React.FC = () => {
  const {data: discounts} = useDiscounts({
    scope: DiscountScope.ORDER,
  });
  const discount = useCartStore(state => state.additional_info?.discount);
  const setAdditionalInfo = useCartStore(state => state.setAdditionalInfo);

  const handleSelect = (selected: DiscountDTO[]) => {
    setAdditionalInfo({discount: selected[0]});
  };

  return (
    <View className="p-4 flex-1 bg-white">
      <SelectableListTemplate
        title="Pilih Voucher Diskon"
        items={discounts}
        selected={discount ? [discount] : []}
        onSelect={handleSelect}
      />
    </View>
  );
};
