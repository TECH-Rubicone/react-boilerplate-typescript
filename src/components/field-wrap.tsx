// outsource dependencies
import cx from 'classnames';
import React, { memo } from 'react';
import { FormFeedback, FormGroup, FormText, Label } from 'reactstrap';

interface FieldWrap {
  id: string;
  valid: boolean;
  invalid: boolean;
  success?: string;
  className?: string;
  description?: string;
  error?: string | null;
  classNameLabel?: string;
  label?: React.ReactNode | React.ReactChild;
  children: React.ReactNode | React.ReactChild;
  explanation?: React.ReactNode | React.ReactChild | string;
}

// Show description, label and form error using prepared components
const FieldWrap: React.FC<FieldWrap> = props => {
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

export default memo(FieldWrap);
