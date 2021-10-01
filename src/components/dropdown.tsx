// outsource dependencies
import { Button, MenuItem, ListItemIcon, ListItemText, Menu } from '@mui/material';
import React, { memo, useCallback, useState, useMemo, FC, MouseEvent } from 'react';
import { SvgIconComponent, KeyboardArrowDown as KeyboardArrowDownIcon } from '@mui/icons-material';

export interface DropdownOption {
  name: string
  key: string | number
  Icon: SvgIconComponent
  handleClick: () => void
}

interface DropdownProps {
  title: string
  disabled?: boolean
  options: Array<DropdownOption>
}

const Dropdown: FC<DropdownProps> = ({ title, disabled, options }) => {
  const [ref, setRef] = useState<null | HTMLElement>(null);
  const isOpen = Boolean(ref);
  const handleClick = useCallback((event: MouseEvent<HTMLElement>) => setRef(event.currentTarget), []);
  const handleClose = useCallback(() => setRef(null), []);

  const items = useMemo(() => options.map(({ handleClick, ...item }) => ({
    ...item,
    handleClick: () => {
      handleClick();
      handleClose();
    }
  })), [handleClose, options]);

  return <>
    <Button
      disableElevation
      disabled={disabled}
      variant="contained"
      onClick={handleClick}
      endIcon={<KeyboardArrowDownIcon />}
    >
      { title }
    </Button>
    <Menu
      open={isOpen}
      anchorEl={ref}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      { items.map(({ key, name, handleClick, Icon }) => <MenuItem
        key={key}
        onClick={handleClick}
      >
        <ListItemIcon>
          <Icon fontSize="small" />
        </ListItemIcon>
        <ListItemText>
          { name }
        </ListItemText>
      </MenuItem>) }
    </Menu>
  </>;
};

Dropdown.defaultProps = {
  disabled: false,
  options: [],
};

export default memo(Dropdown);
