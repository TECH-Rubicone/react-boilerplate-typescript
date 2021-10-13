// outsource dependencies
import { useField } from 'formik';
import React, { memo, useCallback, useMemo } from 'react';

// interfaces
import { AnyObject } from 'interfaces/common';

// local dependencies
import { validationStyles } from './forms/helpers';
import Select, { AsyncSelect, AsyncSelectProps, SelectProps } from './select';

type ValueMethods = {
  prepareValue: (value: AnyObject | string | number) => AnyObject | null
  getFieldValue: (value: AnyObject) => AnyObject | string | number | null
}

type FSelectProps = SelectProps & ValueMethods;

const FSelect: React.FC<FSelectProps> = ({ name, prepareValue, skipTouch, getFieldValue, ...attr }) => {
  const [field, meta, { setValue }] = useField(name);
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const onChange = useCallback((event, value) => {
    if (value) {
      setValue(getFieldValue(value));
    } else {
      setValue(null);
    }
  }, [getFieldValue, setValue]);

  return <Select
    {...attr}
    name={name}
    onChange={onChange}
    onBlur={field.onBlur}
    focused={meta.touched}
    error={invalid && meta.error}
    color={validationStyles(valid, invalid)}
    value={field.value ? prepareValue(field.value) : null}
  />;
};

export default memo(FSelect);

type FAsyncSelectProps = AsyncSelectProps & ValueMethods;

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
    value={field.value ? prepareValue(field.value) : null}
  />;
});
