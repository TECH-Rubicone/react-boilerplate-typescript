// outsource dependencies
import _ from 'lodash';
import { useField } from 'formik';
import { SxProps } from '@mui/system';
import React, { memo, useMemo } from 'react';
import { Checkbox, CheckboxProps, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Theme } from '@mui/material';

// interfaces
import { AnyObject } from 'interfaces/common';
import { validationStyles } from './helpers';

type Item = AnyObject | string | number | boolean | null;

interface FCheckboxProps extends CheckboxProps {
  name: string
  label?: string
  skipTouch?: boolean
  sx?: SxProps<Theme>
  options: Array<AnyObject>
  labelPlacement?: string
  getOptionLabel: (value: AnyObject) => string | number | null
  getOptionValue: (value: AnyObject) => string | number | null
  // getFieldValue: (value: AnyObject) => AnyObject | string | number | null
  prepareFormValue: (value: AnyObject) => Item
}

const FCheckbox: React.FC<FCheckboxProps> = props => {
  const { prepareFormValue, getOptionLabel, getOptionValue, options, label, skipTouch, name, ...attr } = props;
  const [field, meta, { setValue }] = useField({ name });
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;

  const list = useMemo(() => options.map(item => {
    // NOTE Field value
    const value = getOptionValue(item); // id
    const label = getOptionLabel(item); // label
    // NOTE Form value
    const formValue = prepareFormValue(item);
    // NOTE is checked or no
    const isExist = !!_.find<Item>(field.value, formValue);
    return {
      value,
      label,
      id: `${name}-${value}`,
      checked: isExist,
      onChange: () => {
        if (isExist) {
          setValue((field.value ?? []).filter((item: Item) => !_.isEqual(item, formValue)));
        } else {
          setValue([...(field.value ?? []), formValue]);
        }
      },
    };
  }), [options, getOptionValue, field.value, getOptionLabel, prepareFormValue, name, setValue]);

  return <FormControl component="fieldset" variant="standard">
    <FormLabel color={validationStyles(valid, invalid)} component="legend">{ label }</FormLabel>
    <FormGroup>
      { list.map(item => <FormControlLabel
        key={item.id}
        {...field}
        control={<Checkbox color={validationStyles(valid, invalid)} checked={item.checked} {...attr} />}
        {...item}
      />) }
    </FormGroup>
    { invalid && <FormHelperText error>{ meta.error }</FormHelperText> }
  </FormControl>;
};

export default memo(FCheckbox);
