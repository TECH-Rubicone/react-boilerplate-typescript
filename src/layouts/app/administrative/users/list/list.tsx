// outsource dependencies
import _ from 'lodash';
import React, { memo, useCallback, useMemo } from 'react';
import { useControllerActions, useControllerData } from 'redux-saga-controller';
import { Paper, Table, TableContainer, TableHead, TableRow, TableCell, TableBody, } from '@mui/material';

// local dependencies
import { controller, Filters, Role, User } from './controller';

// components
import Pagination from 'components/pagination';

interface Column {
  label: string
  align?: 'right'
  minWidth?: number
  id: 'name' | 'id' | 'createdDate' | 'roles'
}

const columns: Array<Column> = [
  { id: 'name', label: 'Name', minWidth: 170, align: 'right' },
  { id: 'id', label: 'Id', minWidth: 100, align: 'right' },
  { id: 'createdDate', label: 'Creation Date', minWidth: 170, align: 'right', },
  { id: 'roles', label: 'Roles', minWidth: 170, align: 'right', },
];

const List = () => {
  const { list, disabled, selected, page, totalPages, totalElements, size } = useControllerData(controller);
  const { updateCtrl, updateFilters } = useControllerActions(controller);

  const isEveryChecked = useMemo(
    () => list.every((user: User) => _.find(selected, { id: user.id })),
    [list, selected]
  );
  const handlePageChange = useCallback((page: number) => updateFilters({ page } as Filters), [updateFilters]);

  const toggleSelections = useCallback(event => {
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
    <TableContainer sx={{ maxHeight: 440 }}>
      <Table stickyHeader aria-label="sticky table">
        <TableHead>
          <TableRow>
            {columns.map((column: Column) => (
              <TableCell key={column.id} style={{ minWidth: column.minWidth }} >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map(({ name, id, createdDate, roles }: User) => <TableRow hover role="checkbox" tabIndex={-1}>
            <TableCell>{name || 'Undefined Name'}</TableCell>
            <TableCell>{id}</TableCell>
            <TableCell>createdDate</TableCell>
            <TableCell>{(roles ?? []).map((item: Role) => item?.name)}</TableCell>
          </TableRow>
          )}
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
