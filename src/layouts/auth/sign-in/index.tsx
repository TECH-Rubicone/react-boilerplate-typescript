// outsource dependencies
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { Link as RouterLink } from 'react-router-dom';
import { useController } from 'redux-saga-controller';
import React, { memo, useEffect, useCallback, useMemo } from 'react';
import { Paper, Button, CircularProgress, Typography, Link, Grid } from '@mui/material';

// components
import FInput from 'components/forms/input';
import AlertError from 'components/alert-error';
import FDatePicker from '../../../components/form-date-picker';

// constants

import * as ROUTES from 'constants/routes';
// local dependencies
import { controller } from './controller';
import moment from 'moment';

const SignIn = () => {
  const [
    { initialized, disabled, errorMessage, initialValues, outputFormat },
    { updateCtrl, clearCtrl, signIn, initialize }
  ] = useController(controller);
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
    userDate: yup.date()
      .nullable()
      .typeError('Invalid Date')
      .required('VALIDATION_ERROR.REQUIRED_FIELD')
  }), []);
  const onSubmit = useCallback(values => {
    const userDate = moment(values.userDate).format(outputFormat);
    signIn({ ...values, userDate });
  }, [outputFormat, signIn]);
  const clearError = useCallback(() => { updateCtrl({ errorMessage: '' }); }, [updateCtrl]);

  return <Grid
    m="auto"
    container
    maxWidth="sm"
    display="flex"
    minHeight="100vh"
    alignItems="center"
    justifyContent="center"
  >
    <Grid item xs={12}>
      <Paper elevation={3}>
        <Grid item xs={12} p={4}>
          <Formik
            onSubmit={onSubmit}
            initialValues={initialValues}
            validationSchema={validationSchema}
          >
            <Form>
              <Grid item xs={12} mb={1}>
                <Typography variant="h5" textAlign="center">
                  Boilerplate
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FInput
                  type="text"
                  id="username"
                  name="username"
                  label="Email Address"
                  placeholder="Email Address"
                />
              </Grid>
              <Grid item xs={12} mb={1}>
                <FInput
                  id="password"
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Password"
                />
              </Grid>
              <Grid item xs={12} mb={1}>
                <FDatePicker
                  name="userDate"
                  inputFormat="MM/DD/YYYY"
                  outputFormat="YYYY-MM-DD"
                  label="Add your birthday"
                />
              </Grid>
              { errorMessage && <Grid item xs={12} mb={1}>
                <AlertError title="Error" onClose={clearError}>
                  { errorMessage }
                </AlertError>
              </Grid> }
              <Grid item xs={12} mb={2}>
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={disabled || !initialized}
                >
                  <Typography variant="body1" mr={1}>
                    Login
                  </Typography>
                  { disabled && <CircularProgress color="info" size={20} /> }
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Link component={RouterLink} to={ROUTES.FORGOT_PASSWORD.LINK()} variant="body2">
                  <Typography variant="body1" align="center" pl={1}>
                      Forgot password?
                  </Typography>
                </Link>
              </Grid>
            </Form>
          </Formik>
        </Grid>
      </Paper>
    </Grid>
  </Grid>;
};

export default memo(SignIn);
