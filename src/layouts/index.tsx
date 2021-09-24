// outsource libraries
import React, { memo, useEffect } from 'react';
import { useController } from 'redux-saga-controller';
import { Redirect, Route, Switch } from 'react-router-dom';

// local dependencies
import App from './app';
import Auth from './auth';
import controller from './controller';
import * as ROUTES from 'constants/routes';

const Layouts = () => {
  const [
    { initialized, health },
    { initialize, clearCtrl },
    isControllerConnected
  ] = useController(controller);

  useEffect(() => {
    initialize();
    return () => {
      clearCtrl();
    };
  }, [initialize, clearCtrl]);

  if (!health) {
    return <span>SOMETHING WENT WRONG</span>;
  }
  if (!initialized || !isControllerConnected) {
    return <span>Preloader</span>;
  }

  return <Switch>
    <Route path={ROUTES.LAYOUT_APP} component={App} />
    <Route path={ROUTES.LAYOUT_AUTH} component={Auth} />
    <Redirect to={ROUTES.SIGN_IN.ROUTE} />
  </Switch>;
};

export default memo(Layouts);
