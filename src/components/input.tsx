// outsource dependencies
import { useField } from 'formik';
import { Input, CSSModule } from 'reactstrap';
import { InputType } from 'reactstrap/es/Input';
import React, { memo, ReactChild, ReactNode, FC, InputHTMLAttributes } from 'react';

// local dependencies
import FieldWrap from './field-wrap';

interface FInputProps extends InputHTMLAttributes<HTMLInputElement> {
  id?: string,
  name: string,
  success?: string,
  type?: InputType,
  skipTouch?: boolean,
  explanation?: string,
  description?: string,
  cssModule?: CSSModule,
  classNameLabel?: string,
  classNameFormGroup?: string,
  label?: ReactChild | ReactNode,
  addonAppend?: ReactChild | ReactNode,
  addonPrepend?: ReactChild | ReactNode,
}

const FInput: FC<FInputProps> = props => {
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
