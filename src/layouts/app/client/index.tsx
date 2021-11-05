// outsource libraries
import React, { memo } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// constants
import * as ROUTES from 'constants/routes';

// local dependencies
import DSLD from './dsld';

const Client = () => <Switch>
  <Route path={ROUTES.CLIENT_DSLD.ROUTE} component={DSLD} />
  <Redirect to={ROUTES.CLIENT_DSLD.LINK()} />
</Switch>;

export default memo(Client);
