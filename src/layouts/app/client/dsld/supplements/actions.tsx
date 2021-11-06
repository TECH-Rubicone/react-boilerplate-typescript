// outsource dependencies
import React, { memo, useCallback } from 'react';
import { useControllerActions, useControllerData } from 'redux-saga-controller';

// local dependencies
import { controller } from './controller';

// components

// constants

const Actions = () => {
  const { } = useControllerData(controller);
  const { } = useControllerActions(controller);

  // const handleInputClear = useCallback(() => updateCtrl({ name: '' }), [updateCtrl]);
  // const handleInputChange = useCallback(name => updateCtrl({ name }), [updateCtrl]);
  //
  // const handleItemsDelete = useCallback(() => deleteItems({ selected }), [deleteItems, selected]);

  return <h1>Actions</h1>;
};

export default memo(Actions);
