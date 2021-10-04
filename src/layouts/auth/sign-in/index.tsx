// outsource dependencies
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useController } from 'redux-saga-controller';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import React, { memo, useEffect, useCallback, useMemo } from 'react';
import { Container, Box, Button, CircularProgress, Typography, CardHeader, Card, CardContent, CardActions } from '@mui/material';

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
              color="primary.main"
            />
            <CardContent>
              <FormInput
                type="text"
                name="username"
                id={'username'}
                label="Email Address"
                classNameField="pb-4"
                placeholder="Email Address"
              />
              <FormInput
                id="password"
                name="password"
                type="password"
                label="Password"
                classNameField="pb-4"
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
                { disabled ? <CircularProgress size={20} sx={{ mr: '20px' }}/> : 'LOGIN' }
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
