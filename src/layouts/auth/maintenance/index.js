// outsource dependencies
import React from 'react';
import { Alert, AlertTitle, Container, Grid } from '@mui/material';

const Maintenance = () => <Container
  xs={12}
  maxWidth="sm"
  sx={{ overflow: 'hidden', height: '100%', mt: -8 }}
>
  <Grid container spacing={2} sx={{ height: '100%' }} alignContent="center">
    <Grid item xs={12}>
      <Alert severity="warning">
        <AlertTitle>Warning</AlertTitle>
        <strong>SITE IS UNDER MAINTENANCE</strong>
      </Alert>
    </Grid>
    <Grid item xs={12}>
      <Alert severity="success">
        <AlertTitle>Success</AlertTitle>
        <strong>We&#39;ll back online shortly!</strong>
      </Alert>
    </Grid>
  </Grid>
</Container>;

export default Maintenance;
