import {VariantItem} from '@app/components/molecules';
import React from 'react';
import {FlatList} from 'react-native';

type Props = {
  data: any[];
};

export const VariantList: React.FC<Props> = ({data}) => {
  const renderItem: any = ({item}: any) => {
    return <VariantItem item={item} />;
  };
  return (
    <FlatList
      contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 16}}
      data={data}
      renderItem={renderItem}
    />
  );
};
