// outsource dependencies
import { useField } from 'formik';
import React, { memo } from 'react';
import { TextField } from '@mui/material';

interface FormInputProps {
  id: string,
  name: string,
  type: string,
  label: string,
  placeholder: string,
  skipTouch?: boolean,
  classNameField?: string,
}

const FormInput: React.FC<FormInputProps> = props => {
  const { name, type, label, skipTouch, classNameField, placeholder } = props;
  const [field, meta] = useField({ name, type, });
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  return <TextField
    fullWidth
    type={type}
    size="small"
    label={label}
    id={field.name}
    error={invalid}
    name={field.name}
    value={field.value}
    onBlur={field.onBlur}
    onChange={field.onChange}
    placeholder={placeholder}
    className={classNameField}
    autoComplete={field.value}
    helperText={meta.touched && meta.error}
    color={valid || !!field.value ? 'success' : invalid || !field.value ? 'error' : 'primary'}
  />;
};

export default memo(FormInput);
