// outsource dependencies
import React, { memo, useEffect } from 'react';
import { useController } from 'redux-saga-controller';

// local dependencies
import { controller } from './controller';

const Edit = () => {
  const [
    { },
    { initialize, clearCtrl },
  ] = useController(controller);

  useEffect(() => {
    initialize();
    return () => { clearCtrl(); };
  }, [clearCtrl, initialize]);

  return <h1>Edit page</h1>;
};

export default memo(Edit);
