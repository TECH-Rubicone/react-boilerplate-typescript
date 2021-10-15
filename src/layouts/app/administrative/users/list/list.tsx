// outsource dependencies
import _ from 'lodash';
import React, { memo, useCallback, useMemo, FC } from 'react';
import { useControllerActions, useControllerData } from 'redux-saga-controller';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, TableSortLabel, Checkbox, } from '@mui/material';

// components
import Pagination from 'components/pagination';

// hooks
import useFreeHeight from 'hooks/use-free-height';

// local dependencies
import ListItem from './list-item';
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
    size,
    page,
    disabled,
    selected,
    totalPages,
    totalElements,
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

  return <Paper sx={{ width: '100%', overflow: 'hidden' }}>
    <TableContainer sx={{ height: contentHeight }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox
                color="primary"
                onChange={toggleSelections}
                checked={Boolean(selected.length && isEveryChecked)}
                indeterminate={Boolean(isSomeChecked && !isEveryChecked)}
              />
            </TableCell>
            { columns.map(({ name, minWidth, label }) => <TableCell
              key={name}
              style={{ minWidth }}
            >
              <SortByField field={name}>{ label }</SortByField>
            </TableCell>) }
            <TableCell style={{ minWidth: 60 }}>
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { (list ?? []).map(item => <ListItem key={item.id} {...item} />) }
        </TableBody>
      </Table>
    </TableContainer>
    <Pagination
      size={size}
      page={page}
      disabled={disabled}
      total={totalElements}
      totalPages={totalPages}
      onSizeChange={onSizeChange}
      onPageChange={handlePageChange}
    />
  </Paper>;
};

export default memo(List);

interface SortByFieldProps {
  field: string;
  disabled?: boolean;
  children: React.ReactNode | React.ReactChild;
}

const SortByField: FC<SortByFieldProps> = memo(({ disabled, children, field }) => {
  const { sortField, sortDirection } = useControllerData(controller);
  const { updateFilters } = useControllerActions(controller);
  const isActiveField = sortField === field;
  const isSameField = isActiveField ? !sortDirection : false;
  const updateSort = useCallback(
    () => updateFilters({ sortField: field, sortDirection: isSameField }),
    [updateFilters, field, isSameField]
  );
  return <TableSortLabel onClick={updateSort} active={isActiveField} direction={sortDirection ? 'asc' : 'desc'}>
    { children }
  </TableSortLabel>;
});
