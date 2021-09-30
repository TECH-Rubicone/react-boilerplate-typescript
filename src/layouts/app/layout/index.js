// outsource dependencies
import React from 'react';
import { Box, Grid } from '@mui/material';
import { useController } from 'redux-saga-controller';

// local dependencies
import Header from './header';
import SideMenu from './side-menu';
import controller from './controller';
import DrawerHeader from './drawer-header';

const Layout = ({ children }) => {
  const control = useController(controller);

  return <Grid container>
    <Header />
    <SideMenu />
    <Box component="main" sx={{ flexGrow: 1, p: 2 }}>
      <DrawerHeader />
      {children}
    </Box>
  </Grid>;
};

export default Layout;
