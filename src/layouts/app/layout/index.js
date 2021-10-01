// outsource dependencies
import React from 'react';
import { Box } from '@mui/material';

// local dependencies
import Header from './header';
import SideMenu from './side-menu';

const Layout = ({ menu, children }) => <Box sx={{ display: 'flex' }}>
  <Header />
  <SideMenu menu={menu} />
  <Box component="main" sx={{ flexGrow: 1, p: 2, mt: 5 }}>
    { children }
  </Box>
</Box>;

export default Layout;
