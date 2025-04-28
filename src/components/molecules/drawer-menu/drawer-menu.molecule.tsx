import {Icon, IconName} from '@app/components/atoms';
import {colors} from '@app/styles';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

export type DrawerMenuProps = {
  label: string;
  icon: IconName;
  onPress?: () => void;
};

export const DrawerMenu: React.FC<DrawerMenuProps> = ({label, icon, onPress}) => {
  return (
    <TouchableOpacity className="py-4" onPress={onPress}>
      <View className="flex-row items-center gap-4">
        <Icon name={icon} size={24} color={colors.gray[800]} />
        <Text className="text-base font-medium text-gray-800">{label}</Text>
      </View>
    </TouchableOpacity>
  );
};
