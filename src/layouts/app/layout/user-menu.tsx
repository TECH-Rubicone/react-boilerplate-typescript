// outsource dependencies
import { Link } from 'react-router-dom';
import { useControllerActions } from 'redux-saga-controller';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Logout, PersonAdd, SvgIconComponent } from '@mui/icons-material';
import { Avatar, IconButton, ListItemIcon, ListItemText, MenuItem, Grid, Menu, ListItemButton, Divider } from '@mui/material';

// local dependencies
import { controller } from '../../controller';
import { API_NAMES } from '../../../constants/api';

// services
import storage from '../../../services/storage.service';

export interface UserMenu {
  list: Array<ItemMenuProps>
}

const UserMenu: React.FC<UserMenu> = ({ list }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [ref, setRef] = useState<null | HTMLElement>(null);
  const { updateCtrl } = useControllerActions(controller);
  useEffect(() => { setIsOpen(false); }, []);
  const handleMenuToggle = useCallback(() => { setIsOpen(state => !state); }, []);
  const logout = useCallback(() => {
    updateCtrl({ token: { accessToken: null }, auth: false });
    storage.remove(API_NAMES.AUTH_STORE);
  }, [updateCtrl]);
  return <Grid
    container
    spacing={2}
    display="flex"
    alignItems="center"
  >
    <Grid item>
      <MenuItem component={Link} to="#">
          Contact
      </MenuItem>
    </Grid>
    <Grid item>
      <MenuItem component={Link} to="#">
          Profile
      </MenuItem>
    </Grid>
    <Grid item>
      <IconButton
        ref={setRef}
        onClick={handleMenuToggle}
      >
        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
      </IconButton>
      { isOpen && <Menu
        open={isOpen}
        anchorEl={ref}
        onClose={handleMenuToggle}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        { (list ?? []).map((item, index) => <ItemMenu key={index} {...item}/>) }
        <Divider/>
        <MenuItem sx={{ p: 0 }}>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <Logout fontSize="small"/>
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </ListItemButton>
        </MenuItem>
      </Menu> }
    </Grid>
  </Grid>;
};

export default memo(UserMenu);

interface ItemMenuProps {
  link: string
  description: string
  icon?: SvgIconComponent
}

const ItemMenu: React.FC<ItemMenuProps> = ({ description, icon, link }) => {
  const Icon = icon ?? PersonAdd;
  return <MenuItem component={Link} to={link}>
    <ListItemIcon>
      <Icon/>
    </ListItemIcon>
    <ListItemText>{ description }</ListItemText>
  </MenuItem>;
};
