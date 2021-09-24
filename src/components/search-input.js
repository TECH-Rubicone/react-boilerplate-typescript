import React from 'react';
import { Button, Form, Input, InputGroup, InputGroupAddon } from 'reactstrap';

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

  const handleInputClear = event => {
    onInputClear();
    onInputApply(value);
  };

  const onSubmit = event => {
    event.preventDefault();
    onInputApply(value);
  };

  return <Form onSubmit={onSubmit} className="d-flex flex-grow-1 mr-2">
    <InputGroup>
      {value && <InputGroupAddon addonType="prepend">
        <Button color="danger" disabled={false} onClick={handleInputClear}>X</Button>
      </InputGroupAddon>}
      <Input
        type="text"
        name="search"
        value={value}
        disabled={disabled}
        placeholder={placeholder}
        onKeyDown={handleKeyDown}
        onChange={handleInputChange}
      />
      {value && <InputGroupAddon addonType="append">
        <Button type="submit" color="success" disabled={false}>S</Button>
      </InputGroupAddon>}
    </InputGroup>
  </Form>;
};

export default SearchInput;
