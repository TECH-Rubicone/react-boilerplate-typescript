// outsource dependencies
import { useField } from 'formik';
import React, { memo, useCallback, useMemo } from 'react';

// interfaces
import { AnyObject } from 'interfaces/common';

// local dependencies
import { validationStyles } from './forms/helpers';
import Select, { AsyncSelect, AsyncSelectProps, SelectProps } from './select';

interface FSelectProps extends SelectProps {
  prepareValue: (value: AnyObject | string | number) => AnyObject | null
  getFieldValue: (value: AnyObject) => AnyObject | string | number | null
}

type PrepareValue = (value: AnyObject | string | number) => AnyObject | null;

const getValue = (value: AnyObject, prepareValue: PrepareValue) => value ? prepareValue(value) : value;

const FSelect: React.FC<FSelectProps> = ({ name, prepareValue, skipTouch, getFieldValue, ...attr }) => {
  const [field, meta, { setValue }] = useField(name);
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const color = useMemo(() => validationStyles(valid, invalid), [valid, invalid]);
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
    color={color}
    onChange={onChange}
    onBlur={field.onBlur}
    focused={meta.touched}
    error={invalid && meta.error}
    value={getValue(field.value, prepareValue!)}
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

interface FAsyncSelectProps extends AsyncSelectProps {
  prepareValue: (value: AnyObject | string | number) => AnyObject | null
  getFieldValue: (value: AnyObject) => AnyObject | string | number | null
}

export const FAsyncSelect: React.FC<FAsyncSelectProps> = memo(props => {
  const { name, prepareValue, getFieldValue, skipTouch, ...attr } = props;
  const [field, meta, { setValue }] = useField(name);
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const color = useMemo(() => validationStyles(valid, invalid), [valid, invalid]);
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
    color={color}
    onChange={onChange}
    focused={meta.touched}
    error={invalid && meta.error}
    value={getValue(field.value, prepareValue!)}
  />;
});
