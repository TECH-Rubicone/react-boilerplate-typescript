// outsource dependencies
import { useField } from 'formik';
import React, { memo, useCallback, useMemo } from 'react';
import { AutocompleteProps } from '@mui/material/Autocomplete';
import { Autocomplete, FormControl, FormHelperText } from '@mui/material';

// local dependencies
// interfaces
import { AnyObject } from 'interfaces/common';

interface FSelect extends AutocompleteProps<any, boolean, boolean, boolean> {
  name: string
  prepareValue?: (value: AnyObject) => AnyObject | string | number | null
}

const FSelect: React.FC<FSelect> = props => {
  const {
    name, getOptionLabel, prepareValue,
    disabled, fullWidth, options, renderInput, ...attr
  } = props;
  const [field, meta, { setValue }] = useField(name);
  const onChange = useCallback((event, value) => {
    // NOTE check this condition
    if (prepareValue) {
      setValue(prepareValue(value));
    }
  }, [prepareValue, setValue]);

  const error = useMemo(() => meta.touched && Boolean(meta.error), [meta.error, meta.touched]);
  return <FormControl fullWidth={fullWidth}>
    <Autocomplete
      getOptionLabel={getOptionLabel}
      id={`select-${name}`}
      disabled={disabled}
      options={options}
      {...attr}
      {...field}
      onChange={onChange}
      renderInput={renderInput}
    />
    { error && <FormHelperText>{ meta.error }</FormHelperText> }
  </FormControl>;
};

export default memo(FSelect);

FSelect.defaultProps = {
  size: 'small',
  disabled: false,
  fullWidth: false,
  prepareValue: value => value,
  getOptionLabel: ({ label }) => label,
};
