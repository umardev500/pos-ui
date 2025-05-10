import {Icon} from '@app/components/atoms';
import {colors} from '@app/styles';
import {CustomerDTO} from '@app/types';
import {numberUtils} from '@app/utils';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

type Props = {
  item: CustomerDTO;
  onPress?: (customer: CustomerDTO) => void;
  onPressDelete?: (customer: CustomerDTO) => void;
  onPressEdit?: (customer: CustomerDTO) => void;
};

export const CustomerListing: React.FC<Props> = props => {
  const {item, onPress, onPressDelete, onPressEdit} = props;
  const {name, email, phone, points} = item;

  const handlePress = () => {
    onPress?.(item);
  };

  const handlePressEdit = () => {
    onPressEdit?.(item);
  };

  const handlePressDelete = () => {
    onPressDelete?.(item);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      className="px-4 pb-3 pt-2 border border-dashed border-gray-400 rounded-xl">
      <View className="flex-row items-end justify-between">
        <View className="gap-1 flex-1">
          <View className="flex-row items-center gap-2 justify-between">
            <Text className="text-base font-medium text-gray-800">{name}</Text>
            <Text className="text-xs text-gray-400">Points: {numberUtils.toDecimal(points)}</Text>
          </View>
          <View>
            <View className="flex-row items-center gap-1.5">
              <Icon name="call" size={14} color={colors.gray[600]} />
              <Text className="text-sm text-gray-500">{phone || '-'}</Text>
            </View>
            <View className="flex-row items-center gap-1.5 justify-between">
              <View className="flex-row items-center gap-1.5 flex-1">
                <Icon name="alternate_email" size={14} color={colors.gray[600]} />
                <Text className="text-sm text-gray-500" numberOfLines={1} ellipsizeMode="tail">
                  {email}
                </Text>
              </View>

              <View className="flex-row items-center gap-3">
                <TouchableOpacity onPress={handlePressEdit} activeOpacity={0.7}>
                  <Icon name="stylus_note_fill" size={18} color={colors.gray[400]} />
                </TouchableOpacity>
                <TouchableOpacity onPress={handlePressDelete} activeOpacity={0.7}>
                  <Icon name="delete" size={18} color={colors.gray[400]} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
