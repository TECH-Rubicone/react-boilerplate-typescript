// outsource dependencies
import moment from 'moment';
import { Link } from 'react-router-dom';
import React, { memo, useCallback, useMemo, FC } from 'react';
import { Checkbox, TableCell, TableRow } from '@mui/material';
import { useControllerActions, useControllerData } from 'redux-saga-controller';

// components

// services
import _ from 'services/lodash.service';

// constants
import * as ROUTES from 'constants/routes';

// configs
import config from 'configs';

// local dependencies
import { controller, User, Role } from './controller';

const ListItem: FC<User> = ({ id, name, roles, createdDate }) => {
  const { disabled, selected, list } = useControllerData(controller);
  const { updateCtrl, deleteItems } = useControllerActions(controller);

  const date = useMemo<string | null>(
    () => moment(createdDate).isValid() ? moment(createdDate).format(config.CLIENT_TIME_FORMAT) : null,
    [createdDate]
  );

  const uid = `select${id}`;

  const isChecked = useMemo(() => Boolean(_.find(selected, { id })), [id, selected]);

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
  }, [id, list, selected, updateCtrl]);

  const handleItemDelete = useCallback(() => deleteItems({ selected: [{ id }] }), [deleteItems, id],);

  return <TableRow hover role="checkbox">
    <TableCell padding="checkbox">
      <Checkbox
        color="primary"
        onChange={toggleSelection}
        inputProps={{ 'aria-labelledby': uid }}
        checked={Boolean(selected.length && isChecked)}
      />
    </TableCell>
    <TableCell>{ name || 'Undefined Name' }</TableCell>
    <TableCell>{ id }</TableCell>
    <TableCell>{ date }</TableCell>
    <TableCell>{ (roles ?? []).map((item: Role) => item?.name) }</TableCell>
    <TableCell>
      <Link to={ROUTES.ADMINISTRATIVE_USERS_EDIT.LINK({ id })} className="text-gray-d btn btn-sm pt-0 pb-0">
        pencil
      </Link>
      /
      <button
        disabled={disabled}
        onClick={handleItemDelete}
        className="text-gray-d btn btn-sm pt-0 pb-0"
      >
        trash
      </button>
    </TableCell>
  </TableRow>;
};

export default memo(ListItem);
