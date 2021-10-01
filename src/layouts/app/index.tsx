// outsource libraries
import React, { memo } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// local dependencies
import MENU from './menu';
import Layout from './layout';
import Welcome from './welcome';
import Administrative from './administrative';

// constants
import * as ROUTES from 'constants/routes';

const App = () => <Layout menu={MENU}>
  <Switch>
    <Route path={ROUTES.WELCOME.ROUTE} component={Welcome} />
    <Route path={ROUTES.ADMINISTRATIVE.ROUTE} component={Administrative} />
    <Redirect to={ROUTES.WELCOME.ROUTE} />
  </Switch>
</Layout>;

export default memo(App);
