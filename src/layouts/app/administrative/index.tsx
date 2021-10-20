// outsource libraries
import React, { memo } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// constants
import * as ROUTES from 'constants/routes';

// common
import Home from 'common/home';

// local dependencies
import User from './user';
import Users from './users';

const App = () => <Switch>
  <Route path={ROUTES.ADMINISTRATIVE_HOME.ROUTE} component={Home} />
  <Route path={ROUTES.ADMINISTRATIVE_USERS.ROUTE} component={Users} />
  <Route path={ROUTES.ADMINISTRATIVE_USER.ROUTE} component={User}/>
  <Redirect to={ROUTES.ADMINISTRATIVE_HOME.ROUTE} />
</Switch>;

export default memo(App);
