// outsource dependencies
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useController } from 'redux-saga-controller';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import React, { memo, useEffect, useCallback, useMemo } from 'react';
import { Container, Box, Card, Button, CardContent, CardActions, CircularProgress, Typography, CardHeader } from '@mui/material';

// components
import FormInput from 'components/formInput';

// local dependencies
import { controller } from './controller';

// configure
// TODO Add alert error for errorMessage
// TODO Add i18next

const SignIn = () => {
  const [
    { initialized, disabled, errorMessage, initialValues },
    { signIn, initialize }
  ] = useController(controller);
  useEffect(() => { initialize(); }, [initialize]);
  const validationSchema = useMemo(() => yup.object().shape({
    username: yup.string()
      .required('VALIDATION_ERROR.REQUIRED_FIELD')
      .email('VALIDATION_ERROR.INVALID_EMAIL'),
    password: yup.string()
      .required('VALIDATION_ERROR.REQUIRED_FIELD')
      .min(8, 'VALIDATION_ERROR.MIN_LENGTH_CHARACTERS')
  }), []);

  const onSubmit = useCallback(values => {
    signIn(values);
  }, [signIn, disabled]);

  const login = 'LOGIN';

  return <Container sx={{ height: '100%' }} maxWidth="sm">
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <Card>
            <CardHeader
              title="BOILERPLATE"
            />
            <CardContent>
              <FormInput
                id="username"
                type="text"
                name="username"
                label="Email Address"
                classNameField="pb-3"
                placeholder="Email Address"
              />
              <FormInput
                id="password"
                type="password"
                name="password"
                label="Password"
                classNameField="pb-3"
                placeholder="Password"
              />
            </CardContent>
            <CardActions className="mx-2">
              <Button
                type="submit"
                color="primary"
                variant="outlined"
                disabled={disabled}
                sx={{ width: '100%' }}
              >
                { disabled ? <CircularProgress size={20} sx={{ mr: '20px' }}/> : login }
              </Button>
            </CardActions>
            <CardActions className="mx-2">
              <HelpOutlineIcon color="info"/>
              <Typography variant="overline" className="pl-1" color="info.main">
                Forgot password
              </Typography>
            </CardActions>
          </Card>
        </Form>
      </Formik>
    </Box>
  </Container>;
};

export default memo(SignIn);
