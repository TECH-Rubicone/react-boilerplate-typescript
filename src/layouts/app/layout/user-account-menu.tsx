// outsource dependencies
import React, { memo } from 'react';
import { Logout, PersonAdd, Settings } from '@mui/icons-material';
import { Avatar, Divider, IconButton, ListItemIcon, ListItemText, MenuItem, MenuList, Popover, Typography, Grid } from '@mui/material';

const UserAccountMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClose = () => setAnchorEl(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  return <>
    <Grid
      container
      spacing={2}
      display="flex"
      alignItems="center"
    >
      <Grid item>
        <Typography display="block" variant="body1">Contact</Typography>
      </Grid>
      <Grid item>
        <Typography display="block" variant="body1">Profile</Typography>
      </Grid>
      <Grid item>
        <IconButton
          size="small"
          aria-haspopup="true"
          onClick={handleClick}
          aria-describedby="accountMenu"
        >
          <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
        </IconButton>
      </Grid>
    </Grid>
    <Popover
      id="accountMenu"
      open={open}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      onClose={handleClose}
    >
      <MenuList>
        <MenuItem>
          <ListItemIcon sx={{ mr: 2 }}>
            <Avatar/>
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon sx={{ mr: 2 }}>
            <Avatar/>
          </ListItemIcon>
          <ListItemText>My account</ListItemText>
        </MenuItem>
        <Divider/>
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Add another account</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Settings</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Logout fontSize="small"/>
          </ListItemIcon>
          <ListItemText>Logout</ListItemText>
        </MenuItem>
      </MenuList>
    </Popover>
  </>;
};

export default memo(UserAccountMenu);
