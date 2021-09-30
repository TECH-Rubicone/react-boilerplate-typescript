// outsource libraries
import React, { memo } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// local dependencies
import Welcome from './welcome';
import Layout from './layout';
import Administrative from './administrative';

// constants
import * as ROUTES from 'constants/routes';

const App = () => <Layout>
  <Switch>
    <Route path={ROUTES.WELCOME.ROUTE} component={Welcome} />
    <Route path={ROUTES.ADMINISTRATIVE.ROUTE} component={Administrative} />
    <Redirect to={ROUTES.WELCOME.ROUTE} />
  </Switch>
</Layout>;

export default memo(App);
