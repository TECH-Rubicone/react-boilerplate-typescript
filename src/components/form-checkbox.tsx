// outsource dependencies
import { useField } from 'formik';
import React, { memo } from 'react';
import { Checkbox, CheckboxProps, FormControlLabel, FormHelperText } from '@mui/material';

interface FCheckboxProps extends CheckboxProps {
  name: string
  label?: string
}

const FCheckbox: React.FC<FCheckboxProps> = ({ label, name, ...attr }) => {
  const [field, meta] = useField({ name });
  return <>
    <FormControlLabel control={<Checkbox {...attr} {...field} onChange={field.onChange}/>} label={label}/>
    { meta.touched && meta.error && <FormHelperText
      color="error"
      sx={{ color: 'error.main', m: 0, pb: 2 }}
    >
      {meta.error}
    </FormHelperText> }
  </>;
};

export default memo(FCheckbox);
