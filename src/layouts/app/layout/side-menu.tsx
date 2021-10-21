// outsource dependencies
import i18n from 'i18next';
import { Location } from 'history';
import { Link, useLocation } from 'react-router-dom';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { useControllerActions, useControllerData } from 'redux-saga-controller';
import { SvgIconComponent, ChevronLeft as ChevronLeftIcon, ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon, Remove as RemoveIcon, Bookmark as BookmarkIcon, Language } from '@mui/icons-material';
import { DrawerProps, Collapse, Divider, Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, ListSubheader, Stack, Menu, MenuItem, styled, Theme, Box } from '@mui/material';

// hooks
import useFreeHeight, { HEADER_HEIGHT } from 'hooks/use-free-height';

// configs
import config from 'configs';

// local dependencies
import { controller } from '../controller';
import { ItemByTypeProps, SubItemByTypeProps, DRAWER_WIDTH } from './index';

const languages = [
  {
    name: 'English',
    icon: 'https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg',
    action: () => {
      i18n.changeLanguage('en');
    },
    isActive: () => false,
  },
  {
    name: 'Russian',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/f/f3/Flag_of_Russia.svg',
    action: () => {
      i18n.changeLanguage('ru');
    },
    isActive: () => false,
  },
  {
    name: 'Ukrainian',
    icon: 'https://upload.wikimedia.org/wikipedia/commons/4/49/Flag_of_Ukraine.svg',
    action: () => {
      i18n.changeLanguage('ukr');
    },
    isActive: () => false,
  },
];

const closedMixin = (theme: Theme) => ({
  width: 60,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
});

const openedMixin = (theme: Theme) => ({
  width: DRAWER_WIDTH,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen
  }),
});

type StyledDrawerProps = DrawerProps & {
  open?: boolean;
}

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: prop => prop !== 'open'
})<StyledDrawerProps>(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open ? {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  } : {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export enum MENU_TYPE {
  LINK = 'LINK',
  MENU = 'MENU',
  ACTION = 'ACTION',
  HEADER = 'HEADER',
}

interface SideMenuProps {
  menu: Array<ItemByTypeProps>
}

const SideMenu: React.FC<SideMenuProps> = ({ menu }) => {
  const { open } = useControllerData(controller);
  const { updateCtrl } = useControllerActions(controller);
  const handleDrawerClose = useCallback(() => updateCtrl({ open: false }), [updateCtrl]);

  const freeHeight = useFreeHeight()
  + 64; // mt

  return <StyledDrawer variant="permanent" open={open}>

    <Stack direction="column" justifyContent="space-between" alignItems="center" sx={{ height: freeHeight + 64 }}>
      <Box width="100%">
        <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ height: HEADER_HEIGHT }}>
          <IconButton onClick={handleDrawerClose} sx={{ mr: 1 }}>
            <ChevronLeftIcon />
          </IconButton>
        </Stack>
        <Divider />
        <List>
          { menu.map((item, index) => <ItemByType key={index} {...item} />) }
        </List>
      </Box>
      { config.DEBUG && <Languages name="Language" icon={Language} list={languages} isActive={() => false}/> }
    </Stack>
  </StyledDrawer>;
};

export default SideMenu;

export interface LanguagesProps {
  name: string
  icon?: SvgIconComponent
  list: Array<LanguageItem>
  isActive: (location: Location) => boolean
}

export type LanguageItem = {
  name: string
  icon?: string
  action: () => void
  isActive: (location: Location) => boolean
}

const Languages: React.FC<LanguagesProps> = ({ name, icon, list, isActive }) => {
  const { open } = useControllerData(controller);
  const [ref, setRef] = useState<null | HTMLElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { setIsOpen(false); }, [open]);

  const handleOpen = useCallback(() => setIsOpen(true), [setIsOpen]);
  const handleClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  const newList = useMemo(() => list.map(item => ({
    ...item,
    action: () => {
      item.action();
      handleClose();
    }
  })), [handleClose, list]);

  const Icon = icon ?? BookmarkIcon;

  return <Box width="100%">
    <ListItemButton
      ref={setRef}
      onClick={handleOpen}
    >
      <ListItemIcon sx={{ minWidth: !open ? 24 : 48 }}>
        <Icon />
      </ListItemIcon>
      { open && <ListItemText primary={name} /> }
    </ListItemButton>
    { <Menu
      id="demo-positioned-menu"
      anchorEl={ref}
      open={isOpen}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      transformOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      { (newList ?? []).map((item, index) => <LanguageItemAction key={index} {...item} />) }
    </Menu> }
  </Box>;
};

const LanguageItemAction: React.FC<LanguageItem> = ({ icon, isActive, name, action }) => {
  const location = useLocation<Location>();
  const { open } = useControllerData(controller);
  const selected = useMemo(() => isActive(location), [isActive, location]);
  return <MenuItem key={name} selected={selected} sx={{ p: 1.5, pl: 2 }}>
    <ListItemIcon sx={{ minWidth: !open ? 24 : 48 }}>
      <img src={icon} alt="" style={{ width: '26px' }} />
    </ListItemIcon>
    <ListItemText primary={name} onClick={action} />
  </MenuItem>;
};

export interface ItemLinkProps {
  name: string
  link: string
  icon?: SvgIconComponent
  isActive: (location: Location) => boolean
}

const ItemLink: React.FC<ItemLinkProps> = ({ name, link, icon, isActive, ...props }) => {
  const location = useLocation<Location>();
  const { open } = useControllerData(controller);
  const selected = useMemo(() => isActive(location), [isActive, location]);
  const Icon = icon ?? BookmarkIcon;
  return <ListItemButton selected={selected} component={Link} to={link} {...props}>
    <ListItemIcon sx={{ minWidth: !open ? 24 : 48 }}>
      <Icon />
    </ListItemIcon>
    { open && <ListItemText primary={name} /> }
  </ListItemButton>;
};

export interface ItemActionProps {
  name: string
  action: () => void
  icon?: SvgIconComponent
  isActive: (location: Location) => boolean
}

const ItemAction: React.FC<ItemActionProps> = ({ name, action, icon, isActive, ...props }) => {
  const location = useLocation<Location>();
  const { open } = useControllerData(controller);
  const selected = useMemo(() => isActive(location), [isActive, location]);
  const Icon = icon ?? BookmarkIcon;
  return <ListItemButton onClick={action} {...props} selected={selected}>
    <ListItemIcon sx={{ minWidth: !open ? 24 : 48 }}>
      <Icon />
    </ListItemIcon>
    { open && <ListItemText primary={name} /> }
  </ListItemButton>;
};

export interface ItemHeaderProps {
  name: string
}

const ItemHeader: React.FC<ItemHeaderProps> = ({ name }) => {
  const { open } = useControllerData(controller);
  return <ListSubheader>{ open ? name : <RemoveIcon /> }</ListSubheader>;
};

export interface ItemMenuProps {
  name: string
  icon?: SvgIconComponent
  list: Array<SubItemByTypeProps>
  isActive: (location: Location) => boolean
}

const ItemMenu: React.FC<ItemMenuProps> = ({ name, icon, list, isActive }) => {
  const location = useLocation<Location>();
  const { open } = useControllerData(controller);

  const [ref, setRef] = useState<null | HTMLElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => { setIsOpen(false); }, [open]);

  const selected = useMemo(() => isActive(location), [isActive, location]);
  const handleMenuToggle = useCallback(() => { setIsOpen(state => !state); }, []);

  const Icon = icon ?? BookmarkIcon;
  return <>
    <ListItemButton
      ref={setRef}
      selected={selected}
      onClick={handleMenuToggle}
    >
      <ListItemIcon sx={{ minWidth: !open ? 24 : 48 }}>
        <Icon />
      </ListItemIcon>
      { open && <>
        <ListItemText primary={name} />
        { isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon /> }
      </> }
    </ListItemButton>
    { open
      ? <Collapse in={isOpen}>
        <List disablePadding>
          { (list ?? []).map((item, index) => <SubItemByType key={index} {...item} />) }
        </List>
      </Collapse>
      : <Menu
        open={isOpen}
        anchorEl={ref}
        onClose={handleMenuToggle}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        { (list ?? []).map((item, index) => <SubItemByType key={index} {...item} />) }
      </Menu> }
  </>;
};

const ItemByType: React.FC<ItemByTypeProps> = ({ type, name, link, action, icon, isActive, list }) => {
  switch (type) {
    case MENU_TYPE.HEADER: return <ItemHeader name={name} />;
    case MENU_TYPE.MENU: return <ItemMenu name={name} list={list} isActive={isActive} />;
    case MENU_TYPE.LINK: return <ItemLink name={name} link={link} icon={icon} isActive={isActive} />;
    case MENU_TYPE.ACTION: return <ItemAction name={name} action={action} icon={icon} isActive={isActive} />;
    default: return null;
  }
};

const SubItemByType: React.FC<SubItemByTypeProps> = ({ type, name, link, action, icon, isActive }) => {
  switch (type) {
    case MENU_TYPE.LINK: return <SubItemLink name={name} link={link} icon={icon} isActive={isActive} />;
    case MENU_TYPE.ACTION: return <SubItemAction name={name} action={action} icon={icon} isActive={isActive} />;
    default: return null;
  }
};

export type SubItemLinkProps = {
  name: string
  link: string
  icon?: SvgIconComponent
  isActive: (location: Location) => boolean
}

const SubItemLink: React.FC<SubItemLinkProps> = ({ icon, isActive, link, name }) => {
  const location = useLocation<Location>();
  const { open } = useControllerData(controller);
  const selected = useMemo(() => isActive(location), [isActive, location]);
  const Icon = icon ?? BookmarkIcon;
  return <MenuItem component={Link} to={link} selected={selected} sx={{ p: 1.5, pl: 2 }}>
    <ListItemIcon sx={{ minWidth: !open ? 24 : 48 }}>
      <Icon fontSize="small" />
    </ListItemIcon>
    { open && <ListItemText primary={name} /> }
  </MenuItem>;
};

export type SubItemActionProps = {
  name: string
  action: () => void
  icon?: SvgIconComponent
  isActive: (location: Location) => boolean
}

const SubItemAction: React.FC<SubItemActionProps> = ({ icon, isActive, name, action }) => {
  const location = useLocation<Location>();
  const { open } = useControllerData(controller);
  const selected = useMemo(() => isActive(location), [isActive, location]);
  const Icon = icon ?? BookmarkIcon;
  return <MenuItem key={name} selected={selected} sx={{ p: 1.5, pl: 2 }}>
    <ListItemIcon sx={{ minWidth: !open ? 24 : 48 }}>
      <Icon fontSize="small" />
    </ListItemIcon>
    { open && <ListItemText primary={name} onClick={action} /> }
  </MenuItem>;
};
