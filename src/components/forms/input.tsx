// outsource dependencies
import { useField } from 'formik';
import React, { memo, useCallback, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';

// local dependencies
import { validationStyles } from './helpers';

type FInputProps = TextFieldProps & {
  name: string
  type: string
  label?: string
  skipTouch?: boolean
  placeholder?: string
}

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
            color="primary"
            onClick={handleClickShowPassword}
            aria-label="toggle password visibility"
          >
            { showPassword ? <VisibilityOff /> : <Visibility /> }
          </IconButton>
        </InputAdornment>
    }}
  />;
};

export default memo(FInput);
