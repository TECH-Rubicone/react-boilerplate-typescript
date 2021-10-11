// outsource dependencies
import { Link, useLocation } from 'react-router-dom';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { ChevronLeft, ExpandLess, ExpandMore } from '@mui/icons-material';
import { useControllerActions, useControllerData } from 'redux-saga-controller';
import { Collapse, Divider, Drawer as MuiDrawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack, Menu, MenuItem, styled } from '@mui/material';

// local dependencies
import { controller } from '../controller';

// hooks
import { HEADER_HEIGHT } from 'hooks/use-free-height';

const DRAWER_WIDTH = 240;

const closedMixin = theme => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
});

const openedMixin = theme => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open'
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

const ItemLink = ({ name, link, icon: Icon, isActive, location, ...props }) => {
  const selected = useMemo(() => isActive(location), [isActive, location]);
  return <ListItemButton {...props} selected={selected} component={Link} to={link}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={name} />
  </ListItemButton>;
};

const ItemAction = ({ name, action, icon: Icon, isActive, location, ...props }) => {
  const selected = useMemo(() => isActive(location), [isActive, location]);
  return <ListItemButton onClick={action} {...props} selected={selected}>
    <ListItemIcon>
      <Icon />
    </ListItemIcon>
    <ListItemText primary={name} />
  </ListItemButton>;
};

const ItemHeader = ({ name }) => {
  const { open } = useControllerData(controller);
  return open && <ListSubheader>
    { name }
  </ListSubheader>;
};

const ItemMenu = ({ name, icon: Icon, list, isActive }) => {
  const location = useLocation();
  const { open } = useControllerData(controller);

  const [ref, setRef] = useState(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => { setOpened(false); }, [open]);

  const selected = useMemo(() => isActive(location), [isActive, location]);
  const handleMenuToggle = useCallback(() => { setOpened(state => !state); }, []);

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
      { opened ? <ExpandLess /> : <ExpandMore /> }
    </ListItemButton>
    { open ? <Collapse in={opened}>
      <List disablePadding>
        { (list ?? []).map(item => <ItemByType key={item.name} location={location} {...item} />) }
      </List>
    </Collapse>
      : <Menu
        open={opened}
        anchorEl={ref}
        onClose={handleMenuToggle}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
        onRequestClose={handleMenuToggle}
      >
        { (list ?? []).map(item => <SubItemByType key={name} {...item} />) }
      </Menu> }
  </>;
};

const ItemByType = ({ type, ...attr }) => {
  switch (type) {
    case MENU_TYPE.MENU: return <ItemMenu {...attr} />;
    case MENU_TYPE.LINK: return <ItemLink {...attr} />;
    case MENU_TYPE.HEADER: return <ItemHeader {...attr} />;
    case MENU_TYPE.ACTION: return <ItemAction {...attr} />;
    default: return null;
  }
};

const SubItemByType = ({ type, ...attr }) => {
  switch (type) {
    case MENU_TYPE.LINK: return <SubItemLink {...attr} />;
    case MENU_TYPE.ACTION: return <SubItemAction {...attr} />;
    default: return null;
  }
};

const SubItemLink = ({ icon: Icon, isActive, link, name }) => {
  const selected = useMemo(() => isActive(location), [isActive]);
  return <MenuItem key={name} component={Link} to={link} selected={selected}>
    <ListItemIcon>
      <Icon fontSize="small" />
    </ListItemIcon>
    <ListItemText component={Link} to={link}>
      { name }
    </ListItemText>
  </MenuItem>;
};

const SubItemAction = ({ icon: Icon, isActive, link, name }) => {
  const selected = useMemo(() => isActive(location), [isActive]);
  return <MenuItem key={name} selected={selected}>
    <ListItemIcon>
      <Icon fontSize="small" />
    </ListItemIcon>
    <ListItemText component={Link} to={link}>
      { name }
    </ListItemText>
  </MenuItem>;
};
