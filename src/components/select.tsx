// outsource dependencies
import { toast } from 'react-toastify';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { Autocomplete, CircularProgress, FormControl, FormHelperText, TextField } from '@mui/material';
import { AutocompleteProps } from '@mui/material/Autocomplete';

// interfaces
import { AnyObject } from 'interfaces/common';

// local dependencies
import { ValidationColor } from './forms/helpers';

interface SelectProps extends AutocompleteProps<any, any, any, any> {
  name: string
  required?: boolean
  skipTouch?: boolean
  color?: ValidationColor
  options: Array<AnyObject>
  error?: boolean | string | undefined
}

const Select: React.FC<SelectProps> = props => {
  const { name, fullWidth, color, error, ...attr } = props;

  return <FormControl fullWidth={fullWidth} color={color}>
    <Autocomplete
      {...attr}
      id={`select-${name}`}
    />
    { error && <FormHelperText error>{ error }</FormHelperText> }
  </FormControl>;
};

export default memo(Select);

export interface CustomSelectProps {
  name: string
  loading?: boolean
  disabled?: boolean
  required?: boolean
  fullWidth?: boolean
  skipTouch?: boolean
  label: React.ReactNode
  size?: 'small' | 'medium'
  loadingText?: React.ReactNode
  value?: AnyObject | string | number | null
  getOptionLabel: (option: AnyObject) => string
}

export interface AsyncSelectProps extends CustomSelectProps {
  loadingText: React.ReactNode
  error?: boolean | string | undefined
  loadOptions: () => Promise<Array<AnyObject>>
  onChange: (event: React.SyntheticEvent, value: AnyObject) => void
}

export const AsyncSelect: React.FC<AsyncSelectProps> = props => {
  const { loadOptions, loadingText, label, name, ...attr } = props;
  const [list, setList] = useState<Array<AnyObject>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const handleLoadOptions = useCallback(async () => {
    try {
      const data = await loadOptions();
      if (loading) {
        setList(data);
        setLoading(false);
      }
    } catch ({ message }) {
      toast(String(message), { delay: 500, theme: 'light', toastId: 'ERROR', closeOnClick: true, });
    }
  }, [loadOptions, loading]);

  useEffect(() => {
    handleLoadOptions();
    return () => { setLoading(false); };
  }, [handleLoadOptions]);

  return <Select
    {...attr}
    name={name}
    options={list}
    loading={loading}
    loadingText={<><CircularProgress color="inherit" size={20} />{ loadingText }</>}
    renderInput={params => <TextField
      {...params}
      label={label}
      name={name}
    />}
  />;
};
