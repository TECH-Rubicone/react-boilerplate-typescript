// outsource dependencies
import React, { memo, useEffect } from 'react';
import { useController } from 'redux-saga-controller';

// local dependencies
import { controller } from './controller';

const List = () => {
  const [
    { initialized },
    { initialize, clearCtrl },
    isControllerSubscribed
  ] = useController(controller);

  useEffect(() => {
    initialize();
    return () => { clearCtrl(); };
  }, [initialized, clearCtrl, initialize]);

  // TODO
  if (!isControllerSubscribed && !initialized) {
    return <span>Preloader</span>;
  }

  return <h1>List</h1>;
};

export default memo(List);
