import {VariantItem} from '@app/components/molecules';
import React from 'react';
import {FlatList} from 'react-native';

type Props = {
  data: any[];
  onDelete: (index: number, data: any) => void;
};

export const VariantList: React.FC<Props> = ({data, onDelete}) => {
  const handleDelete = (index: number, item: any) => {
    onDelete(index, item);
  };

  const renderItem: any = ({item, index}: any) => {
    return <VariantItem item={item} onDelete={() => handleDelete(index, item)} />;
  };
  return (
    <FlatList
      contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 16}}
      data={data}
      renderItem={renderItem}
    />
  );
};
