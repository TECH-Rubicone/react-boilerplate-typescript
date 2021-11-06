// outsource dependencies
import React, { memo } from 'react';
import { useControllerActions, useControllerData } from 'redux-saga-controller';

// local dependencies
import { controller } from './controller';

// components

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
  { name: 'actions', label: 'Actions', minWidth: 60, align: 'left', },
];

const List = () => {
  const {} = useControllerData(controller);
  const {} = useControllerActions(controller);

  // const isEveryChecked = useMemo(
  //   () => list.every(item => _.find(selected, { id: item.id })),
  //   [list, selected]
  // );
  //
  // const isSomeChecked = useMemo(
  //   () => list.some(item => _.find(selected, { id: item.id })),
  //   [list, selected]
  // );
  // const handlePageChange = useCallback((page: number) => updateFilters({ page }), [updateFilters]);
  //
  // const toggleSelections = useCallback(event => {
  //   let newSelected: Array<User> = [];
  //   if (event.target.checked) {
  //     newSelected = selected.concat(list);
  //   }
  //   updateCtrl({ selected: newSelected });
  // }, [list, selected, updateCtrl]);
  //
  // const onSizeChange = useCallback(
  //   (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => updateFilters({
  //   size: event.target.value,
  //   }),
  //   [updateFilters]
  // );

  return <h1>List</h1>;
};

export default memo(List);
