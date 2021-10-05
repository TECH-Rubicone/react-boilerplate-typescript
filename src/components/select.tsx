// outsource dependencies
import { useField } from 'formik';
import React, { FC, useCallback, useState } from 'react';
import { CircularProgress, Autocomplete, TextField, FormHelperText } from '@mui/material';

interface FSelectProps {
  name: string
  label?: React.ReactNode
  loadOptions: () => Promise<any>
  size?: 'small' | 'medium' | undefined
  getOptionLabel: (value: any) => string,
}

export const FASelect: FC<FSelectProps> = ({ label, loadOptions, size = 'small', getOptionLabel, ...props }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [list, setList] = useState([]);
  const loading = open && list.length === 0;

  const [field, meta, { setValue }] = useField(props);

  const onChange = useCallback(
    (_, item) => item ? setValue(item) : setValue(null),
    [setValue]
  );

  const load = useCallback(() => {
    setOpen(true);
    loadOptions().then(data => setList(data)).catch(({ message }) => console.error(message));
  }, [loadOptions]);

  const onClose = useCallback(() => setOpen(false), [setOpen]);
  return <>
    <Autocomplete
      open={open}
      onOpen={load}
      options={list}
      onClose={onClose}
      loading={loading}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField
          {...params}
          size={size}
          label={label}
          error={meta.touched && Boolean(meta.error)}
          InputProps={{
            ...params.InputProps,
            endAdornment: <>
              { loading ? <CircularProgress color="inherit" size={20} /> : null }
              { params.InputProps.endAdornment }
            </>
          }}
        />
      )}
      {...field}
      onChange={onChange}
    />
    { meta.error && <FormHelperText>{ meta.error }</FormHelperText> }
  </>;
};
