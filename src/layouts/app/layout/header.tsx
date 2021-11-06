// outsource dependencies
import React, { useCallback } from 'react';
import { useControllerActions, useControllerData } from 'redux-saga-controller';
// local dependencies
import { controller } from '../controller';

const Header = () => {
  const { open } = useControllerData(controller);
  const { updateCtrl } = useControllerActions(controller);

  const handleOpen = useCallback(() => updateCtrl({ open: true }), [updateCtrl]);

  return <h1>Header</h1>;
};

export default Header;
