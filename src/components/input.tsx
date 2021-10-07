// outsource dependencies
import { useField } from 'formik';
import React, { memo, useState } from 'react';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField, TextFieldProps } from '@mui/material';

type FInputProps = TextFieldProps & {
  id: string
  name: string
  type: string
  label?: string
  skipTouch?: boolean
  placeholder?: string
  classNameField?: string
}

interface State {
  showPassword: boolean
}

const validationStyles = (valid: boolean, invalid: boolean) => {
  if (valid === invalid) {
    return 'primary';
  } else if (valid) {
    return 'success';
  } else if (invalid) {
    return 'error';
  }
};

const FInput: React.FC<FInputProps> = props => {
  const { name, type, label, skipTouch, ...attr } = props;
  const [field, meta] = useField({ name, type });
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const [values, setValues] = useState<State>({ showPassword: false });
  const handleClickShowPassword = () => setValues({ showPassword: !values.showPassword });
  return <TextField
    fullWidth
    {...attr}
    {...field}
    label={label}
    margin="normal"
    id={field.name}
    error={invalid}
    autoComplete={field.value}
    helperText={meta.touched && meta.error}
    color={validationStyles(valid, invalid)}
    type={type !== 'password' ? type : values.showPassword ? 'text' : 'password'}
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
            {values.showPassword ? <VisibilityOff /> : <Visibility />}
          </IconButton>
        </InputAdornment> } }
  />;
};

export default memo(FInput);
