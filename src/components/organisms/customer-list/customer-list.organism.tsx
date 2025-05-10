import {CustomerListing} from '@app/components/molecules';
import {CustomerDTO} from '@app/types';
import React from 'react';
import {FlatList, ListRenderItem, View} from 'react-native';

type Props = {
  data: CustomerDTO[];
  onItemPress?: (customer: CustomerDTO) => void;
  paddingBottom?: number;
  onPressDelete?: (customer: CustomerDTO) => void;
  onPressEdit?: (customer: CustomerDTO) => void;
};

export const CustomerList: React.FC<Props> = ({data, paddingBottom, onItemPress, onPressDelete, onPressEdit}) => {
  const renderItem: ListRenderItem<CustomerDTO> = ({item}) => {
    return (
      <CustomerListing item={item} onPress={onItemPress} onPressDelete={onPressDelete} onPressEdit={onPressEdit} />
    );
  };

  return (
    <FlatList
      ItemSeparatorComponent={() => <View className="h-4" />}
      contentContainerStyle={{paddingHorizontal: 16, paddingTop: 8, paddingBottom}}
      data={data}
      renderItem={renderItem}
    />
  );
};
