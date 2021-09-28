// outsource dependencies
import React, { memo, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import { useController } from 'redux-saga-controller';

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

  return <Grid container>
    <Grid item>
      <Typography variant="h3">Users</Typography>
    </Grid>
    <Grid item container xs={12}>
      <Grid item xs={12}>
        <Actions />
      </Grid>
      <Grid item xs={12}>
        <ItemList />
      </Grid>
    </Grid>
  </Grid>;
};

export default memo(List);
