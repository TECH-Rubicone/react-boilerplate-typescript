// outsource dependencies
import { useField } from 'formik';
import React, { memo } from 'react';
import { TextField, TextFieldProps } from '@mui/material';

type FInputProps = TextFieldProps & {
  id: string,
  name: string,
  type: string,
  label: string,
  skipTouch?: boolean,
  placeholder: string,
  classNameField?: string,
}

const FInput: React.FC<FInputProps> = props => {
  const { name, type, label, skipTouch, ...rest } = props;
  const [field, meta] = useField({ name, type });
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  return <TextField
    fullWidth
    {...rest}
    {...field}
    type={type}
    label={label}
    margin="normal"
    id={field.name}
    error={invalid}
    autoComplete={field.value}
    helperText={meta.touched && meta.error}
    color={valid === invalid ? 'primary' : valid ? 'success' : 'error'}
  />;
};

export default memo(FInput);
