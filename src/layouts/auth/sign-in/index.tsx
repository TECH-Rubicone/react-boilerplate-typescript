// outsource dependencies
import { Formik, FormikErrors } from 'formik';
import React, { memo, useCallback } from 'react';
import { useController } from 'redux-saga-controller';
import { Button, Col, Container, Form, Row } from 'reactstrap';

// local dependencies
import controller from './controller';
import FInput from 'components/input';

interface FormValues {
  username: string,
  password: string,
}

function validate (values: FormValues) {
  const errors: FormikErrors<FormValues> = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.username)
  ) {
    errors.username = 'Invalid email address';
  }
  if (!values.password) {
    errors.password = 'Required';
  }
  return errors;
}

const SignIn = () => {
  const [{ initialValues, disabled }, { signIn }] = useController(controller);

  const onSubmit = useCallback((values, { setSubmitting }) => {
    signIn(values);
    setSubmitting(disabled);
  },
  [signIn, disabled]
  );

  return <Formik initialValues={initialValues} validate={validate} onSubmit={onSubmit}>
    { ({ handleSubmit, isSubmitting }) => <Form onSubmit={handleSubmit} className="d-flex align-items-center justify-content-center h-100 bg-secondary">
      <Container fluid style={{ width: '300px', maxWidth: '80%' }} className="bg-white">
        <Row>
          <Col md="12">
            <Row className="h-100">
              <Col xs="12" className="text-center pt-3 mb-3">
                <h3 className="pt-1 text-center text-primary">
                  BOILERPLATE
                </h3>
              </Col>
              <Col xs={{ size: 10, offset: 1 }}>
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
                <Button block outline type="submit" color="primary" className="mb-3" disabled={isSubmitting}>
                  <span>LOGIN</span>
                </Button>
              </Col>
              <Col xs="12" className="text-center mb-3">
                Forgot password
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Form> }
  </Formik>;
};

export default memo(SignIn);
