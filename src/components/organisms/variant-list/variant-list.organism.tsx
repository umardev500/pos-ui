import {VariantItem} from '@app/components/molecules';
import React from 'react';
import {FlatList} from 'react-native';

type Props = {
  data: any[];
  onDelete: (index: number) => void;
};

export const VariantList: React.FC<Props> = ({data, onDelete}) => {
  const handleDelete = (index: number) => {
    onDelete(index);
  };

  const renderItem: any = ({item, index}: any) => {
    return <VariantItem item={item} onDelete={() => handleDelete(index)} />;
  };
  return (
    <FlatList
      contentContainerStyle={{paddingHorizontal: 16, paddingVertical: 16}}
      data={data}
      renderItem={renderItem}
    />
  );
};
