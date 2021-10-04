// outsource dependencies
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useController } from 'redux-saga-controller';
import React, { memo, useEffect, useCallback, useMemo } from 'react';
import { HelpOutline as HelpOutlineIcon, LockOutlined as LockOutlinedIcon } from '@mui/icons-material';
import { Container, Box, Avatar, Button, Checkbox, CircularProgress, FormControlLabel, Typography, Link, Grid } from '@mui/material';

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
    { signIn, initialize, updateCtrl }
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
  const [checked, setChecked] = React.useState(false);
  const onSubmit = useCallback(values => {
    signIn(values);
    updateCtrl({ checked });
  }, [signIn, disabled]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  return <Container sx={{ height: '100%' }} maxWidth="sm">
    <Box sx={{
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <Formik
        onSubmit={onSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        <Form>
          <Grid
            container
            spacing={1}
            direction="column"
            justifyContent="center"
          >
            <Grid item >
              <Avatar sx={{ mx: 'auto', mb: 2, bgcolor: 'info.main', textAlign: 'center' }}>
                <LockOutlinedIcon/>
              </Avatar>
              <Typography variant="h5" gutterBottom component="div" textAlign="center">
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
              <FormControlLabel
                name="checkbox"
                label="Remember me"
                control={
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                  />
                }
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={disabled}
                sx={{ width: '100%' }}
              >
                { disabled ? <CircularProgress size={20} sx={{ mr: '20px' }}/> : 'Login' }
              </Button>
            </Grid>
            <Grid item xs={6} textAlign="left">
              <Link href="#" variant="body2">
                <HelpOutlineIcon color="info"/>
                <Typography variant="overline" pl={1} color="info.main">
                  Forgot password
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Box>
  </Container>;
};

export default memo(SignIn);
