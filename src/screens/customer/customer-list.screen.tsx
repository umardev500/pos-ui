import {CustomerList} from '@app/components/organisms';
import {useCustomers} from '@app/hooks';
import React from 'react';
import {View} from 'react-native';

type Props = {};

export const CustomerListScreen: React.FC<Props> = ({}) => {
  const {data: customers = []} = useCustomers();

  return (
    <>
      <View className="flex-1 bg-white">
        <CustomerList data={customers} />
      </View>
    </>
  );
};
