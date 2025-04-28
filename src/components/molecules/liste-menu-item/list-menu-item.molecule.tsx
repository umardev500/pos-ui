import {Icon} from '@app/components/atoms';
import {colors} from '@app/styles';
import {MenuItem} from '@app/types';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

type Props = {
  menu: MenuItem;
  onPress?: () => void;
};

export const ListMenuItem: React.FC<Props> = ({menu, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View className="flex-row items-center justify-between py-2 px-4">
        <Text className="text-base font-medium text-gray-800">{menu.label}</Text>
        <Icon name="chevron_right" size={24} color={colors.gray[600]} />
      </View>
    </TouchableOpacity>
  );
};
