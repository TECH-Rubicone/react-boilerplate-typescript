// outsource libraries
import React, { memo } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// local dependencies
import Test from './test';
import Welcome from './welcome';
import * as ROUTES from 'constants/routes';

const App = () => <Switch>
  <Route path={ROUTES.LAYOUT_TEST} component={Test} />
  <Route path={ROUTES.LAYOUT_WELCOME} component={Welcome} />
  <Redirect to={ROUTES.LAYOUT_WELCOME} />
</Switch>;

export default memo(App);
