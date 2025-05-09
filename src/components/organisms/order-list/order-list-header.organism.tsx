import {Icon, Input} from '@app/components/atoms';
import {OrderTypeList} from '@app/components/organisms/order-type-list';
import {colors} from '@app/styles';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';

type Props = {};

export const OrderListHeader: React.FC<Props> = ({}) => {
  return (
    <>
      <OrderTypeList />

      <View className="px-4 flex-row items-center gap-3 pt-4 ">
        <View className="flex-1 py-1">
          <Input leadingIcon="person_plus_fill" size="sm" placeholder="Nama pelanggan..." />
        </View>

        <TouchableOpacity className="bg-gray-100 rounded-xl w-10 h-10 items-center justify-center">
          <Icon name="add" size={20} color={colors.gray[600]} />
        </TouchableOpacity>
      </View>

      <View className="px-4 pb-3 mt-5">
        <Text className="text-base font-medium text-gray-800">Order List</Text>
      </View>
    </>
  );
};
