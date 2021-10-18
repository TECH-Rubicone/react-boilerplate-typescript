// outsource dependencies
import { useField } from 'formik';
import { FormHelperText } from '@mui/material';
import React, { memo, useCallback, useMemo } from 'react';

// interfaces
import { AnyObject } from 'interfaces/common';

// local dependencies
import { validationStyles } from './forms/helpers';
import Select, { AsyncSelect, AsyncSelectProps, SelectProps } from './select';

type prepareObject = (value: AnyObject) => AnyObject | null;
type preparePrimitive = (value: string | number) => AnyObject | null;

type ValueMethods = {
  prepareValue: preparePrimitive | prepareObject
  getFieldValue: (value: AnyObject | Array<AnyObject>) => AnyObject | Array<AnyObject> | string | number | null
}

type FSelectProps = SelectProps & ValueMethods & {
  name: string
  required?: boolean
  skipTouch?: boolean
};

const FSelect: React.FC<FSelectProps> = ({ name, prepareValue, skipTouch, getFieldValue, ...attr }) => {
  const [field, meta, { setValue, setTouched }] = useField(name);
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const color = useMemo(() => validationStyles(valid, invalid), [valid, invalid]);
  const onChange = useCallback((event, value) => {
    if (value) {
      setValue(getFieldValue(value));
    } else {
      setValue(null);
    }
  }, [getFieldValue, setValue]);

  const onBlur = useCallback(() => setTouched(true), [setTouched]);

  return <>
    <Select
      {...attr}
      {...field}
      color={color}
      onBlur={onBlur}
      onChange={onChange}
      focused={meta.touched}
      value={field.value ? prepareValue(field.value) : null}
    />
    { meta.error && <FormHelperText error>{ meta.error }</FormHelperText> }
  </>;
};

export default memo(FSelect);

type FAsyncSelectProps = AsyncSelectProps & ValueMethods & {
  name: string
  required?: boolean
  skipTouch?: boolean
};

export const FAsyncSelect: React.FC<FAsyncSelectProps> = memo(props => {
  const { name, prepareValue, getFieldValue, skipTouch, ...attr } = props;
  const [field, meta, { setValue, setTouched }] = useField(name);
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

  const onBlur = useCallback(() => setTouched(true), [setTouched]);

  return <>
    <AsyncSelect
      {...attr}
      {...field}
      color={color}
      onBlur={onBlur}
      onChange={onChange}
      focused={meta.touched}
      value={field.value ? prepareValue(field.value) : null}
    />
    { meta.error && <FormHelperText error>{ meta.error }</FormHelperText> }
  </>;
});
