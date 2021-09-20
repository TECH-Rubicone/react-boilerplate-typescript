// outsource dependencies
import { Alert } from 'reactstrap';
import PropTypes from 'prop-types';
import React, { memo } from 'react';

// services
import _ from 'services/lodash.service';

const FormError = memo(({ name, errors, children }) => _.isString(_.get(errors, name))
  ? <Alert color="danger"> { _.get(errors, name) } </Alert>
  : children);

FormError.propTypes = {
  children: PropTypes.node,
  name: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired,
};

FormError.defaultProps = {
  children: null,
};

export default FormError;
