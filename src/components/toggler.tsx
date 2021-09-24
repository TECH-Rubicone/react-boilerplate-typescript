// outsource dependencies
import { useField } from 'formik';
import React, { memo } from 'react';
import { CustomInput, Label } from 'reactstrap';

// local dependencies
import FieldWrap from './field-wrap';

interface FToggler {
  name: string;
  disabled?: boolean;
  success?: string;
  skipTouch?: boolean;
  description?: string;
  explanation?: string;
  classNameLabel?: string;
  classNameFormGroup?: string;
  label?: React.ReactNode | React.ReactChild;
}

const FToggler: React.FC<FToggler> = props => {
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

export default memo(FToggler);
