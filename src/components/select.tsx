// outsource dependencies
import { useField } from 'formik';
import React, { memo, useCallback } from 'react';
import { Autocomplete, FormControl, FormHelperText, TextField } from '@mui/material';

// local dependencies
import { validationStyles } from './forms/helpers';

// interfaces
import { AnyObject } from 'interfaces/common';

export interface SelectProps {
  name: string
  disabled?: boolean
  required?: boolean
  fullWidth?: boolean
  skipTouch?: boolean
  label: React.ReactNode
  size?: 'small' | 'medium'
  getOptionLabel?: (option: AnyObject) => string
  prepareValue: (value: AnyObject) => AnyObject | string | number | null
}

interface FSelectProps extends SelectProps {
  options: Array<AnyObject>
}

const FSelect: React.FC<FSelectProps> = props => {
  const {
    name, getOptionLabel, prepareValue, skipTouch,
    disabled, fullWidth, required, size, options, label
  } = props;

  const [field, meta, { setValue }] = useField(name);
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const onChange = useCallback((event, value) => { setValue(prepareValue(value)); }, [prepareValue, setValue]);

  return <FormControl fullWidth={fullWidth} color={validationStyles(valid, invalid)}>
    <Autocomplete
      getOptionLabel={getOptionLabel}
      id={`select-${name}`}
      disabled={disabled}
      options={options}
      size={size}
      {...field}
      onChange={onChange}
      renderInput={params => <TextField
        {...params}
        name={name}
        label={label}
        required={required}
        color={validationStyles(valid, invalid)}
      />}
    />
    { invalid && <FormHelperText error>{ meta.error }</FormHelperText> }
  </FormControl>;
};

export default memo(FSelect);

FSelect.defaultProps = {
  size: 'small',
  required: false,
  disabled: false,
  fullWidth: false,
  skipTouch: false,
  getOptionLabel: ({ label }) => label,
};
