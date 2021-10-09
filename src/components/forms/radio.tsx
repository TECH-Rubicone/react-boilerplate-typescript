// outsource dependencies
import { useField } from 'formik';
import React, { memo, useMemo } from 'react';
import { FormControl, FormControlLabel, FormLabel, RadioGroup, Radio, FormHelperText, RadioGroupProps } from '@mui/material';

// interfaces
import { AnyObject } from 'interfaces/common';

// local dependencies
import { validationStyles } from './helpers';

interface FRadioProps extends RadioGroupProps {
  name: string
  required?: boolean
  fullWidth?: boolean
  skipTouch?: boolean
  label?: React.ReactNode
  options: Array<AnyObject>
  getOptionLabel: (value: AnyObject) => string | number | null
  getOptionValue: (value: AnyObject) => string | number | null
  getFieldValue: (value: AnyObject) => AnyObject | string | number | null
  prepareFormValue: (value: AnyObject) => AnyObject | string | number | boolean | null
}

const FRadio: React.FC<FRadioProps> = props => {
  const {
    name, skipTouch, required, options, label, fullWidth,
    getFieldValue, prepareFormValue, getOptionValue, getOptionLabel,
  } = props;
  const [field, meta, { setValue }] = useField(name);
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const list = useMemo(() => options.map(item => {
    // Field value
    const value = getOptionValue(item);
    const fieldValue = getFieldValue(field.value);
    const label = getOptionLabel(item);
    // Form value
    const formValue = prepareFormValue(item);
    return {
      value,
      label,
      id: `${name}-${value}`,
      checked: value === fieldValue,
      onChange: () => setValue(formValue),
    };
  }), [options, getOptionValue, getFieldValue, field.value, getOptionLabel, prepareFormValue, name, setValue]);

  return <FormControl fullWidth={fullWidth} required={required} component="fieldset" error={meta.touched && Boolean(meta.error)}>
    <FormLabel color={validationStyles(valid, invalid)} component="legend">{ label }</FormLabel>
    <RadioGroup name={field.name}>
      { (list ?? []).map(item => <FormControlLabel
        key={item.id}
        {...field}
        control={<Radio color={validationStyles(valid, invalid)} />}
        {...item}
      />) }
    </RadioGroup>
    { invalid && <FormHelperText error>{ meta.error }</FormHelperText> }
  </FormControl>;
};

export default memo(FRadio);
