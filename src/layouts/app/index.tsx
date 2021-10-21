// outsource libraries
import React, { memo, useEffect } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { useControllerActions, useControllerData } from 'redux-saga-controller';

// local dependencies
import MENU from './menu';
import Test from './test';
import Client from './client';
import Welcome from './welcome';
import { controller } from '../controller';
import Administrative from './administrative';
import Layout, { ItemByTypeProps } from './layout';

// constants
import * as ROUTES from 'constants/routes';

const App = () => {
  const { auth } = useControllerData(controller);
  const { getSelfExecutor } = useControllerActions(controller);
  useEffect(() => {
    if (auth) { getSelfExecutor(); }
  }, [auth, getSelfExecutor]);
  if (!auth) { return <Redirect to={ROUTES.SIGN_IN.ROUTE} />; }
  return <Layout menu={MENU as Array<ItemByTypeProps>}>
    <Switch>
      <Route path={ROUTES.TEST.ROUTE} component={Test}/>
      <Route path={ROUTES.CLIENT.ROUTE} component={Client}/>
      <Route path={ROUTES.WELCOME.ROUTE} component={Welcome}/>
      <Route path={ROUTES.ADMINISTRATIVE.ROUTE} component={Administrative}/>
    </Switch>
  </Layout>;
};

export default memo(App);
