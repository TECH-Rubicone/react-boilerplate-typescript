// outsource libraries
import React, { memo, useEffect } from 'react';
import { useController } from 'redux-saga-controller';
import { Redirect, Route, Switch } from 'react-router-dom';

// local dependencies
import App from './app';
import Auth from './auth';
import { controller } from './controller';
import Maintenance from './auth/maintenance';

// constants
import * as ROUTES from 'constants/routes';

// components
import Preloader from 'components/preloader';

const Layouts = () => {
  const [
    { initialized, health },
    { initialize, clearCtrl },
    isControllerSubscribed
  ] = useController(controller);

  useEffect(() => {
    initialize();
    return () => { clearCtrl(); };
  }, [initialize, clearCtrl]);

  if (!health) {
    return <Maintenance />;
  }

  return <Preloader active={!initialized || !isControllerSubscribed}>
    <Switch>
      <Route path={ROUTES.APP.ROUTE} component={App} />
      <Route path={ROUTES.AUTH.ROUTE} component={Auth} />
      <Redirect to={ROUTES.SIGN_IN.ROUTE} />
    </Switch>
  </Preloader>;
};

export default memo(Layouts);
