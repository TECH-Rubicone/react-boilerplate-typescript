// outsource dependencies
import React, { memo } from 'react';
import { Switch, Route, useLocation, Redirect } from 'react-router-dom';

// constants
import * as ROUTES from 'constants/routes';

// local dependencies
import List from './list';
import Edit from './edit';

const Users = () => {
  const location = useLocation();
  return <Switch>
    <Route path={ROUTES.ADMINISTRATIVE_USERS_LIST.ROUTE} component={List} />
    <Route path={ROUTES.ADMINISTRATIVE_USERS_EDIT.ROUTE} component={Edit} />
    <Redirect to={{ pathname: ROUTES.ADMINISTRATIVE_USERS_LIST.LINK(), state: { from: location } }}/>
  </Switch>;
};

export default memo(Users);
