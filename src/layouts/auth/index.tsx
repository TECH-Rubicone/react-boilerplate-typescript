// outsource dependencies
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// constants
import * as ROUTES from 'constants/routes';

// local dependencies
import SignIn from './sign-in';

const Auth = () => <Switch>
  <Route path={ROUTES.SIGN_IN.ROUTE} component={SignIn} />
  <Redirect to={ROUTES.SIGN_IN.ROUTE} />
</Switch>;

export default Auth;
