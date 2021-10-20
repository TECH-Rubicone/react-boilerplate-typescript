// outsource dependencies
import React, { memo } from 'react';
import { Switch, Route, Redirect, useLocation } from 'react-router-dom';

// constants
import * as ROUTES from 'constants/routes';

// local dependencies
import ProfileInfo from './profile-info';
import ProfileSettings from './profile-settings';

const Profile = () => {
  const location = useLocation();
  return <Switch>
    <Route path={ROUTES.ADMINISTRATIVE_PROFILE_INFO.ROUTE} component={ProfileInfo} />
    <Route path={ROUTES.ADMINISTRATIVE_PROFILE_SETTINGS.ROUTE} component={ProfileSettings} />
    <Redirect to={{ pathname: ROUTES.ADMINISTRATIVE_USERS_LIST.LINK(), state: { from: location } }}/>
  </Switch>;
};

export default memo(Profile);
