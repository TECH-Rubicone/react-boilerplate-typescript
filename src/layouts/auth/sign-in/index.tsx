// outsource dependencies
import * as yup from 'yup';
import { Formik, Form } from 'formik';
import { useController } from 'redux-saga-controller';
import React, { memo, useEffect, useCallback, useMemo } from 'react';
import { Button, Card, CardBody, CardFooter, CardHeader, Col, Container, Row, Spinner } from 'reactstrap';

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

  return <Container fluid className="h-100">
    <Row className="d-flex justify-content-center align-items-center h-100">
      <Col md={6} xs={12}>
        <Card>
          <CardHeader>
            <h3 className="pt-1 text-center text-primary">
              BOILERPLATE
            </h3>
          </CardHeader>
          <CardBody>
            <Formik
              onSubmit={onSubmit}
              initialValues={initialValues}
              validationSchema={validationSchema}
            >
              <Form>
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
                <Button
                  outline
                  type="submit"
                  color="primary"
                  disabled={disabled}
                  className="mb-3 w-100 d-flex align-items-center justify-content-center"
                >
                  LOGIN
                  { disabled && <Spinner size="sm" className="ml-2" /> }
                </Button>
              </Form>
            </Formik>
          </CardBody>
          <CardFooter>
            Forgot password
          </CardFooter>
        </Card>
      </Col>
    </Row>
  </Container>;
};

export default memo(SignIn);
