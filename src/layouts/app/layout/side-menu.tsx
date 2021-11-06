// outsource dependencies
import React, { useCallback } from 'react';
import { useControllerActions, useControllerData } from 'redux-saga-controller';
// hooks

// local dependencies
import { controller } from '../controller';
import { ItemByTypeProps } from './index';


export enum MENU_TYPE {
  LINK = 'LINK',
  MENU = 'MENU',
  ACTION = 'ACTION',
  HEADER = 'HEADER',
}

interface SideMenuProps {
  menu: Array<ItemByTypeProps>
}

const SideMenu: React.FC<SideMenuProps> = ({ menu }) => {
  const { open } = useControllerData(controller);
  const { updateCtrl } = useControllerActions(controller);
  const handleDrawerClose = useCallback(() => updateCtrl({ open: false }), [updateCtrl]);
  return <h1>Side - menu</h1>;
};
export default SideMenu;

