// outsource dependencies
import React, { FC, useCallback, useMemo } from 'react';
import { CircularProgress, Autocomplete, TextField, FormHelperText } from '@mui/material';
import { useField } from 'formik';
import { instanceAPI } from 'services/api.service';

interface Property {
  valid?: boolean
  inline?: boolean
  htmlFor?: string
  invalid?: boolean
  id: string | number
  value: string | number
  label?: React.ReactNode
}

interface FSelectProps {
  name: string
  label?: React.ReactNode
  size?: 'small' | 'medium' | undefined
  getOptionValue: (value: Partial<Property>) => string
  getOptionLabel: (value: Partial<Property>) => string
}

function getRoles ({ data, params }: any) {
  return instanceAPI({
    method: 'POST',
    url: 'admin-service/roles/filter',
    data: data || {},
    params: params || {},
  });
}

interface SelectValue {
  label: string
  value: string
}

const AsyncSelect: FC<FSelectProps> = ({ label, size, getOptionLabel, getOptionValue, ...props }) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const [field, meta, { setValue }] = useField(props);

  const onChange = useCallback((_, item: SelectValue) => item ? setValue(item.value) : setValue(null), [setValue]);

  const list = useMemo(() => options.map(item => ({
    label: getOptionLabel(item),
    value: getOptionValue(item),
  })), [getOptionLabel, getOptionValue, options]);

  return <>
    <Autocomplete
      id="asynchronous-demo"
      sx={{ width: 300 }}
      open={open}
      onOpen={async () => {
        setOpen(true);
        const data: any = await getRoles({ data: null, params: { page: 0, size: 15 } });
        setOptions(data.content);
      }}
      onClose={() => {
        setOpen(false);
      }}
      options={list}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          size={size}
          label={label}
          error={meta.touched && Boolean(meta.error)}
          InputProps={{
            ...params.InputProps,
            endAdornment: <>{ loading ? <CircularProgress color="inherit" size={20} /> : null } { params.InputProps.endAdornment } </>
          }}
        />
      )}
      {...field}
      onChange={onChange}
    />
    { meta.error && <FormHelperText>{ meta.error }</FormHelperText> }
  </>;
};

export default AsyncSelect;
