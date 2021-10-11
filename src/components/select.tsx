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
  loading?: boolean
  disabled?: boolean
  required?: boolean
  fullWidth?: boolean
  skipTouch?: boolean
  label: React.ReactNode
  size?: 'small' | 'medium'
  loadingText?: React.ReactNode
  getOptionLabel?: (option: AnyObject) => string
  prepareValue: (value: AnyObject | string | number) => AnyObject | null
  getFieldValue: (value: AnyObject) => AnyObject | string | number | null
}

interface FSelectProps extends SelectProps {
  options: Array<AnyObject>
}

type PrepareValue = (value: AnyObject | string | number) => AnyObject | null;

const getValue = (value: AnyObject, prepareValue: PrepareValue) => {
  if (typeof value === 'undefined' || value === null) {
    return value;
  }
  return prepareValue(value);
};

const FSelect: React.FC<FSelectProps> = props => {
  const {
    name, getOptionLabel, prepareValue, skipTouch, loading, loadingText,
    disabled, fullWidth, required, size, options, label, getFieldValue,
  } = props;

  const [field, meta, { setValue }] = useField(name);
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const onChange = useCallback((event, value) => {
    if (value) {
      setValue(getFieldValue(value));
    } else {
      setValue(value);
    }
  }, [getFieldValue, setValue]);

  return <FormControl fullWidth={fullWidth} color={validationStyles(valid, invalid)}>
    <Autocomplete
      getOptionLabel={getOptionLabel}
      loadingText={loadingText}
      id={`select-${name}`}
      disabled={disabled}
      loading={loading}
      options={options}
      size={size}
      onChange={onChange}
      value={getValue(field.value, prepareValue)}
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
  getFieldValue: ({ value }) => value,
  getOptionLabel: ({ label }) => label,
};
