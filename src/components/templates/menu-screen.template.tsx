import {ListMenu} from '@app/components/organisms';
import {MenuItem} from '@app/types';
import {Header} from '@react-navigation/elements';
import React from 'react';
import {View} from 'react-native';

type Props<T extends Record<string, any>> = {
  menus: MenuItem<T>[];
};

export const MenuScreenTemplate = <T extends Record<string, any>>({menus}: Props<T>) => {
  return (
    <>
      <Header title="Manage product" />

      <View className="flex-1 bg-white">
        <ListMenu menus={menus} />
      </View>
    </>
  );
};
