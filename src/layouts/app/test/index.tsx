// outsource dependencies
import React, { memo, useEffect } from 'react';
import { useController } from 'redux-saga-controller';

// local dependencies
import { controller } from './controller';

const Test = () => {
  const [
    { },
    { initialize, clearCtrl },
  ] = useController(controller);

  useEffect(() => {
    initialize();
    return () => { clearCtrl(); };
  }, [clearCtrl, initialize]);

  return <h1>Test page</h1>;
};

export default memo(Test);
