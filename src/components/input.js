// outsource dependencies
import { useField } from 'formik';
import PropTypes from 'prop-types';
import { Input } from 'reactstrap';
import React, { memo } from 'react';

// local dependencies
import FieldWrap from './field-wrap';

const FInput = props => {
  const {
    label, skipTouch, success, description, explanation, classNameLabel,
    classNameFormGroup, name, type, addonPrepend, addonAppend, ...attr
  } = props;
  const [field, meta] = useField({ name, type, });
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const valid = (skipTouch || meta.touched) && !meta.error;

  return <FieldWrap
    label={label}
    valid={valid}
    id={field.name}
    invalid={invalid}
    success={success}
    description={description}
    explanation={explanation}
    className={classNameFormGroup}
    classNameLabel={classNameLabel}
    error={skipTouch || meta.touched ? meta.error : null}
  >
    { addonPrepend }
    <Input
      {...field}
      {...attr}
      type={type}
      valid={valid}
      id={field.name}
      invalid={invalid}
      value={field.value ?? ''}
    />
    { addonAppend }
  </FieldWrap>;
};

FInput.propTypes = {
  type: PropTypes.string,
  label: PropTypes.element,
  success: PropTypes.string,
  skipTouch: PropTypes.bool,
  explanation: PropTypes.string,
  description: PropTypes.string,
  addonAppend: PropTypes.element,
  addonPrepend: PropTypes.element,
  classNameLabel: PropTypes.string,
  name: PropTypes.string.isRequired,
  classNameFormGroup: PropTypes.string,
};
FInput.defaultProps = {
  label: null,
  success: null,
  type: 'string',
  skipTouch: false,
  description: null,
  explanation: null,
  addonAppend: null,
  addonPrepend: null,
  classNameLabel: '',
  classNameFormGroup: '',
};

export default memo(FInput);
