// outsource dependencies
import { useField } from 'formik';
import React, { memo } from 'react';
import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';

interface FCheckboxProps extends CheckboxProps {
  name: string,
  label?: string,
}

const FCheckbox: React.FC<FCheckboxProps> = ({ label, name, ...attr }) => {
  const [field, meta] = useField({ name });
  return <FormControlLabel control={<Checkbox {...attr} {...field} onChange={field.onChange}/>} label={label} />;
};

export default memo(FCheckbox);
