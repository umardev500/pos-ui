import {Button, Icon} from '@app/components/atoms';
import {useCartStore} from '@app/stores';
import {colors} from '@app/styles';
import {numberUtils} from '@app/utils';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

type Props = {
  onPressMoreSummary?: () => void;
  onPressOrderConfig?: () => void;
};

export const OrderSummary: React.FC<Props> = ({onPressMoreSummary, onPressOrderConfig}) => {
  const finalAmount = useCartStore.getState().getFinalAmount();
  const finalAmountCurrency = numberUtils.formatCurrency(finalAmount);

  return (
    <View className="px-4 py-4 border-t border-gray-100">
      <View className="flex-row items-center justify-between">
        <TouchableOpacity activeOpacity={0.7} onPress={onPressMoreSummary} className="flex-row items-center gap-1">
          <Text className="text-base font-medium text-gray-600">Total:</Text>
          <Text className="text-base font-medium text-orange-500">{finalAmountCurrency}</Text>
          <Icon name="chevron_up" size={18} color={colors.gray[400]} />
        </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.7} onPress={onPressOrderConfig}>
          <Icon name="more_horiz" size={18} color={colors.gray[500]} />
        </TouchableOpacity>
      </View>

      <View className="pt-4">
        <Button title="Payment" containerColor={colors.orange[500]} textColor={colors.white} />
      </View>
    </View>
  );
};
