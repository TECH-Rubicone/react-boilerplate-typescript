// outsource dependencies
import _ from 'lodash';
import { Link, useLocation } from 'react-router-dom';
import React, { useCallback, useMemo, useState } from 'react';
import { ChevronLeft, ExpandLess, ExpandMore } from '@mui/icons-material';
import { useControllerActions, useControllerData } from 'redux-saga-controller';
import { Collapse, Divider, Drawer as MuiDrawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack, styled } from '@mui/material';

// local dependencies
import { controller } from '../controller';

// constants
import { HEADER_HEIGHT } from '../../../hooks/use-free-height';

const DRAWER_WIDTH = 240;

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
});

const openedMixin = (theme) => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme)
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme)
  })
}));

export const MENU_TYPE = {
  LINK: 'LINK',
  MENU: 'MENU',
  ACTION: 'ACTION',
  HEADER: 'HEADER',
};

const SideMenu = ({ menu }) => {
  const { open } = useControllerData(controller);
  const { updateCtrl } = useControllerActions(controller);
  const handleDrawerClose = useCallback(() => updateCtrl({ open: false }), [updateCtrl]);
  return <Drawer variant="permanent" open={open}>
    <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ height: HEADER_HEIGHT }}>
      <IconButton onClick={handleDrawerClose} sx={{ mr: 1 }}>
        <ChevronLeft />
      </IconButton>
    </Stack>
    <Divider />
    <List>
      { menu.map(props => <ItemByType key={props.name} {...props} />) }
    </List>
  </Drawer>;
};

export default SideMenu;

const MenuLink = ({ name, link, icon: Icon, isActive, location, ...props }) => {
  const selected = useMemo(() => isActive(location), [isActive, location]);
  return <ListItemButton {...props} selected={selected} component={Link} to={link}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={name} />
  </ListItemButton>;
};

const MenuAction = ({ name, action, icon: Icon, isActive, location, ...props }) => {
  const selected = useMemo(() => isActive(location), [isActive, location]);
  return <ListItemButton onClick={action} {...props} selected={selected}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={name} />
  </ListItemButton>;
};

const MenuHeader = ({ name }) => {
  const { open } = useControllerData(controller);
  return open && <ListSubheader>
    { name }
  </ListSubheader>;
};

const Menu = ({ name, icon: Icon, list, isActive }) => {
  const location = useLocation();
  const [opened, setOpened] = useState(false);
  const handleMenuToggle = useCallback(() => setOpened(state => !state), [setOpened]);

  const selected = useMemo(() => isActive(location), [isActive, location]);

  return <>
    <ListItemButton onClick={handleMenuToggle} selected={selected}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={name} />
      { opened ? <ExpandLess /> : <ExpandMore /> }
    </ListItemButton>
    <Collapse in={opened}>
      <List disablePadding>
        { (list ?? []).map(item => <ItemByType key={item.name} location={location} {...item} />) }
      </List>
    </Collapse>
  </>;
};

const ItemByType = ({ type, ...attr }) => {
  switch (type) {
    case MENU_TYPE.MENU: return <Menu {...attr} />;
    case MENU_TYPE.LINK: return <MenuLink {...attr} />;
    case MENU_TYPE.HEADER: return <MenuHeader {...attr} />;
    case MENU_TYPE.ACTION: return <MenuAction {...attr} />;
    default: return null;
  }
};
