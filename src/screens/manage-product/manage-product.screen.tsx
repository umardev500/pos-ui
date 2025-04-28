import {MenuScreenTemplate} from '@app/components/templates/menu-screen.template';
import React from 'react';
import {manageProductMenus} from './menu.data';

type Props = {};

export const ManageProductScreen: React.FC<Props> = ({}) => {
  return <MenuScreenTemplate menus={manageProductMenus} />;
};
