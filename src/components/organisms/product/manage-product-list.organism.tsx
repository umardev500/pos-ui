import {ManageProductItem} from '@app/components/molecules';
import {products} from '@app/mocks';
import {Product} from '@app/types';
import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';

type Props = {};

export const ManageProductList: React.FC<Props> = ({}) => {
  const renderItem: ListRenderItem<Product> = ({item}) => {
    return <ManageProductItem product={item} />;
  };

  return (
    <FlatList
      contentContainerStyle={{
        paddingBottom: 150,
      }}
      data={products}
      renderItem={renderItem}
    />
  );
};
