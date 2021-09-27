// outsource dependencies
import _ from 'lodash';
import moment, { Moment } from 'moment';
import { Link } from 'react-router-dom';
import React, { memo, useCallback, useMemo } from 'react';
import { CustomInput, FormGroup, Label } from 'reactstrap';
import { useControllerActions, useControllerData } from 'redux-saga-controller';

// local dependencies
import { controller, User, Role } from './controller';

// components
import FasIcon from 'components/fas-icon';

// constants
import * as ROUTES from 'constants/routes';

const ListRow: React.FC<User> = ({ id, name, roles, createdDate }) => {
  const { disabled, selected, list } = useControllerData(controller);
  const { updateCtrl, deleteItems } = useControllerActions(controller);

  const preparedDate: Moment | null = useMemo(() => moment(createdDate, 'YYYY-MM-DD').isValid() ? moment(createdDate) : null, [createdDate]);

  const uid = `select${id}`;

  const isChecked = useMemo(() => Boolean(_.find(selected, { id })), [selected]);

  const toggleSelection = useCallback(event => {
    // NOTE a temporary variable to store selected
    let newSelected: Array<User>;
    if (event.target.checked) {
      const user: User = _.find(list, { id })!;
      newSelected = selected.concat(user);
    } else {
      newSelected = selected.filter((user: User) => user.id !== id);
    }
    updateCtrl({ selected: newSelected });
  }, [list, selected, updateCtrl]);

  const handleItemDelete = useCallback(() => deleteItems({ selected: [{ id }] }), [deleteItems],);

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
    <td>{(roles ?? []).map((item: Role) => item?.name)}</td>
    <td>
      <Link to={ROUTES.ADMINISTRATIVE_USERS_EDIT.LINK({ id })} className="text-gray-d btn btn-sm pt-0 pb-0">
        <FasIcon icon="pencil-alt" />
      </Link>
      /
      <button
        disabled={disabled}
        onClick={handleItemDelete}
        className="text-gray-d btn btn-sm pt-0 pb-0"
      >
        <FasIcon icon="trash-alt" className="text-gray-d" />
      </button>
    </td>
  </tr>;
};

export default memo(ListRow);
