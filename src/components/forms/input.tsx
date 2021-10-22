// outsource dependencies
import { useField } from 'formik';
import React, { memo } from 'react';
import { TextField, TextFieldProps, InputBaseComponentProps } from '@mui/material';

// local dependencies
import { validationStyles } from './helpers';

type FInputProps = TextFieldProps & {
  name: string
  skipTouch?: boolean
  InputProps?: (valid: boolean, invalid: boolean) => InputBaseComponentProps
}

const FInput: React.FC<FInputProps> = props => {
  const { name, type, label, InputProps = () => ({}), skipTouch, ...attr } = props;
  const [field, meta] = useField({ name, type });
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  return <TextField
    {...attr}
    {...field}
    type={type}
    label={label}
    id={field.name}
    error={invalid}
    focused={meta.touched}
    value={field.value ?? ''}
    autoComplete={field.value}
    InputProps={InputProps(valid, invalid)}
    helperText={meta.touched && meta.error}
    color={validationStyles(valid, invalid)}
  />;
};

export default memo(FInput);
