// outsource dependencies
import React, { memo, useEffect } from 'react';
import { useController } from 'redux-saga-controller';
import { Divider, Grid, Typography } from '@mui/material';

// local dependencies
import ItemList from './list';
import Actions from './actions';
import { controller } from './controller';

const List = () => {
  const [
    { initialized },
    { initialize, clearCtrl },
    isControllerSubscribed
  ] = useController(controller);

  useEffect(() => {
    initialize();
    return () => { clearCtrl(); };
  }, [initialized, clearCtrl, initialize]);

  // TODO
  if (!isControllerSubscribed && !initialized) {
    return <span>Preloader</span>;
  }

  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant="h3">Supplements</Typography>
      <Divider />
    </Grid>
    <Grid item xs={12} md={4}>

    </Grid>
    <Grid item xs={12} md={8}>
      <ItemList />
    </Grid>
  </Grid>;
};

export default memo(List);
