// outsource dependencies
import React, { memo, useEffect } from 'react';
import { useController } from 'redux-saga-controller';
import { Divider, Grid, Typography } from '@mui/material';

// local dependencies
import ItemList from './list';
import Actions from './actions';
import { controller } from './controller';

// styles
import './styles.css';

const List = () => {
  const [
    { initialized },
    { initialize, clearCtrl },
    isControllerSubscribed
  ] = useController(controller);

  useEffect(() => {
    initialize();
    return () => {
      clearCtrl();
    };
  }, [initialized, clearCtrl]);

  if (!isControllerSubscribed && !initialized) {
    return <span>Preloader</span>;
  }

  return <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant="h3">Users</Typography>
      <Divider />
    </Grid>
    <Grid item xs={12}>
      <Actions />
    </Grid>
    <Grid item xs={12}>
      <ItemList />
    </Grid>
  </Grid>;
};

export default memo(List);
