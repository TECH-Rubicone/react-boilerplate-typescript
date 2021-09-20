
// outsource dependencies
import cx from 'classnames';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { FormFeedback, FormGroup, FormText, Label } from 'reactstrap';

// Show description, label and form error using prepared components
const FieldWrap = props => {
  const {
    success, error, description, explanation, label, className, valid, invalid, id, children, classNameLabel
  } = props;
  return <FormGroup className={className}>
    { label && <Label for={id} className={cx({ 'text-success': valid, 'text-danger': invalid }, classNameLabel)}>
      { label }
    </Label> }
    { explanation && <FormText> { explanation } </FormText> }
    { children }
    { invalid && <FormFeedback id={id} className="d-block">
      { error }
    </FormFeedback> }
    { valid && <FormFeedback id={id} valid={valid}>{ success }</FormFeedback> }
    { description && <FormText> { description } </FormText> }
  </FormGroup>;
};

FieldWrap.propTypes = {
  label: PropTypes.node,
  error: PropTypes.string,
  success: PropTypes.string,
  className: PropTypes.string,
  description: PropTypes.string,
  explanation: PropTypes.string,
  id: PropTypes.string.isRequired,
  classNameLabel: PropTypes.string,
  valid: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
};

FieldWrap.defaultProps = {
  label: null,
  error: '',
  success: '',
  className: '',
  description: '',
  explanation: '',
  classNameLabel: '',
};

export default memo(FieldWrap);
