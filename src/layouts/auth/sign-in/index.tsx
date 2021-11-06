// outsource dependencies
import * as yup from 'yup';
import { useController } from 'redux-saga-controller';
import React, { memo, useEffect, useMemo, useState } from 'react';

// components

// constants

// local dependencies
import { controller } from './controller';

const SignIn = () => {
  const [
    {},
    { clearCtrl, initialize }
  ] = useController(controller);

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  useEffect(() => {
    initialize();
    return () => { clearCtrl(); };
  }, [clearCtrl, initialize]);
  const validationSchema = useMemo(() => yup.object().shape({
    username: yup.string()
      .required('VALIDATION_ERROR.REQUIRED_FIELD')
      .email('VALIDATION_ERROR.INVALID_EMAIL'),
    password: yup.string()
      .required('VALIDATION_ERROR.REQUIRED_FIELD')
      .min(8, 'VALIDATION_ERROR.MIN_LENGTH_CHARACTERS'),
  }), []);
  // const onSubmit = useCallback(values => { signIn(values); }, [signIn]);
  // const clearError = useCallback(() => { updateCtrl({ errorMessage: '' }); }, [updateCtrl]);
  // const handleToggleHidePassword = useCallback(() => setIsPasswordHidden(!isPasswordHidden), [isPasswordHidden]);

  return <h1>Sign in page</h1>;
};

export default memo(SignIn);
