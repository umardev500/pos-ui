import {CustomerList} from '@app/components/organisms';
import {useCustomers} from '@app/hooks';
import {MainStackParamList} from '@app/types';
import {StackScreenProps} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {View} from 'react-native';

type Props = StackScreenProps<MainStackParamList, 'CustomerList'>;

export const CustomerListScreen: React.FC<Props> = ({navigation, route}) => {
  const {data: customers = []} = useCustomers();
  const {params} = route;

  useEffect(() => {
    if (params?.triggerAdd) {
      navigation.navigate('AddCustomer');
      navigation.setParams({triggerAdd: false});
    }
  }, [params?.triggerAdd]);

  return (
    <>
      <View className="flex-1 bg-white">
        <CustomerList data={customers} />
      </View>
    </>
  );
};
