// outsource libraries
import React, { memo } from 'react';

// local dependencies
import Test from './test';

const App = () => {
  return <div>
    <h2>App</h2>
    <Test />
  </div>;
};

export default memo(App);
