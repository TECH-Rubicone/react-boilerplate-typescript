// outsource dependencies
import React, { memo, FC } from 'react';
import { useControllerActions, useControllerData } from 'redux-saga-controller';

// services

// constants

// configs

// local dependencies
import { controller, User, Role } from './controller';

const ListItem: FC<User> = ({ id, name, roles, createdDate }) => {
  const {} = useControllerData(controller);
  const {} = useControllerActions(controller);

  // const date = useMemo<string | null>(
  //   () => moment(createdDate).isValid() ? moment(createdDate).format(config.CLIENT_TIME_FORMAT) : null,
  //   [createdDate]
  // );

  // const uid = `select${id}`;
  //
  // const isChecked = useMemo(() => Boolean(_.find(selected, { id })), [id, selected]);
  //
  // const toggleSelection = useCallback(event => {
  //   // NOTE a temporary variable to store selected
  //   let newSelected: Array<User>;
  //   if (event.target.checked) {
  //     const user: User = _.find(list, { id })!;
  //     newSelected = selected.concat(user);
  //   } else {
  //     newSelected = selected.filter((user: User) => user.id !== id);
  //   }
  //   updateCtrl({ selected: newSelected });
  // }, [id, list, selected, updateCtrl]);
  //
  // const handleItemDelete = useCallback(() => deleteItems({ selected: [{ id }] }), [deleteItems, id],);

  return <h1>List - item</h1>;
};

export default memo(ListItem);
