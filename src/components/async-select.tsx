// outsource dependencies
import { useField } from 'formik';
import React, { useCallback, useEffect, useState } from 'react';
import { AutocompleteProps } from '@mui/material/Autocomplete';
import { CircularProgress, Autocomplete, TextField, FormHelperText, FormGroup } from '@mui/material';

// <type of option, multiple, DisableClearable, FreeSolo>
interface FSelectProps extends AutocompleteProps<any, boolean, boolean, boolean> {
  name: string
  label?: React.ReactNode
  getOptionLabel: (value: any) => string
  onLoadOptions: () => Promise<Array<any>>
}

export const FASelect: React.FC<FSelectProps> = ({ label, onLoadOptions, size, getOptionLabel, ...attr }) => {
  const [open, setOpen] = useState<boolean>(false);
  const [list, setList] = useState<Array<any>>([]);

  const loading = open && list.length === 0;
  const [field, meta, { setValue }] = useField(attr.name);

  const onOpen = useCallback(() => setOpen(true), [setOpen]);
  const onClose = useCallback(() => setOpen(false), [setOpen]);
  const onChange = useCallback((event, item) => { setValue(item); }, [setValue]);

  useEffect(() => {
    onLoadOptions().then(data => setList(data)).catch(({ message }) => console.error(message));
  }, [onLoadOptions]);

  return <FormGroup>
    <Autocomplete
      {...attr}
      open={open}
      options={list}
      onOpen={onOpen}
      onClose={onClose}
      loading={loading}
      getOptionLabel={getOptionLabel}
      {...field}
      onChange={onChange}
      renderInput={params => (
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
    />
    { meta.error && <FormHelperText>{ meta.error }</FormHelperText> }
  </FormGroup>;
};

FASelect.defaultProps = {
  size: 'small',
};
