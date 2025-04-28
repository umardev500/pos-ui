import {ListMenu} from '@app/components/organisms';
import {MenuItem} from '@app/types';
import {Header} from '@react-navigation/elements';
import React from 'react';
import {View} from 'react-native';

type Props = {
  menus: MenuItem[];
};

export const MenuScreenTemplate: React.FC<Props> = ({menus}) => {
  return (
    <>
      <Header title="Manage product" />

      <View className="flex-1 bg-white">
        <ListMenu menus={menus} />
      </View>
    </>
  );
};
