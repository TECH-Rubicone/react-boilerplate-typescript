// outsource dependencies
import { useField } from 'formik';
import React, { memo, useCallback } from 'react';
import { Stack, TextField } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';

interface FDatePickerProps {
  name: string
  label?: string
  inputFormat: string
  skipTouch?: boolean
  toolbarFormat?: string
}

type ValidationColor = 'primary' | 'error' | 'success'

const validationStyles = (valid: boolean, invalid: boolean): ValidationColor => {
  if (valid) {
    return 'success';
  } else if (invalid) {
    return 'error';
  }
  return 'primary';
};

const FDatePicker: React.FC<FDatePickerProps> = props => {
  const { label, name, inputFormat, skipTouch } = props;
  const [field, meta, helpers] = useField({ name });
  const maxDate = new Date();
  const { setValue } = helpers;
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const handleChange = useCallback((newValue: Date | null) => setValue(newValue), [setValue]);
  return <LocalizationProvider dateAdapter={AdapterDateFns}>
    <Stack spacing={3}>
      <DesktopDatePicker
        label={label}
        maxDate={maxDate}
        value={field.value}
        onChange={handleChange}
        inputFormat={inputFormat}
        InputAdornmentProps={{
          position: 'end',
          sx: { position: 'absolute', right: 0, pr: 3 }
        }}
        renderInput={params => <TextField
          {...params}
          {...field}
          error={invalid}
          helperText={meta.touched && meta.error}
          color={validationStyles(valid, invalid)}
        />
        }
      />
    </Stack>
  </LocalizationProvider>;
};

export default memo(FDatePicker);
