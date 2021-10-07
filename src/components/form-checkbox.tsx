// outsource dependencies
import { useField } from 'formik';
import React, { memo } from 'react';
import { SxProps } from '@mui/system';
import { Checkbox, CheckboxProps, FormControlLabel, FormHelperText, Theme } from '@mui/material';

interface FCheckboxProps extends CheckboxProps {
  name: string
  label?: string
  skipTouch?: boolean
  sx?: SxProps<Theme>
  labelPlacement?: string
}

const FCheckbox: React.FC<FCheckboxProps> = ({ label, skipTouch, name, ...attr }) => {
  const [field, meta] = useField({ name });
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  return <><FormControlLabel label={label} control={<Checkbox {...attr} {...field} />}/>
    { invalid && <FormHelperText color="error" sx={{ color: 'error.main', m: 0, pb: 2 }}>
      { meta.error }
    </FormHelperText> }
  </>;
};

export default memo(FCheckbox);
