// outsource libraries
import React, { memo } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// local dependencies
import App from './app';
import Auth from './auth';
import * as ROUTES from '../constants/routes';

const Layouts = () => {
  return <Switch>
    <Route path={ROUTES.LAYOUT_APP} component={App} />
    <Route path={ROUTES.LAYOUT_AUTH} component={Auth} />
    <Redirect to={ROUTES.LAYOUT_AUTH} />
  </Switch>;
};

export default memo(Layouts);
