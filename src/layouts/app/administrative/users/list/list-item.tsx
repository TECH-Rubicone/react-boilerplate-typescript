// outsource dependencies
import moment from 'moment';
import React, { memo, useCallback, useMemo, FC } from 'react';
import { useControllerActions, useControllerData } from 'redux-saga-controller';

// constants

// configs
import config from 'configs';

// services
import _ from 'services/lodash.service';

// local dependencies
import { controller, User } from './controller';

const ListItem: FC<User> = ({ id, createdDate }) => {
  const {} = useControllerData(controller);
  const {} = useControllerActions(controller);

  // const isChecked = useMemo(() => Boolean(_.find(selected, { id })), [id, selected]);
  //
  // const toggleSelection = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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

  return <h1>List item</h1>;
};

export default memo(ListItem);
