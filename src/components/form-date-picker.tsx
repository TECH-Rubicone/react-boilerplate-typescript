// outsource dependencies
import moment from 'moment';
import { useField } from 'formik';
import DateAdapter from '@mui/lab/AdapterMoment';
import React, { memo, useCallback } from 'react';
import { Stack, TextField } from '@mui/material';
import { validationStyles } from './forms/helpers';
import { useControllerActions } from 'redux-saga-controller';
import { controller } from '../layouts/auth/sign-in/controller';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';

interface FDatePickerProps {
  name: string
  label: string
  skipTouch?: boolean
  inputFormat: string
  outputFormat: string
  toolbarFormat?: string
}

const FDatePicker: React.FC<FDatePickerProps> = props => {
  const { label, name, inputFormat, skipTouch, outputFormat } = props;
  const { updateCtrl } = useControllerActions(controller);
  const [field, meta, helpers] = useField({ name });
  const { setValue } = helpers;
  const valid = (skipTouch || meta.touched) && !meta.error;
  const invalid = (skipTouch || meta.touched) && !!meta.error;
  const handleChange = useCallback(
    (newValue: Date | null) => {
      const userDate = moment(newValue).format(inputFormat);
      setValue(userDate);
      updateCtrl({ outputFormat });
    }, [inputFormat, outputFormat, setValue, updateCtrl]);
  return <LocalizationProvider dateAdapter={DateAdapter}>
    <Stack spacing={3}>
      <DesktopDatePicker
        label={label}
        value={field.value}
        onChange={handleChange}
        inputFormat={inputFormat}
        InputAdornmentProps={{
          position: 'end',
          sx: { position: 'absolute', right: 0, pr: 3 }
        }}
        OpenPickerButtonProps={{ color: validationStyles(valid, invalid) }}
        renderInput={params => <TextField
          {...params}
          {...field}
          error={invalid}
          focused={meta.touched}
          helperText={meta.touched && meta.error}
          color={validationStyles(valid, invalid)}
        />
        }
      />
    </Stack>
  </LocalizationProvider>;
};

export default memo(FDatePicker);
