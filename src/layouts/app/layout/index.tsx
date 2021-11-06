// outsource dependencies
import React from 'react';

// local dependencies
import Header from './header';
import SideMenu, { MENU_TYPE, ItemActionProps, ItemHeaderProps, ItemLinkProps, ItemMenuProps, SubItemActionProps, SubItemLinkProps } from './side-menu';

export type MenuType = { type: MENU_TYPE }

export type MenuSubItemType = { type: MENU_TYPE.LINK | MENU_TYPE.ACTION }

export type ItemTypeMenu = { type: MENU_TYPE.MENU }
export type ItemTypeLink = { type: MENU_TYPE.LINK }
export type ItemTypeHeader = { type: MENU_TYPE.HEADER }
export type ItemTypeAction = { type: MENU_TYPE.ACTION }

export type ItemMenu = ItemMenuProps & ItemTypeMenu
export type ItemLink = ItemLinkProps & ItemTypeLink
export type ItemHeader = ItemHeaderProps & ItemTypeHeader
export type ItemAction = ItemActionProps & ItemTypeAction

export type MenuItem = ItemMenu | ItemHeader | ItemAction | ItemLink;

export type ItemByTypeProps = ItemMenuProps & ItemHeaderProps & ItemActionProps & ItemLinkProps & MenuType;
export type SubItemByTypeProps = SubItemLinkProps & SubItemActionProps & MenuSubItemType;

export const DRAWER_WIDTH = 240;

interface LayoutProps {
  menu: Array<ItemByTypeProps>
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ menu, children }) => <h1>Layout</h1>;

export default Layout;
