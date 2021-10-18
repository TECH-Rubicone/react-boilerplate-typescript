// outsource dependencies
import { toast } from 'react-toastify';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Autocomplete, CircularProgress, Grid, TextField, Typography, AutocompleteProps } from '@mui/material';

// interfaces
import { AnyObject } from 'interfaces/common';

// local dependencies
import { ValidationColor } from './forms/helpers';

interface DefaultSelectProps extends Omit<AutocompleteProps<AnyObject, boolean, boolean, boolean>, 'renderInput' | 'options'> {
  focused?: boolean
  label: React.ReactNode
  color?: ValidationColor
}

type SyncProps = {
  options: Array<AnyObject>
}

type AsyncProps = {
  loadOptions: (search: string) => Promise<Array<AnyObject>>
}

export type SelectProps = DefaultSelectProps & SyncProps;
export type AsyncSelectProps = DefaultSelectProps & AsyncProps;

const Select: React.FC<SelectProps> = ({ focused, color, label, ...attr }) => {
  return <Autocomplete
    {...attr}
    renderInput={params => <TextField
      {...params}
      label={label}
      color={color}
      focused={focused}
    />}
  />;
};

export default memo(Select);

export const AsyncSelect: React.FC<AsyncSelectProps> = ({ loadOptions, loadingText, label, ...attr }) => {
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [list, setList] = useState<Array<AnyObject>>([]);
  const [isSubscribed, setIsSubscribed] = useState<boolean>(true);

  const handleInput = useCallback((event, value) => setSearch(value), []);

  const handleLoadOptions = useCallback(async () => {
    setLoading(true);
    try {
      const data = await loadOptions(search);
      if (isSubscribed) {
        setList(data);
      }
    } catch ({ message }) {
      toast(String(message), { delay: 500, theme: 'light', toastId: 'ERROR', closeOnClick: true, });
    }
    setLoading(false);
  }, [loadOptions, search, isSubscribed]);

  useEffect(() => {
    handleLoadOptions();
    return () => { setIsSubscribed(false); };
  }, [handleLoadOptions]);

  return <Select
    {...attr}
    label={label}
    options={list}
    loading={loading}
    onInputChange={handleInput}
    loadingText={<Grid container>
      <CircularProgress color="inherit" size={20} />
      <Typography component="span" ml={1}>
        { loadingText }
      </Typography>
    </Grid>}
  />;
};
