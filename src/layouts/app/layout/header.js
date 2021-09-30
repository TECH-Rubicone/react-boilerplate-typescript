// outsource dependencies
import React, { useCallback } from 'react';
import { Menu } from '@mui/icons-material';
import { useControllerActions, useControllerData } from 'redux-saga-controller';
import { AppBar as MuiAppBar, IconButton, styled, Toolbar, Typography } from '@mui/material';

// local dependencies
import controller from './controller';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header = () => {
  const { open } = useControllerData(controller);
  const { updateCtrl } = useControllerActions(controller);

  const handleDrawerOpen = useCallback(() => updateCtrl({ open: true }), [updateCtrl]);

  return <AppBar position="fixed" open={open}>
    <Toolbar>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        edge="start"
        sx={{
          marginRight: '36px',
          ...(open && { display: 'none' }),
        }}
      >
        <Menu />
      </IconButton>
      <Typography variant="h6" noWrap component="div">
        Mini variant drawer
      </Typography>
    </Toolbar>
  </AppBar>;
};

export default Header;
