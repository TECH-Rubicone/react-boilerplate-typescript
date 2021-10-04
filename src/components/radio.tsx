// outsource dependencies
import { useField } from 'formik';
import React, { FC, memo, useMemo } from 'react';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, FormHelperText } from '@mui/material';

interface Property {
  id: string | number
  value: string | number
  label?: React.ReactNode
}

interface FRadioProps {
  name: string
  label?: React.ReactNode
  options: Array<Property>
  getValue: (value: string) => string
  getOptionValue: (value: Property) => string
  getOptionLabel: (value: Property) => string
  prepareValue: (value: Property | string) => Property | string
}

const FRadio: FC<FRadioProps> = ({
  options,
  label,
  getValue,
  prepareValue,
  getOptionValue,
  getOptionLabel,
  ...props
}) => {
  const [field, meta, { setValue }] = useField(props);
  const list = useMemo(() => options.map((item: Property) => {
    const value = getOptionValue(item);
    const label = getOptionLabel(item);
    const preparedValue = prepareValue(item);
    const fieldValue = getValue(field.value);
    return {
      ...props,
      value,
      label,
      id: `${props.name}-${value}`,
      checked: value === fieldValue,
      onChange: () => setValue(preparedValue),
    };
  }), [options, getOptionValue, getOptionLabel, prepareValue, props, getValue, field.value, setValue]);

  return <FormControl component="fieldset" error={meta.touched && Boolean(meta.error)}>
    <FormLabel component="legend">{ label }</FormLabel>
    <RadioGroup name={field.name}>
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
