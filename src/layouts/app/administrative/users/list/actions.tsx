// outsource dependencies
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Grid, Stack } from '@mui/material';
import React, { memo, useMemo, useCallback } from 'react';
import { Add as AddIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { useControllerActions, useControllerData } from 'redux-saga-controller';

// components
import SearchInput from 'components/search-input';
import Dropdown, { DropdownOption } from 'components/dropdown';

// constants
import * as ROUTES from 'constants/routes';

// local dependencies
import { controller } from './controller';

const Actions = () => {
  const { name, disabled, selected } = useControllerData(controller);
  const { updateFilters, updateCtrl, deleteItems } = useControllerActions(controller);
  const { t } = useTranslation();

  const handleInputClear = useCallback(() => updateCtrl({ name: '' }), [updateCtrl]);
  const handleInputChange = useCallback(name => updateCtrl({ name }), [updateCtrl]);

  const handleItemsDelete = useCallback(() => deleteItems({ selected }), [deleteItems, selected]);

  const options: Array<DropdownOption> = useMemo(() => [
    {
      key: 0,
      Icon: DeleteIcon,
      handleClick: handleItemsDelete,
      name: t('USERS.actions.remove'),
    },
  ], [handleItemsDelete, t]);

  return <Grid container alignItems="center">
    <Grid item xs={12} md={4}>
      <SearchInput
        value={name}
        disabled={disabled}
        onInputApply={updateFilters}
        onInputClear={handleInputClear}
        onInputChange={handleInputChange}
        placeholder={t('forms.placeholder.search')}
      />
    </Grid>
    <Grid item xs={12} md={8} sx={{ height: '100%' }} alignItems="center">
      <Stack spacing={2} direction="row" alignItems="center" justifyContent="flex-end">
        <Dropdown
          options={options}
          title={t('USERS.actions.options')}
          disabled={disabled || selected.length === 0}
        />
        <Button
          component={Link}
          disabled={disabled}
          variant="contained"
          startIcon={<AddIcon />}
          to={ROUTES.ADMINISTRATIVE_USERS_EDIT.LINK({})}
        >
          { t('USERS.actions.create') }
        </Button>
      </Stack>
    </Grid>
  </Grid>;
};

export default memo(Actions);
