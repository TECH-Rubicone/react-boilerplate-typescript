// outsource dependencies
import moment from 'moment';
import { useField } from 'formik';
import DateAdapter from '@mui/lab/AdapterMoment';
import React, { memo, useCallback } from 'react';
import { Stack, TextField } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';

// local dependencies
import { validationStyles } from './forms/helpers';
import { DesktopDatePickerProps } from '@mui/lab/DesktopDatePicker/DesktopDatePicker';

interface FDatePickerProps extends DesktopDatePickerProps {
  name: string
  label: string
  skipTouch?: boolean
  inputFormat: string
  toolbarFormat?: string
}

type FDP = Omit<FDatePickerProps, 'onChange' | 'value' | 'renderInput'>;

const FDatePicker: React.FC<FDP> = props => {
  const { label, name, inputFormat, skipTouch } = props;
  const [field, meta, { setValue }] = useField({ name });
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const valueDate = moment(field.value).toDate();
  const handleChange = useCallback(
    (newValue: Date | null) => {
      if (moment(newValue).isValid()) {
        const userDate = moment(newValue).format(inputFormat);
        setValue(userDate);
      } else {
        setValue(newValue);
      }
    }, [inputFormat, setValue]);
  return <LocalizationProvider dateAdapter={DateAdapter}>
    <Stack spacing={3}>
      <DesktopDatePicker
        label={label}
        value={valueDate}
        onChange={handleChange}
        inputFormat={inputFormat}
        OpenPickerButtonProps={{ color: validationStyles(valid, invalid) }}
        renderInput={params => <TextField
          {...params}
          {...field}
          error={invalid}
          focused={meta.touched}
          helperText={meta.touched && meta.error}
          color={validationStyles(valid, invalid)}
        />}
      />
    </Stack>
  </LocalizationProvider>;
};

export default memo(FDatePicker);
