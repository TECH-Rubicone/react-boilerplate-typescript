// outsource libraries
import React, { memo } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// local dependencies
import MENU from './menu';
import Test from './test';
import Layout from './layout';
import Client from './client';
import Welcome from './welcome';
import Administrative from './administrative';

// constants
import * as ROUTES from 'constants/routes';

const App = () => <Layout menu={MENU}>
  <Switch>
    <Route path={ROUTES.TEST.ROUTE} component={Test} />
    <Route path={ROUTES.CLIENT.ROUTE} component={Client} />
    <Route path={ROUTES.WELCOME.ROUTE} component={Welcome} />
    <Route path={ROUTES.ADMINISTRATIVE.ROUTE} component={Administrative} />
    <Redirect to={ROUTES.WELCOME.ROUTE} />
  </Switch>
</Layout>;

export default memo(App);
