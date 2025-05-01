import {MenuScreenTemplate} from '@app/components/templates/menu-screen.template';
import {unitListMock} from '@app/mocks';
import React from 'react';

type Props = {};

export const UnitListScreen: React.FC<Props> = ({}) => {
  return (
    <>
      <MenuScreenTemplate menus={unitListMock} />
    </>
  );
};
