// outsource dependencies
import React, { memo } from 'react';
import { Checkbox, CheckboxProps, FormControlLabel, FormGroup } from '@mui/material';

interface FCheckboxProps extends CheckboxProps {
  type: string,
  name: string,
  label: string,
  checked: boolean,
}

const FCheckbox: React.FC<FCheckboxProps> = (props) => {
  const { label, ...rest } = props;
  return <FormGroup>
    <FormControlLabel control={<Checkbox {...rest}/>} label={label} />
  </FormGroup>;
};

export default memo(FCheckbox);
