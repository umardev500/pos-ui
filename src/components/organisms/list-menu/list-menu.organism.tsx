import {ListMenuItem} from '@app/components/molecules';
import {MenuItem} from '@app/types';
import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';

type Props<T extends Record<string, any>> = {
  menus: MenuItem<T>[];
};

export const ListMenu = <T extends Record<string, any>>({menus}: Props<T>) => {
  const renderItem: ListRenderItem<MenuItem<T>> = ({item}) => {
    return <ListMenuItem menu={item} />;
  };

  return <FlatList data={menus} renderItem={renderItem} />;
};
