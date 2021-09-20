// outsource dependencies
import { useField } from 'formik';
import PropTypes from 'prop-types';
import React, { memo } from 'react';
import { CustomInput, Label } from 'reactstrap';

// local dependencies
import FieldWrap from './field-wrap';

const FToggler = props => {
  const {
    disabled, label, skipTouch, success, description, explanation, classNameFormGroup, classNameLabel, name
  } = props;
  const [field, meta] = useField(name);
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
    <Label for={field.name} check>
      <CustomInput
        type="switch"
        id={field.name}
        disabled={disabled}
        checked={Boolean(field.value)}
        {...field}
        valid={valid}
        invalid={invalid}
      />
    </Label>
  </FieldWrap>;
};

FToggler.propTypes = {
  label: PropTypes.element,
  disabled: PropTypes.bool,
  success: PropTypes.string,
  skipTouch: PropTypes.bool,
  description: PropTypes.string,
  explanation: PropTypes.string,
  classNameLabel: PropTypes.string,
  name: PropTypes.string.isRequired,
  classNameFormGroup: PropTypes.string,
};
FToggler.defaultProps = {
  label: null,
  success: null,
  disabled: false,
  skipTouch: false,
  description: null,
  explanation: null,
  classNameLabel: '',
  classNameFormGroup: '',
};

export default memo(FToggler);
