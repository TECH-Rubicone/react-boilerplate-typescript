// outsource dependencies
import { useField } from 'formik';
import React, { FC, memo, useMemo } from 'react';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, FormHelperText, RadioGroupProps } from '@mui/material';

// local dependencies
// interfaces
import { AnyObject } from 'interfaces/common';

interface FRadioProps extends RadioGroupProps {
  name: string
  required: boolean
  label?: React.ReactNode
  options: Array<AnyObject>
  parseValue: (value: AnyObject) => AnyObject | string
  getOptionLabel: (value: AnyObject) => string | number
  getOptionValue: (value: AnyObject) => string | number
  prepareValue: (value: AnyObject) => AnyObject | string
}

const FRadio: FC<FRadioProps> = props => {
  const { name, required, options, label, parseValue, prepareValue, getOptionValue, getOptionLabel } = props;
  const [field, meta, { setValue }] = useField(name);
  const list = useMemo(() => options.map(item => {
    const value = getOptionValue(item);
    const label = getOptionLabel(item);
    const preparedValue = prepareValue(item);
    const parsedValue = parseValue(field.value);
    return {
      value,
      label,
      id: `${name}-${value}`,
      checked: value === parsedValue,
      onChange: () => setValue(preparedValue),
    };
  }), [options, getOptionValue, getOptionLabel, prepareValue, props, parseValue, field.value, setValue]);

  return <FormControl required={required} component="fieldset" error={meta.touched && Boolean(meta.error)}>
    <FormLabel component="legend">{ label }</FormLabel>
    <RadioGroup name={field.name}>
      { (list ?? []).map(item => <FormControlLabel {...field} key={item.id} control={<Radio />} {...item} />) }
    </RadioGroup>
    { meta.error && <FormHelperText>{ meta.error }</FormHelperText> }
  </FormControl>;
};

export default memo(FRadio);

FRadio.defaultProps = {
  required: false,
  parseValue: value => value,
  prepareValue: value => value,
  getOptionValue: ({ value }) => value,
  getOptionLabel: ({ value }) => value,
};
