import {Icon} from '@app/components/atoms';
import {colors} from '@app/styles';
import {CustomerDTO} from '@app/types';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

type Props = {
  item: CustomerDTO;
  onPress?: (customer: CustomerDTO) => void;
};

export const CustomerListing: React.FC<Props> = props => {
  const {item, onPress} = props;
  const {name, email, phone} = item;

  const handlePress = () => {
    onPress?.(item);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      className="px-4 py-3 border border-dashed border-gray-400 rounded-xl">
      <View className="flex-row items-end justify-between">
        <View className="gap-1">
          <Text className="text-base font-medium text-gray-800">{name}</Text>
          <View>
            <View className="flex-row items-center gap-1.5">
              <Icon name="call" size={14} color={colors.gray[600]} />
              <Text className="text-sm text-gray-500">{phone}</Text>
            </View>
            <View className="flex-row items-center gap-1.5">
              <Icon name="alternate_email" size={14} color={colors.gray[600]} />
              <Text className="text-sm text-gray-500">{email}</Text>
            </View>
          </View>
        </View>

        <View className="flex-row items-center gap-3">
          <TouchableOpacity activeOpacity={0.7}>
            <Icon name="stylus_note_fill" size={18} color={colors.gray[400]} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7}>
            <Icon name="delete" size={18} color={colors.gray[400]} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};
