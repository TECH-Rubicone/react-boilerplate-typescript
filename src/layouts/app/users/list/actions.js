// outsource dependencies
import { Link } from 'react-router-dom';
import React, { useCallback, useMemo } from 'react';
import { useControllerActions, useControllerData } from 'redux-saga-controller';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from 'reactstrap';

// local dependencies
import controller from './controller';
import { USERS, NEW_ID } from 'constants/routes';
import SearchInput from 'components/search-input';

const Actions = () => {

  const { name, size, disabled, selectedUsers } = useControllerData(controller);
  const { updateFilters, updateCtrl } = useControllerActions(controller);

  const handleInputClear = useCallback(() => updateCtrl({ name: '' }), [updateCtrl]);
  const handleInputChange = useCallback(name => updateCtrl({ name }), [updateCtrl]);
  const handleInputApply = useCallback(() => updateFilters(), []);

  const SIZES = useMemo(
    () => [10, 15, 30, 50].map(size => ({ item: size, onChangeSize: () => updateFilters({ size }) })),
    [updateFilters]
  );

  return <div className="d-flex justify-content-between">
    <SearchInput
      value={name}
      disabled={disabled}
      placeholder="Search..."
      onInputClear={handleInputClear}
      onInputApply={handleInputApply}
      onInputChange={handleInputChange}
    />
    <div className="mr-2">
      <UncontrolledDropdown>
        <DropdownToggle caret disabled={disabled}>
          {size}
        </DropdownToggle>
        <DropdownMenu>
          {SIZES.map(({ item, onChangeSize }) =>
            <DropdownItem key={item} onClick={onChangeSize} disabled={item === size || disabled}>
              {item} items
            </DropdownItem>
          )}
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
    <div className="d-flex flex-grow-1 mr-2">
      {/*separator*/}
    </div>
    <div className="mr-2">
      <UncontrolledDropdown>
        <DropdownToggle caret disabled={disabled}>
          List Actions
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem disabled={!selectedUsers.length}>
            Remove
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </div>
    <Link to={USERS.LINK_EDIT(NEW_ID)} className="btn btn-success">
      +
      Create User
    </Link>
  </div>;
};

export default Actions;
