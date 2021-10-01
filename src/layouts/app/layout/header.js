// outsource dependencies
import React, { useCallback } from 'react';
import { Menu } from '@mui/icons-material';
import { useControllerActions, useControllerData } from 'redux-saga-controller';
import { AppBar, IconButton, styled, Toolbar, Typography } from '@mui/material';

// local dependencies
import { controller } from '../controller';

const drawerWidth = 240;

const StyledAppBar = styled(AppBar, {
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

  const handleOpen = useCallback(() => updateCtrl({ open: true }), [updateCtrl]);

  return <StyledAppBar position="fixed" open={open}>
    <Toolbar>
      { !open && <IconButton
        edge="start"
        color="inherit"
        onClick={handleOpen}
      >
        <Menu />
      </IconButton> }
      <Typography variant="h5" noWrap component="div" className="ml" sx={{ m: 2 }}>
        React boilerplate typescript
      </Typography>
    </Toolbar>
  </StyledAppBar>;
};

export default Header;
