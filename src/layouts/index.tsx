// outsource libraries
import React, { memo, useEffect } from 'react';
import { useController } from 'redux-saga-controller';
import { Redirect, Route, Switch } from 'react-router-dom';

// constants
import * as ROUTES from 'constants/routes';

// local dependencies
import App from './app';
import Auth from './auth';
import { controller } from './controller';

const Layouts = () => {
  const [
    { initialized, health },
    { initialize, clearCtrl },
    isControllerConnected
  ] = useController(controller);

  useEffect(() => {
    initialize();
    return () => { clearCtrl(); };
  }, [initialize, clearCtrl]);

  if (!health) {
    return <span>Site is under Maintenance</span>;
  }
  if (!initialized || !isControllerConnected) {
    return <span>Preloader</span>;
  }

  return <Switch>
    <Route path={ROUTES.APP.ROUTE} component={App} />
    <Route path={ROUTES.AUTH.ROUTE} component={Auth} />
    <Redirect to={ROUTES.SIGN_IN.ROUTE} />
  </Switch>;
};

export default memo(Layouts);
