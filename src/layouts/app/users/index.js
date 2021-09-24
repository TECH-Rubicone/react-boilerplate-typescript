// outsource dependencies
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

// local dependencies
import ListPage from './list';
import * as ROUTES from 'constants/routes';

const Users = () => {
  return <Switch>
    <Route to={ROUTES.USERS.ROUTE} component={ListPage} />
    {/*<Route to={ROUTES.USERS.EDIT} component={List} />*/}
    <Redirect to={ROUTES.WELCOME.ROUTE} />
  </Switch>;
};

export default Users;
