// outsource dependencies
import React from 'react';
import { InputBase, IconButton, Paper } from '@mui/material';

// local dependencies
import { FasIcon } from './fas-icon';

const SearchInput = ({ value, onInputChange, onInputClear, onInputApply, placeholder, disabled }) => {
  const handleInputChange = event => {
    event.preventDefault();
    const value = event.target.value;
    onInputChange(value);
    if (!value) {
      onInputApply('');
    }
  };

  const handleKeyDown = event => {
    if (event.keyCode === 27 && value) {
      onInputClear();
    } else if (event.keyCode === 13 && value) {
      onInputApply(value);
    }
  };

  const handleInputClear = () => {
    onInputClear();
    onInputApply(value);
  };

  const onSubmit = event => {
    event.preventDefault();
    onInputApply(value);
  };

  return <Paper
    onSubmit={onSubmit}
    component="form"
    sx={{ p: '4px 8px', display: 'flex', alignItems: 'center' }}
  >
    { value && <IconButton size="small" variant="outlined" disabled={disabled} onClick={handleInputClear}>
      <FasIcon icon="times" />
    </IconButton> }
    <InputBase
      type="text"
      name="search"
      value={value}
      label="Search"
      color="primary"
      sx={{ ml: 1, flex: 1 }}
      disabled={disabled}
      placeholder={placeholder}
      onKeyDown={handleKeyDown}
      onChange={handleInputChange}
    />
    { value && <IconButton size="small" type="submit" variant="outlined" disabled={disabled}>
      <FasIcon icon="search" />
    </IconButton> }
  </Paper>;
};

export default SearchInput;
