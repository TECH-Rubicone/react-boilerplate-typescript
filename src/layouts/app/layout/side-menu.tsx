// outsource dependencies
import { Location } from 'history';
import { Link, useLocation } from 'react-router-dom';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useControllerActions, useControllerData } from 'redux-saga-controller';
import { DrawerProps, Collapse, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack, Menu, MenuItem, styled, Theme } from '@mui/material';
import { SvgIconComponent, ChevronLeft as ChevronLeftIcon, ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon, Remove as RemoveIcon, Bookmark as BookmarkIcon } from '@mui/icons-material';

// hooks
import { HEADER_HEIGHT } from 'hooks/use-free-height';

// local dependencies
import { controller } from '../controller';
import { ItemByTypeProps, SubItemByTypeProps, DRAWER_WIDTH } from './index';

const closedMixin = (theme: Theme) => ({
  width: `calc(${theme.spacing(7)} + 1px)`,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
});

const openedMixin = (theme: Theme) => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
});

interface MuiDrawerProps extends DrawerProps {
  open?: boolean;
}

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: prop => prop !== 'open'
})<MuiDrawerProps>(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open ? {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  } : {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

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
  return <StyledDrawer variant="permanent" open={open}>
    <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ height: HEADER_HEIGHT }}>
      <IconButton onClick={handleDrawerClose} sx={{ mr: 1 }}>
        <ChevronLeftIcon />
      </IconButton>
    </Stack>
    <Divider />
    <List>
      { menu.map((item, index) => <ItemByType key={index} {...item} />) }
    </List>
  </StyledDrawer>;
};

export default SideMenu;

export interface ItemLinkProps {
  name: string
  link: string
  icon?: SvgIconComponent
  isActive: (location: Location) => boolean
}

const ItemLink: React.FC<ItemLinkProps> = ({ name, link, icon, isActive, ...props }) => {
  const location = useLocation<Location>();
  const selected = useMemo(() => isActive(location), [isActive, location]);
  const Icon = icon ?? BookmarkIcon;
  return <ListItemButton selected={selected} component={Link} to={link} {...props}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={name} />
  </ListItemButton>;
};

export interface ItemActionProps {
  name: string
  action: () => void
  icon?: SvgIconComponent
  isActive: (location: Location) => boolean
}

const ItemAction: React.FC<ItemActionProps> = ({ name, action, icon, isActive, ...props }) => {
  const location = useLocation<Location>();
  const selected = useMemo(() => isActive(location), [isActive, location]);
  const Icon = icon ?? BookmarkIcon;
  return <ListItemButton onClick={action} {...props} selected={selected}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={name} />
  </ListItemButton>;
};

export interface ItemHeaderProps {
  name: string
}

const ItemHeader: React.FC<ItemHeaderProps> = ({ name }) => {
  const { open } = useControllerData(controller);
  return <ListSubheader>{ open ? name : <RemoveIcon /> }</ListSubheader>;
};

export interface ItemMenuProps {
  name: string
  icon?: SvgIconComponent
  list: Array<SubItemByTypeProps>
  isActive: (location: Location) => boolean
}

const ItemMenu: React.FC<ItemMenuProps> = ({ name, icon, list, isActive }) => {
  const location = useLocation<Location>();
  const { open } = useControllerData(controller);

  const [ref, setRef] = useState<null | HTMLElement>(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => { setOpened(false); }, [open]);

  const selected = useMemo(() => isActive(location), [isActive, location]);
  const handleMenuToggle = useCallback(() => { setOpened(state => !state); }, []);

  const Icon = icon ?? BookmarkIcon;
  return <>
    <ListItemButton
      ref={setRef}
      selected={selected}
      onClick={handleMenuToggle}
    >
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={name} />
      { opened ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
    </ListItemButton>
    { open
      ? <Collapse in={opened}>
        <List disablePadding>
          { (list ?? []).map((item, index) => <SubItemByType key={index} {...item} />) }
        </List>
      </Collapse>
      : <Menu
        open={opened}
        anchorEl={ref}
        onClose={handleMenuToggle}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        { (list ?? []).map((item, index) => <SubItemByType key={index} {...item} />) }
      </Menu> }
  </>;
};

const ItemByType: React.FC<ItemByTypeProps> = ({ type, name, link, action, icon, isActive, list }) => {
  switch (type) {
    case MENU_TYPE.HEADER: return <ItemHeader name={name} />;
    case MENU_TYPE.MENU: return <ItemMenu name={name} list={list} isActive={isActive} />;
    case MENU_TYPE.LINK: return <ItemLink name={name} link={link} icon={icon} isActive={isActive} />;
    case MENU_TYPE.ACTION: return <ItemAction name={name} action={action} icon={icon} isActive={isActive} />;
    default: return null;
  }
};

const SubItemByType: React.FC<SubItemByTypeProps> = ({ type, name, link, action, icon, isActive }) => {
  switch (type) {
    case MENU_TYPE.LINK: return <SubItemLink name={name} link={link} icon={icon} isActive={isActive} />;
    case MENU_TYPE.ACTION: return <SubItemAction name={name} action={action} icon={icon} isActive={isActive} />;
    default: return null;
  }
};

export type SubItemLinkProps = {
  name: string
  link: string
  icon?: SvgIconComponent
  isActive: (location: Location) => boolean
}

const SubItemLink: React.FC<SubItemLinkProps> = ({ icon, isActive, link, name }) => {
  const location = useLocation<Location>();
  const selected = useMemo(() => isActive(location), [isActive, location]);
  const Icon = icon ?? BookmarkIcon;
  return <MenuItem component={Link} to={link} selected={selected}>
    <ListItemIcon>
      <Icon fontSize="small" />
    </ListItemIcon>
    <ListItemText>
      { name }
    </ListItemText>
  </MenuItem>;
};

export type SubItemActionProps = {
  name: string
  action: () => void
  icon?: SvgIconComponent
  isActive: (location: Location) => boolean
}

const SubItemAction: React.FC<SubItemActionProps> = ({ icon, isActive, name, action }) => {
  const location = useLocation<Location>();
  const selected = useMemo(() => isActive(location), [isActive, location]);
  const Icon = icon ?? BookmarkIcon;
  return <MenuItem key={name} selected={selected}>
    <ListItemIcon>
      <Icon fontSize="small" />
    </ListItemIcon>
    <ListItemText onClick={action}>
      { name }
    </ListItemText>
  </MenuItem>;
};
