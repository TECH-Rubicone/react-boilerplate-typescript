// outsource dependencies
import { useTranslation } from 'react-i18next';
import React, { memo, useEffect } from 'react';
import { useController } from 'redux-saga-controller';
import { Divider, Grid, Typography } from '@mui/material';

// components
import Preloader from 'components/preloader';

// hooks
import useFreeHeight from 'hooks/use-free-height';

// local dependencies
import ItemList from './list';
import Actions from './actions';
import { controller } from './controller';

const List = () => {
  const [
    { initialized },
    { initialize, clearCtrl },
  ] = useController(controller);

  const { t } = useTranslation();
  const freeHeight = useFreeHeight();

  useEffect(() => {
    initialize();
    return () => { clearCtrl(); };
  }, [clearCtrl, initialize]);

  return <Preloader active={!initialized} sx={{ height: freeHeight }}>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h3">
          { t('USERS.general.title') }
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <Actions />
      </Grid>
      <Grid item xs={12}>
        <ItemList />
      </Grid>
    </Grid>
  </Preloader>;
};

export default memo(List);
