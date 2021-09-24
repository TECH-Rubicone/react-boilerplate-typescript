// outsource dependencies
import _ from 'lodash';
import React, { memo, useCallback, useMemo } from 'react';
import { CustomInput, FormGroup, Label } from 'reactstrap';
import { useControllerActions, useControllerData } from 'redux-saga-controller';

// local dependencies
import controller from './controller';

const ListRow = ({ id, name, roles, createdDate }) => {
  const { disabled, selectedUsers, users } = useControllerData(controller);
  const { updateCtrl } = useControllerActions(controller);

  const uid = `select${id}`;

  const isChecked = useMemo(() => Boolean(_.find(selectedUsers, { id })), [selectedUsers]);

  const toggleSelection = useCallback(event => {
    // NOTE a temporary variable to store selectedUsers
    let selected = null;
    if (event.target.checked) {
      const user = _.find(users, { id });
      selected = selectedUsers.concat(user);
    } else {
      selected = selectedUsers.filter(user => user.id !== id);
    }
    updateCtrl({ selectedUsers: selected });
  }, [users, selectedUsers, updateCtrl]);

  return <tr>
    <td>
      <FormGroup inline check className="mx-2">
        <Label for="uid" check>
          <CustomInput
            id={uid}
            name={uid}
            type="checkbox"
            disabled={disabled}
            checked={isChecked}
            onChange={toggleSelection}
          />
        </Label>
      </FormGroup>
      {name}
    </td>
    <td>{id}</td>
    <td>{createdDate.format('L')}</td>
    <td>{(roles ?? []).map(item => item.name)}</td>
    <td>e / d</td>
  </tr>;
};

export default memo(ListRow);
