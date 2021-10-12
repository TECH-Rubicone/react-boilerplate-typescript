// outsource dependencies
import { useField } from 'formik';
import { TextField } from '@mui/material';
import React, { memo, useCallback } from 'react';

// interfaces
import { AnyObject } from 'interfaces/common';

// local dependencies
import { validationStyles } from './forms/helpers';
import Select, { AsyncSelect, CustomSelectProps } from './select';

interface FSelectProps extends CustomSelectProps {
  options: Array<AnyObject>

  prepareValue: (value: AnyObject | string | number) => AnyObject | null
  getFieldValue: (value: AnyObject) => AnyObject | string | number | null
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
    name, prepareValue, skipTouch, required, label, getFieldValue, ...attr
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

  return <Select
    {...attr}
    name={name}
    onChange={onChange}
    onBlur={field.onBlur}
    id={`select-${name}`}
    error={invalid && meta.error}
    value={getValue(field.value, prepareValue!)}
    renderInput={params => <TextField
      {...params}
      name={name}
      label={label}
      required={required}
      color={validationStyles(valid!, invalid!)}
    />}
  />;
};

FSelect.defaultProps = {
  required: false,
  disabled: false,
  fullWidth: false,
  skipTouch: false,
  getFieldValue: ({ value }) => value,
  getOptionLabel: ({ label }) => label,
  prepareValue: value => ({ value, label: value }),
};

export default memo(FSelect);

interface FAsyncSelectProps extends CustomSelectProps {
  loadingText: React.ReactNode
  loadOptions: () => Promise<Array<AnyObject>>

  prepareValue: (value: AnyObject | string | number) => AnyObject | null
  getFieldValue: (value: AnyObject) => AnyObject | string | number | null
}

export const FAsyncSelect: React.FC<FAsyncSelectProps> = props => {
  const { name, prepareValue, getFieldValue, skipTouch, ...attr } = props;
  const [field, meta, { setValue }] = useField(name);

  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const onChange = useCallback((event, value) => {
    if (value) {
      setValue(getFieldValue(value));
    } else {
      setValue(value);
    }
  }, [getFieldValue, setValue]);
  return <AsyncSelect
    {...attr}
    {...field}
    error={invalid && meta.error}
    value={getValue(field.value, prepareValue!)}
    onChange={onChange}
  />;
};
