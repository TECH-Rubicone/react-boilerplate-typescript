// outsource dependencies
import { useField } from 'formik';
import React, { memo } from 'react';
import { FormControlLabel, FormHelperText, Switch, SwitchProps } from '@mui/material';

// local dependencies
import { validationStyles } from './forms/helpers';

interface FSwitchProps extends SwitchProps {
  name: string
  skipTouch?: boolean
  label: React.ReactNode
}

const FSwitch: React.FC<FSwitchProps> = props => {
  const { name, skipTouch, label, ...attr } = props;
  const [field, meta] = useField({ name });
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  return <>
    <FormControlLabel
      label={label}
      control={<Switch color={validationStyles(valid, invalid)} {...field} {...attr}/>}
    />
    { invalid && <FormHelperText sx={{ color: 'error.main', m: 0, pb: 2 }}>
      { meta.error }
    </FormHelperText> }
  </>;
};

export default memo(FSwitch);
