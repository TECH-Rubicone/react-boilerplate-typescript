// outsource dependencies
import React, { memo, useEffect } from 'react';
import { useController } from 'redux-saga-controller';

// components

// hooks

// local dependencies
import { controller } from './controller';

const List = () => {
  const [
    { },
    { initialize, clearCtrl },
  ] = useController(controller);


  useEffect(() => {
    initialize();
    return () => { clearCtrl(); };
  }, [clearCtrl, initialize]);

  return <h1>List index</h1>;
};

export default memo(List);
