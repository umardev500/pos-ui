import {ListMenuItem} from '@app/components/molecules';
import {MenuItem} from '@app/types';
import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';

type Props = {
  menus: MenuItem[];
};

export const ListMenu: React.FC<Props> = ({menus}) => {
  const renderItem: ListRenderItem<MenuItem> = ({item}) => {
    return <ListMenuItem menu={item} />;
  };

  return <FlatList data={menus} renderItem={renderItem} />;
};
