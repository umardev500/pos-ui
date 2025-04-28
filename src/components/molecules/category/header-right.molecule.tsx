import {Icon} from '@app/components/atoms';
import {colors} from '@app/styles';
import React from 'react';
import {TouchableOpacity, View} from 'react-native';

type Props = {};

export const CategoryDetailHeaderRight: React.FC<Props> = ({}) => {
  // TODO: check the category data form from the store

  return (
    <View className="flex-row items-center gap-2 pr-4">
      <TouchableOpacity onPress={() => {}} disabled>
        <Icon name="check" size={24} color={colors.gray[400]} />
      </TouchableOpacity>
    </View>
  );
};
