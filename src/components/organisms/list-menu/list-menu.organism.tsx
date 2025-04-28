import {ListMenuItem} from '@app/components/molecules';
import {MenuItem} from '@app/types';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, ListRenderItem} from 'react-native';

type Props<T extends Record<string, any>> = {
  menus: MenuItem<T>[];
};

export const ListMenu = <T extends Record<string, any>>({menus}: Props<T>) => {
  const navigation = useNavigation();

  const handlePress = (menu: MenuItem<T>) => {
    navigation.navigate(menu.screen as any, menu.params);
  };

  const renderItem: ListRenderItem<MenuItem<T>> = ({item}) => {
    return <ListMenuItem onPress={handlePress} menu={item} />;
  };

  return <FlatList data={menus} renderItem={renderItem} />;
};
