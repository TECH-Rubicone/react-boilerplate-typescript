// outsource dependencies
import React, { memo, useCallback } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Button, Grid, Link, Menu, MenuItem } from '@mui/material';
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state';
import { useControllerActions, useControllerData } from 'redux-saga-controller';

// local dependencies
import { controller } from './controller';

// components
import { FasIcon } from 'components/fa-icon';
import SearchInput from 'components/search-input';

// constants
import * as ROUTES from 'constants/routes';

const Actions = () => {
  const { name, disabled, selected } = useControllerData(controller);
  const { updateFilters, updateCtrl, deleteItems } = useControllerActions(controller);

  // search
  const handleInputClear = useCallback(() => updateCtrl({ name: '' }), [updateCtrl]);
  const handleInputChange = useCallback(name => updateCtrl({ name }), [updateCtrl]);
  const handleInputApply = useCallback(() => updateFilters(), []);

  const handleItemsDelete = useCallback(() => deleteItems({ selected }), [deleteItems, selected]);

  return <Grid container sx={{ p: 1 }}>
    <Grid xs={5} item container>
      <Grid xs={10} item>
        <SearchInput
          value={name}
          disabled={disabled}
          placeholder="Search"
          onInputClear={handleInputClear}
          onInputApply={handleInputApply}
          onInputChange={handleInputChange}
        />
      </Grid>
    </Grid>
    <Grid xs={7} item container alignItems="center" justifyContent="flex-end">
      <PopupState variant="popover" >
        {(popupState) => (
          <React.Fragment>
            <Button
              sx={{ mr: 2 }}
              disabled={disabled}
              variant="contained"
              {...bindTrigger(popupState)}
              endIcon={<FasIcon icon="caret-down"/>}
            >
              List Actions
            </Button>
            <Menu sx={{ mt: 1 }} {...bindMenu(popupState)}>
              <MenuItem sx={{ width: 150 }} onClick={popupState.close} disabled={!selected.length || disabled}>
                Remove
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
      <Grid item>
        <Link component="button" variant="body1" color="primary">
          <RouterLink to={ROUTES.ADMINISTRATIVE_USERS_EDIT.LINK({})}>
            <FasIcon icon="plus" className="mr-2" />
            Create User
          </RouterLink>
        </Link>
      </Grid>
    </Grid>
  </Grid>;
};

export default memo(Actions);
