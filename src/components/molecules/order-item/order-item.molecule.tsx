import {product3} from '@app/assets/images';
import {IconButton} from '@app/components/atoms';
import {QuantityControl} from '@app/components/molecules';
import {colors} from '@app/styles';
import {CartItem} from '@app/types';
import {generateVariantPlaceholder, numberUtils} from '@app/utils';
import React from 'react';
import {Alert, Image, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  item?: CartItem;
  onIncrement?: (num: number, item?: CartItem) => void;
  onDecrement?: (num: number, item?: CartItem) => void;
  onDelete?: (item?: CartItem) => void;
  onPress?: (id: number, cartItem?: CartItem) => void;
};

export const OrderItem: React.FC<Props> = ({item, onIncrement, onDecrement, onDelete, onPress}) => {
  if (!item) return null; // Early return if there's no item

  const {product, quantity, unit: productUnit, selectecVariantOptions, price} = item;

  // Generate the variant placeholder text
  const variantPlaceholder = `Unit: ${productUnit?.unit.name}, ${selectecVariantOptions ? generateVariantPlaceholder(selectecVariantOptions) : ''}`;

  // Handlers
  const handleIncrement = (num: number) => onIncrement?.(num, item);
  const handleDecrement = (num: number) => onDecrement?.(num, item);
  const handleDelete = () => {
    Alert.alert('Delete item', 'Are you sure you want to delete this?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'Delete', onPress: () => onDelete?.(item), style: 'destructive'},
    ]);
  };
  const handlePress = () => onPress?.(product?.id || 0, item);

  return (
    <View className="px-4">
      <View className="border bg-white border-gray-300 border-dashed rounded-xl px-1.5 py-1.5 overflow-hidden">
        <View className="flex-row gap-2.5">
          <TouchableOpacity activeOpacity={0.7} onPress={handlePress}>
            <Image source={product3} className="w-20 h-20 rounded-lg" />
          </TouchableOpacity>

          <View className="flex-1 justify-between">
            <View>
              <View className="flex-row items-center justify-between">
                <Text className="text-base font-medium text-gray-800 leading-6">{product?.name}</Text>
                <Text className="text-xs text-gray-400 mr-2.5">{item?.order_type?.label}</Text>
              </View>
              <Text className="text-xs text-gray-400" numberOfLines={1} ellipsizeMode="tail">
                {variantPlaceholder}
              </Text>
            </View>

            <View className="flex-row justify-between items-center">
              <Text className="text-base font-medium text-orange-500">Rp {numberUtils.toDecimal(price || 0)}</Text>

              <View className="flex-row items-center gap-2">
                <QuantityControl value={quantity} onIncrement={handleIncrement} onDecrement={handleDecrement} />
                <IconButton onPress={handleDelete} icon="delete" size="xs" color={colors.gray[400]} />
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
