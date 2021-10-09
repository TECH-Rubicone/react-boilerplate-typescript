// outsource libraries
import React, { memo } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

// constants
import * as ROUTES from 'constants/routes';

// local dependencies
import Ingredients from './ingredients';
import Supplements from './supplements';

const DSLD = () => <Switch>
  <Route path={ROUTES.CLIENT_DSLD_INGREDIENTS.ROUTE} component={Ingredients} />
  <Route path={ROUTES.CLIENT_DSLD_SUPPLEMENTS.ROUTE} component={Supplements} />
  <Redirect to={ROUTES.CLIENT_DSLD_SUPPLEMENTS.LINK()} />
</Switch>;

export default memo(DSLD);
