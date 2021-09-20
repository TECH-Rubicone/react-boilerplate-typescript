// outsource libraries
import React, { memo } from 'react';
import { Route, Switch } from 'react-router-dom';

// local dependencies
import Test from './test';
import * as ROUTES from '../../constants/routes';

const App = () => {
  return <div>
    <h2>App</h2>
    <Switch>
      <Route path={ROUTES.LAYOUT_TEST} component={Test} />
      {/*<Redirect to={ROUTES.LAYOUT_TEST} />*/}
    </Switch>
  </div>;
};

export default memo(App);
