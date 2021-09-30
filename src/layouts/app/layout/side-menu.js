// outsource dependencies
import React, { useCallback } from 'react';
import { ChevronLeft, ChevronRight, Inbox, Mail } from '@mui/icons-material';
import { useControllerActions, useControllerData } from 'redux-saga-controller';
import { Divider, Drawer as MuiDrawer, IconButton, List, ListItem, ListItemIcon, ListItemText, styled, useTheme } from '@mui/material';

// local dependencies
import controller from './controller';
import DrawerHeader from './drawer-header';

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

const SideMenu = () => {
  const theme = useTheme();
  const { open } = useControllerData(controller);
  const { updateCtrl } = useControllerActions(controller);
  const handleDrawerClose = useCallback(() => updateCtrl({ open: false }), [updateCtrl]);
  return <Drawer variant="permanent" open={open}>
    <DrawerHeader>
      <IconButton onClick={handleDrawerClose}>
        {theme.direction === 'rtl' ? (
          <ChevronRight />
        ) : (
          <ChevronLeft />
        )}
      </IconButton>
    </DrawerHeader>
    <Divider />
    <List>
      {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
        <ListItem button key={text} sx={{ alignText: 'center' }}>
          <ListItemIcon>
            {index % 2 === 0 ? <Inbox /> : <Mail />}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
    <Divider />
    <List>
      {['All mail', 'Trash', 'Spam'].map((text, index) => (
        <ListItem button key={text}>
          <ListItemIcon>
            {index % 2 === 0 ? <Inbox /> : <Mail />}
          </ListItemIcon>
          <ListItemText primary={text} />
        </ListItem>
      ))}
    </List>
  </Drawer>;
};

export default SideMenu;
