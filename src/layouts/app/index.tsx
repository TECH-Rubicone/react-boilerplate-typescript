// outsource libraries
import React, { memo } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// local dependencies
import Test from './test';
import Users from './users/list';
import Welcome from './welcome';
import * as ROUTES from 'constants/routes';
import { useControllerData } from 'redux-saga-controller';
import controller, { IUser } from 'layouts/controller';

const App = () => {
  // it is a root controller
  const { user }: {user: IUser} = useControllerData(controller);
  /*if (!user) {
    return null;
  }*/
  return <Switch>
    <Route path={ROUTES.TEST.ROUTE} component={Test} />
    <Route path={ROUTES.WELCOME.ROUTE} component={Welcome} />
    <Route path={ROUTES.USERS.ROUTE} component={Users} />
    <Redirect to={ROUTES.WELCOME.ROUTE} />
  </Switch>;
};

export default memo(App);
