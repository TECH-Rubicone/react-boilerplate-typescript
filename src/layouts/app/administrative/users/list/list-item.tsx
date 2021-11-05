// outsource dependencies
import moment from 'moment';
import { Link } from 'react-router-dom';
import React, { memo, useCallback, useMemo, FC } from 'react';
import { Checkbox, TableCell, TableRow, Chip } from '@mui/material';
import { useControllerActions, useControllerData } from 'redux-saga-controller';
import { Create as CreateIcon, Delete as DeleteIcon, AccountCircle as AccountCircleIcon } from '@mui/icons-material';

// constants
import * as ROUTES from 'constants/routes';

// configs
import config from 'configs';

// services
import _ from 'services/lodash.service';

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

  const toggleSelection = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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
    <TableCell>
      { (roles ?? []).map((item: Role) => <Chip
        size="small"
        key={item.id}
        color="primary"
        label={item?.name}
        icon={<AccountCircleIcon />}
        sx={{ marginRight: 1, marginBottom: 1 }}
      />) }
    </TableCell>
    <TableCell>
      <Link to={ROUTES.ADMINISTRATIVE_USERS_EDIT.LINK({ id })} className="text-gray-d btn btn-sm pt-0 pb-0">
        <CreateIcon color="action" />
      </Link>
      <DeleteIcon color="error" className="cursor-pointer" onClick={handleItemDelete} />
    </TableCell>
  </TableRow>;
};

export default memo(ListItem);
