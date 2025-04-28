import {Icon} from '@app/components/atoms';
import {colors} from '@app/styles';
import {MenuItem} from '@app/types';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

type Props<T extends Record<string, any>> = {
  menu: MenuItem<T>;
  onPress?: () => void;
};

export const ListMenuItem = <T extends Record<string, any>>({menu, onPress}: Props<T>) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View className="flex-row items-center justify-between py-4 px-4">
          <Text className="text-base font-medium text-gray-800">{menu.label}</Text>
          <Icon name="chevron_right" size={24} color={colors.gray[500]} />
        </View>
      </TouchableOpacity>
      <View className="h-[1px] bg-gray-200 mx-4" />
    </View>
  );
};
