// outsource dependencies
import React, { useCallback } from 'react';
import { Menu } from '@mui/icons-material';
import { useControllerActions, useControllerData } from 'redux-saga-controller';
import { AppBarProps, AppBar, IconButton, styled, Toolbar, Typography } from '@mui/material';

// local dependencies
import { DRAWER_WIDTH } from './index';
import { controller } from '../controller';

interface StyledAppBarProps extends AppBarProps {
  open?: boolean;
}

const StyledAppBar = styled(AppBar, {
  shouldForwardProp: prop => prop !== 'open'
})<StyledAppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    marginLeft: DRAWER_WIDTH,
    width: `calc(100% - ${DRAWER_WIDTH}px)`,
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
      <Typography variant="h5" noWrap component="div" className="ml" m={2}>
        React boilerplate typescript
      </Typography>
    </Toolbar>
  </StyledAppBar>;
};

export default Header;
