// outsource dependencies
import { Link } from 'react-router-dom';
import { Button, Grid, Stack } from '@mui/material';
import React, { memo, useMemo, useCallback } from 'react';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useControllerActions, useControllerData } from 'redux-saga-controller';

// local dependencies
import { controller } from './controller';

// components
import SearchInput from 'components/search-input';
import Dropdown, { DropdownOption } from 'components/dropdown';

// constants
import * as ROUTES from 'constants/routes';

const Actions = () => {
  const { name, disabled, selected } = useControllerData(controller);
  const { updateFilters, updateCtrl, deleteItems } = useControllerActions(controller);

  const handleInputClear = useCallback(() => updateCtrl({ name: '' }), [updateCtrl]);
  const handleInputChange = useCallback(name => updateCtrl({ name }), [updateCtrl]);

  const handleItemsDelete = useCallback(() => deleteItems({ selected }), [deleteItems, selected]);

  const options: Array<DropdownOption> = useMemo(() => [
    {
      key: 0,
      Icon: DeleteIcon,
      name: 'Remove selected',
      handleClick: handleItemsDelete
    },
  ], [handleItemsDelete]);

  return <Grid container>
    <Grid item xs={12} md={4}>
      <SearchInput
        value={name}
        disabled={disabled}
        placeholder="Search"
        onInputApply={updateFilters}
        onInputClear={handleInputClear}
        onInputChange={handleInputChange}
      />
    </Grid>
    <Grid container xs={12} md={8} alignItems="center" justifyContent="flex-end">
      <Stack spacing={2} direction="row">
        <Dropdown
          title="Options"
          options={options}
          disabled={disabled}
        />
        <Button
          component={Link}
          disabled={disabled}
          variant="contained"
          startIcon={<AddIcon />}
          to={ROUTES.ADMINISTRATIVE_USERS_EDIT.LINK({})}
        >
          Create User
        </Button>
      </Stack>
    </Grid>
  </Grid>;
};

export default memo(Actions);
