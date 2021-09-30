// outsource libraries
import React, { memo } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// constants
import * as ROUTES from 'constants/routes';

// common
import Home from 'common/home';

// local dependencies
import Users from './users';

const App = () => <Switch>
  <Route path={ROUTES.ADMINISTRATIVE_HOME.ROUTE} component={Home} />
  <Route path={ROUTES.ADMINISTRATIVE_USERS.ROUTE} component={Users} />
  <Redirect to={ROUTES.ADMINISTRATIVE_HOME.ROUTE} />
</Switch>;

export default memo(App);
