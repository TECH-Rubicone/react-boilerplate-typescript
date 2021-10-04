// outsource dependencies
import { useField } from 'formik';
import React, { FC, memo, useCallback, useMemo } from 'react';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, FormHelperText } from '@mui/material';

interface Property {
  valid?: boolean
  inline?: boolean
  htmlFor?: string
  invalid?: boolean
  id: string | number
  value: string | number
  label?: React.ReactNode
}

interface FRadioProps {
  name: string
  success?: string
  skipTouch?: boolean
  description?: string
  classNameFormGroup?: string
  options: Array<Partial<Property>>
  label?: React.ReactNode | React.ReactChild
  getOptionValue: (value: Partial<Property>) => string
  getOptionLabel: (value: Partial<Property>) => string
  explanation?: React.ReactNode | React.ReactChild | string
}

const FRadio: FC<FRadioProps> = ({ options, label, getOptionValue, getOptionLabel, ...props }) => {
  const [field, meta, { setValue }] = useField(props);
  const onChange = useCallback(event => setValue(event.target.value), [setValue]);

  const list = useMemo(() => options.map(item => ({
    ...props,
    value: getOptionValue(item),
    label: getOptionLabel(item),
    id: `${props.name}-${getOptionValue(item)}`,
    checked: getOptionValue(item) === field.value,
  })), [props, field.value, getOptionLabel, getOptionValue, options]);

  return <FormControl component="fieldset" error={meta.touched && Boolean(meta.error)}>
    <FormLabel component="legend">{ label }</FormLabel>
    <RadioGroup
      name={field.name}
      value={meta.value}
      onChange={onChange}
    >
      { (list ?? []).map(item => <FormControlLabel
        {...field}
        key={item.value}
        control={<Radio />}
        {...item}
      />) }
    </RadioGroup>
    { meta.error && <FormHelperText>{ meta.error }</FormHelperText> }
  </FormControl>;
};

export default memo(FRadio);
