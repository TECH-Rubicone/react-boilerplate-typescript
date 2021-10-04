// outsource dependencies
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useController } from 'redux-saga-controller';
import React, { memo, useEffect, useCallback, useMemo } from 'react';
import { Container, Box, Card, Button, CardContent, CardActions, CircularProgress, Typography, CardHeader } from '@mui/material';

// components
import FInput from 'components/input';

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
              sx={{ color: '#29b6f6', textAlign: 'center', backgroundColor: '#eeeeee' }}
            />
            <CardContent sx={{ padding: '10px' }}>
              <FInput
                type="text"
                name="username"
                placeholder="Email Address"
                label={<strong className="required-asterisk"> Email Address </strong>}
              />
              <FInput
                type="password"
                name="password"
                placeholder="Password"
                label={<strong className="required-asterisk"> Password </strong>}
              />
            </CardContent>
            <CardActions sx={{ px: '10px', pb: '30px' }}>
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
            <CardActions sx={{ py: '15px', px: '10px', backgroundColor: '#eeeeee' }}>
              <Typography>
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
