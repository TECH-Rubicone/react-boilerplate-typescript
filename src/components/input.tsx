// outsource dependencies
import { useField } from 'formik';
import { Input } from 'reactstrap';
import React, { memo } from 'react';
import { InputType } from 'reactstrap/es/Input';

// local dependencies
import FieldWrap from './field-wrap';

interface IFInputProps {
  type?: InputType,
  name: string,
  success?: string,
  skipTouch?: boolean,
  explanation?: string,
  description?: string,
  placeholder?: string,
  classNameLabel?: string,
  classNameFormGroup?: string,
  label?: React.ReactChild | React.ReactNode,
  addonAppend?: React.ReactChild | React.ReactNode,
  addonPrepend?: React.ReactChild | React.ReactNode,
}

const FInput: React.FC<IFInputProps> = props => {
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

export default memo(FInput);
