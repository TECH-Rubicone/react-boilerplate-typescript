// outsource dependencies
import _ from 'lodash';
import React, { memo, useCallback, useMemo } from 'react';
import { useControllerActions, useControllerData } from 'redux-saga-controller';

// components

// hooks
import useFreeHeight from 'hooks/use-free-height';

// local dependencies
import { controller, User } from './controller';

interface Column {
  label: string
  minWidth?: number
  align?: 'right' | 'left'
  name: 'name' | 'id' | 'createdDate' | 'roles' | 'actions'
}

const columns: Array<Column> = [
  { name: 'name', label: 'Name', minWidth: 170, align: 'right' },
  { name: 'id', label: 'Id', minWidth: 100, align: 'right' },
  { name: 'createdDate', label: 'Creation Date', minWidth: 170, align: 'right', },
  { name: 'roles', label: 'Roles', minWidth: 170, align: 'right', },
];

const List = () => {
  const freeHeight = useFreeHeight();
  const contentHeight = freeHeight
  - 73  // title
  - 56  // actions
  - 16  // table padding
  - 52  // table pagination
  - 16; // mb

  const {
    list,
    selected,
  } = useControllerData(controller);
  const { updateCtrl, updateFilters } = useControllerActions(controller);

  const isEveryChecked = useMemo(
    () => list.every(item => _.find(selected, { id: item.id })),
    [list, selected]
  );

  const isSomeChecked = useMemo(
    () => list.some(item => _.find(selected, { id: item.id })),
    [list, selected]
  );
  const handlePageChange = useCallback((page: number) => updateFilters({ page }), [updateFilters]);

  const toggleSelections = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    let newSelected: Array<User> = [];
    if (event.target.checked) {
      newSelected = selected.concat(list);
    }
    updateCtrl({ selected: newSelected });
  }, [list, selected, updateCtrl]);

  const onSizeChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => updateFilters({ size: event.target.value, }),
    [updateFilters]
  );

  return <h1>List</h1>;
};

export default memo(List);

interface SortByFieldProps {
  field: string;
  disabled?: boolean;
  children: React.ReactNode | React.ReactChild;
}

