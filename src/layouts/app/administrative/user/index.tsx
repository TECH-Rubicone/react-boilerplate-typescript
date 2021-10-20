// outsource dependencies
import React, { memo } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

// constants
import * as ROUTES from 'constants/routes';

// local dependencies
import Profile from './profile';
import Settings from './settings';

const User = () => {
  const location = useLocation();
  return <Switch>
    <Route path={ROUTES.ADMINISTRATIVE_USER_PROFILE.ROUTE} component={Profile} />
    <Route path={ROUTES.ADMINISTRATIVE_USER_SETTINGS.ROUTE} component={Settings} />
    <Redirect to={{ pathname: ROUTES.ADMINISTRATIVE_USERS_LIST.LINK(), state: { from: location } }}/>
  </Switch>;
};

export default memo(User);
