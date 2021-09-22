// outsource dependencies
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// local dependencies
import SignIn from './sign-in';
import * as ROUTES from '../../constants/routes';

const Auth = () => <Switch>
  {/*<Route path={ROUTES.SIGN_UP} component={App} />*/}
  <Route path={ROUTES.LAYOUT_SIGN_IN} component={SignIn} />
  <Redirect to={ROUTES.LAYOUT_SIGN_IN} />
</Switch>;

export default Auth;
