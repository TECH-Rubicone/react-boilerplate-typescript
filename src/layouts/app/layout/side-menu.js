// outsource dependencies
import { NavLink } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import { useControllerActions, useControllerData } from 'redux-saga-controller';
import { Collapse, Divider, Drawer as MuiDrawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, styled, useTheme } from '@mui/material';
import { AssignmentIndOutlined, ChevronLeft, ChevronRight, ExpandLess, ExpandMore, FormatListBulletedOutlined, StarBorderOutlined, SupervisorAccountOutlined, VpnKeyOutlined } from '@mui/icons-material';

// local dependencies
import controller from './controller';
import DrawerHeader from './drawer-header';

// constants
import * as ROUTES from 'constants/routes';

const drawerWidth = 240;

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(7)} + 1px)`
  }
});

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
  overflowX: 'hidden'
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  width: drawerWidth,
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

const MENU_TYPES = {
  LINK: 'LINK',
  MENU: 'MENU',
  HEADER: 'HEADER',
};

const MENU = [
  {
    type: MENU_TYPES.HEADER,
    name: 'Menu',
  },
  {
    type: MENU_TYPES.MENU,
    name: 'Auth',
    icon: VpnKeyOutlined,
    list: [
      {
        type: MENU_TYPES.LINK,
        name: 'Sign in',
        icon: AssignmentIndOutlined,
        link: ROUTES.SIGN_IN.LINK(),
      }
    ]
  },
  {
    type: MENU_TYPES.MENU,
    name: 'Administrative',
    icon: SupervisorAccountOutlined,
    list: [
      {
        type: MENU_TYPES.LINK,
        name: 'Welcome',
        icon: StarBorderOutlined,
        link: ROUTES.WELCOME.LINK(),
      },
      {
        type: MENU_TYPES.LINK,
        name: 'List',
        icon: FormatListBulletedOutlined,
        link: ROUTES.ADMINISTRATIVE_USERS_LIST.LINK(),
      },
    ],
  },
];

const SideMenu = () => {
  const theme = useTheme();
  const { open } = useControllerData(controller);
  const { updateCtrl } = useControllerActions(controller);
  const handleDrawerClose = useCallback(() => updateCtrl({ open: false }), [updateCtrl]);
  return <Drawer variant="permanent" open={open}>
    <DrawerHeader>
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
      </IconButton>
    </DrawerHeader>
    <Divider />
    <List>
      {MENU.map(props => <ItemByType key={props.name} {...props} />)}
    </List>
  </Drawer>;
};

export default SideMenu;

const MenuLink = ({ name, link, icon: Icon }) => {
  return <NavLink to={link}>
    <ListItemButton>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={name} />
    </ListItemButton>
  </NavLink>;
};

const MenuHeader = ({ name }) => {
  const { open } = useControllerData(controller);
  return <ListSubheader
    component="div"
    id="nested-list-subheader"
    sx={{ ...(!open && { display: 'none' }) }}
  >
    {name}
  </ListSubheader>;
};

const Menu = ({ name, icon: Icon, list }) => {
  const { open } = useControllerData(controller);
  const { updateCtrl } = useControllerActions(controller);

  const [opened, setOpened] = useState(false);

  const handleMenuToggle = useCallback(() => {
    setOpened(state => !state);
    updateCtrl({ open: true });
  }, [setOpened]);

  useEffect(() => {
    if (!open) {
      setOpened(false);
    }
  }, [open]);

  return <>
    <ListItemButton onClick={handleMenuToggle}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={name} />
      {opened ? <ExpandLess /> : <ExpandMore />}
    </ListItemButton>
    <Collapse in={opened}>
      <List disablePadding sx={{ pl: 4 }}>
        {(list ?? []).map((props) => <MenuLink {...props} />)}
      </List>
    </Collapse>
  </>;
};

const components = [
  {
    type: MENU_TYPES.HEADER,
    component: MenuHeader
  },
  {
    type: MENU_TYPES.LINK,
    component: MenuLink
  },
  {
    type: MENU_TYPES.MENU,
    component: Menu
  },
];

const ItemByType = ({ type, ...attr }) => {
  const { component: Component } = components.find(component => component.type === type);
  return <Component {...attr} />;
};
