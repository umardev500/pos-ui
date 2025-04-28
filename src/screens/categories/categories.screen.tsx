import {MenuScreenTemplate} from '@app/components/templates/menu-screen.template';
import React from 'react';
import {categoriesDataDummy} from './categories.dummy';

type Props = {};

export const CategoriesScreen: React.FC<Props> = ({}) => {
  return (
    <>
      <MenuScreenTemplate menus={categoriesDataDummy} />
    </>
  );
};
