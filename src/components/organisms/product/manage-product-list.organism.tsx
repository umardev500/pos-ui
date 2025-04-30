import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';

import {ManageProductItem} from '@app/components/molecules';
import {products} from '@app/mocks';
import {Product} from '@app/types';

/**
 * Displays a scrollable list of products using FlatList
 */
export const ManageProductList: React.FC = () => {
  /**
   * Render a single product item
   */
  const renderItem: ListRenderItem<Product> = ({item}) => <ManageProductItem product={item} />;

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={{paddingBottom: 150}}
    />
  );
};
