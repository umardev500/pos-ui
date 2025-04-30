import {ListMenu} from '@app/components/organisms';
import {MenuItem} from '@app/types';
import React from 'react';
import {View} from 'react-native';
import {SystemBars} from 'react-native-edge-to-edge';

// Generic type to handle menu item data
type Props<T extends Record<string, any>> = {
  menus: MenuItem<T>[]; // List of menus to display
};

/**
 * Template component to display a menu screen with system bar styling and menu items
 */
export const MenuScreenTemplate = <T extends Record<string, any>>({menus}: Props<T>) => {
  return (
    <>
      {/* Adjusts the system bars to dark style */}
      <SystemBars style={'dark'} />

      {/* Main content container */}
      <View className="flex-1 bg-white">
        {/* Renders the list of menus */}
        <ListMenu menus={menus} />
      </View>
    </>
  );
};
