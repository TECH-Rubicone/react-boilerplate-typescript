// outsource dependencies
import React, { memo } from 'react';
import { useControllerActions, useControllerData } from 'redux-saga-controller';

// components

// constants

// local dependencies
import { controller } from './controller';

const Actions = () => {
  const {} = useControllerData(controller);
  const {} = useControllerActions(controller);

  // const handleInputClear = useCallback(() => updateCtrl({ name: '' }), [updateCtrl]);
  // const handleInputChange = useCallback(name => updateCtrl({ name }), [updateCtrl]);


  return <h1>Actions</h1>;
};

export default memo(Actions);
