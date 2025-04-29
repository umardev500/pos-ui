import {Input} from '@app/components/atoms';
import {ManageProductList} from '@app/components/organisms';
import React from 'react';
import {View} from 'react-native';

type Props = {};

export const ProductsScreen: React.FC<Props> = ({}) => {
  return (
    <View className="flex-1 bg-white">
      <View className="px-4 py-4">
        <Input size="md" placeholder="Search..." trailingIcon="search" />
      </View>

      <View>
        <ManageProductList />
      </View>
    </View>
  );
};
