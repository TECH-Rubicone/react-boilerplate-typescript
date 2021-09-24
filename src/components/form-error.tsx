// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

// outsource dependencies
import { Alert } from 'reactstrap';
import React, { memo } from 'react';

// services
import _ from 'services/lodash.service';

interface IFormError {
  errors: any,
  name: string,
  children?: React.ReactNode | React.ReactChild,
}

const FormError: React.FC<IFormError> = memo(({ name, errors, children }) => _.isString(_.get(errors, name))
  ? <Alert color="danger"> { _.get(errors, name) } </Alert>
  : children);

export default FormError;
