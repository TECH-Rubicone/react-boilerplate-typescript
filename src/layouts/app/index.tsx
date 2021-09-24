// outsource libraries
import React, { memo } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// local dependencies
import Welcome from './welcome';
import * as ROUTES from 'constants/routes';

import Administrative from './administrative';

const App = () => {
  return <Switch>
    <Route path={ROUTES.WELCOME.ROUTE} component={Welcome} />
    <Route path={ROUTES.ADMINISTRATIVE.ROUTE} component={Administrative} />
    <Redirect to={ROUTES.WELCOME.ROUTE} />
  </Switch>;
};

export default memo(App);
