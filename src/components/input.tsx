// outsource dependencies
import { useField } from 'formik';
import React, { memo, useCallback, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';

type FInputProps = TextFieldProps & {
  id: string
  name: string
  type: string
  label: string
  skipTouch?: boolean
  placeholder?: string
}

type ValidationColor = 'primary' | 'error' | 'success'

const validationStyles = (valid: boolean, invalid: boolean): ValidationColor => {
  if (valid) {
    return 'success';
  } else if (invalid) {
    return 'error';
  }
  return 'primary';
};

const FInput: React.FC<FInputProps> = props => {
  const { name, type, label, skipTouch, ...attr } = props;
  const [field, meta] = useField({ name, type });
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = useCallback(() => setShowPassword(!showPassword), [showPassword]);
  return <TextField
    {...attr}
    {...field}
    fullWidth
    label={label}
    margin="normal"
    id={field.name}
    error={invalid}
    autoComplete={field.value}
    helperText={meta.touched && meta.error}
    color={validationStyles(valid, invalid)}
    type={type !== 'password' ? type : showPassword ? 'text' : 'password'}
    InputProps={{
      sx: { p: 0 },
      endAdornment: field.name === 'password'
        && <InputAdornment position="end" sx={{ position: 'absolute', right: 0, pr: 3 }}>
          <IconButton
            edge="end"
            onClick={handleClickShowPassword}
            aria-label="toggle password visibility"
            color={validationStyles(valid, invalid)}
          >
            { showPassword ? <VisibilityOff /> : <Visibility /> }
          </IconButton>
        </InputAdornment>
    }}
  />;
};

export default memo(FInput);
