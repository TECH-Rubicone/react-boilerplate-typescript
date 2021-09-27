// outsource dependencies
import _ from 'lodash';
import moment, { Moment } from 'moment';
import React, { memo, useCallback, useMemo } from 'react';
import { CustomInput, FormGroup, Label } from 'reactstrap';
import { useControllerActions, useControllerData } from 'redux-saga-controller';

// local dependencies
import { controller, User, TRole } from './controller';

const ListRow: React.FC<User> = ({ id, name, roles, createdDate }) => {
  const { disabled, selectedUsers, users } = useControllerData(controller);
  const { updateCtrl } = useControllerActions(controller);

  const preparedDate: Moment | null = useMemo(() => moment(createdDate, 'YYYY-MM-DD').isValid() ? moment(createdDate) : null, [createdDate]);

  const uid = `select${id}`;

  const isChecked = useMemo(() => Boolean(_.find(selectedUsers, { id })), [selectedUsers]);

  const toggleSelection = useCallback(event => {
    // NOTE a temporary variable to store selectedUsers
    let selected = null;
    if (event.target.checked) {
      const user: User = _.find(users, { id })!;
      selected = selectedUsers.concat(user);
    } else {
      selected = selectedUsers.filter((user: User) => user.id !== id);
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
      {name || 'Undefined Name'}
    </td>
    <td>{id}</td>
    <td>{preparedDate!.format('L')}</td>
    <td>{(roles ?? []).map((item: TRole) => item?.name)}</td>
    <td>e / d</td>
  </tr>;
};

export default memo(ListRow);
