// outsource dependencies
import { toast } from 'react-toastify';
import { AutocompleteProps } from '@mui/material/Autocomplete';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Autocomplete, CircularProgress, FormControl, FormHelperText, Grid, TextField, Typography } from '@mui/material';

// interfaces
import { AnyObject } from 'interfaces/common';

// local dependencies
import { ValidationColor } from './forms/helpers';

interface DefaultSelectProps extends Omit<AutocompleteProps<AnyObject, boolean, boolean, boolean>, 'renderInput' | 'options'> {
  name: string
  focused?: boolean
  required?: boolean
  skipTouch?: boolean
  label: React.ReactNode
  color?: ValidationColor
  error?: boolean | string | undefined
}

type SyncProps = {
  options: Array<AnyObject>
}

type AsyncProps = {
  loadOptions: () => Promise<Array<AnyObject>>
}

export type SelectProps = DefaultSelectProps & SyncProps;
export type AsyncSelectProps = DefaultSelectProps & AsyncProps;

const Select: React.FC<SelectProps> = ({ name, focused, fullWidth, color, error, label, ...attr }) => {
  return <FormControl fullWidth={fullWidth} color={color}>
    <Autocomplete
      {...attr}
      id={`select-${name}`}
      renderInput={params => <TextField
        {...params}
        name={name}
        label={label}
        color={color}
        focused={focused}
      />}
    />
    { error && <FormHelperText error>{ error }</FormHelperText> }
  </FormControl>;
};

export default memo(Select);

export const AsyncSelect: React.FC<AsyncSelectProps> = ({ loadOptions, loadingText, label, name, ...attr }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<Array<AnyObject>>([]);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(true);
  const handleLoadOptions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await loadOptions();
      if (isSubscribed) {
        setList(data);
        setIsSubscribed(false);
      }
    } catch ({ message }) {
      toast(String(message), { delay: 500, theme: 'light', toastId: 'ERROR', closeOnClick: true, });
    }
    setLoading(false);
  }, [loadOptions, isSubscribed, setIsSubscribed]);

  useEffect(() => {
    handleLoadOptions();
    return () => { setIsSubscribed(false); };
  }, [handleLoadOptions]);

  return <Select
    {...attr}
    name={name}
    label={label}
    options={list}
    loading={loading}
    loadingText={<Grid container>
      <CircularProgress color="inherit" size={20} />
      <Typography component="span" sx={{ ml: 1 }}>
        { loadingText }
      </Typography>
    </Grid>}
  />;
};
