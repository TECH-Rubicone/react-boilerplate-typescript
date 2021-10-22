// outsource dependencies
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import { Link as RouterLink } from 'react-router-dom';
import { useController } from 'redux-saga-controller';
import React, { memo, useEffect, useCallback, useMemo, useState } from 'react';
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon } from '@mui/icons-material';
import { Paper, Button, CircularProgress, Typography, Link, Grid, InputAdornment, IconButton } from '@mui/material';

// components
import FInput from 'components/forms/input';
import AlertError from 'components/alert-error';
import { validationStyles } from 'components/forms/helpers';

// constants
import * as ROUTES from 'constants/routes';

// local dependencies
import { controller } from './controller';

const SignIn = () => {
  const [
    { initialized, disabled, errorMessage, initialValues },
    { updateCtrl, clearCtrl, signIn, initialize }
  ] = useController(controller);

  const { t } = useTranslation();

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
  const onSubmit = useCallback(values => { signIn(values); }, [signIn]);
  const clearError = useCallback(() => { updateCtrl({ errorMessage: '' }); }, [updateCtrl]);
  const handleToggleHidePassword = useCallback(() => setIsPasswordHidden(!isPasswordHidden), [isPasswordHidden]);

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
                  fullWidth
                  type="text"
                  name="username"
                  margin="normal"
                  label={t('forms.label.email')}
                  placeholder={t('forms.placeholder.email')}
                />
              </Grid>
              <Grid item xs={12} mb={1}>
                <FInput
                  fullWidth
                  type="password"
                  name="password"
                  margin="normal"
                  label={t('forms.label.password')}
                  placeholder={t('forms.placeholder.password')}
                  InputProps={(valid, invalid) => ({
                    endAdornment: <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleToggleHidePassword}
                        color={validationStyles(valid, invalid)}
                      >
                        { isPasswordHidden ? <VisibilityIcon /> : <VisibilityOffIcon /> }
                      </IconButton>
                    </InputAdornment>
                  })}
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
                    { t('AUTH.actions.login') }
                  </Typography>
                  { disabled && <CircularProgress color="info" size={20} /> }
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Link component={RouterLink} to={ROUTES.FORGOT_PASSWORD.LINK()} variant="body2">
                  <Typography variant="body1" align="center" pl={1}>
                    { t('AUTH.actions.forgot-password') }
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
