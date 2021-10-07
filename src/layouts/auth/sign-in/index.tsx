// outsource dependencies
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useController } from 'redux-saga-controller';
import React, { memo, useEffect, useCallback, useMemo } from 'react';
import { Paper, Avatar, Stack, Button, CircularProgress, Typography, Link, Grid } from '@mui/material';
import { HelpOutline as HelpOutlineIcon, LockOutlined as LockOutlinedIcon } from '@mui/icons-material';

// components
import FInput from 'components/input';
import FCheckbox from 'components/form-checkbox';

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
      .min(8, 'VALIDATION_ERROR.MIN_LENGTH_CHARACTERS'),
    checked: yup.boolean()
      .required('VALIDATION_ERROR.REQUIRED_FIELD')
      .oneOf([true], 'VALIDATION_ERROR.SHOULD_BE_CHECKED'),
  }), []);

  const onSubmit = useCallback(values => {
    signIn(values);
  }, [signIn]);

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
              <Grid item>
                <Stack direction="row" spacing={2} justifyContent="center" alignItems="center">
                  <Avatar sx={{ bgcolor: 'info.main' }}>
                    <LockOutlinedIcon/>
                  </Avatar>
                </Stack>
                <Typography variant="h5" gutterBottom component="div" textAlign="center" mt={1}>
                    BOILERPLATE
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
              <Grid item xs={12}>
                <FInput
                  id="password"
                  type="password"
                  name="password"
                  label="Password"
                  placeholder="Password"
                />
              </Grid>
              <Grid item xs={12}>
                <FCheckbox
                  name="checked"
                  label="Remember me"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  fullWidth
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={disabled}
                >
                  { disabled ? <CircularProgress size={20}/> : 'LOGIN' }
                </Button>
              </Grid>
              <Grid item xs={6} textAlign="left" pt={1}>
                <Link href="#" variant="body2">
                  <HelpOutlineIcon color="info"/>
                  <Typography variant="overline" pl={1} color="info.main">
                      Forgot password
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
