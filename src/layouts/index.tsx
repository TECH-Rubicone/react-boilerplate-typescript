// outsource libraries
import React, { memo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// local dependencies
import App from './app';
import Auth from './auth';
import * as ROUTES from 'constants/routes';

const Layouts = () => <Switch>
  <Route path={ROUTES.LAYOUT_APP} component={App} />
  <Route path={ROUTES.LAYOUT_AUTH} component={Auth} />
  <Redirect to={ROUTES.LAYOUT_WELCOME} />
</Switch>;

export default memo(Layouts);
