// outsource dependencies
import _ from 'lodash';
import React, { memo, useCallback, useMemo } from 'react';
import { Button, CustomInput, FormGroup, Label, Table } from 'reactstrap';
import { useControllerActions, useControllerData } from 'redux-saga-controller';

// local dependencies
import ListRow from './list-row';
import { controller, Filters, User } from './controller';

const List = () => {
  const { users, disabled, selectedUsers } = useControllerData(controller);
  const { updateCtrl } = useControllerActions(controller);

  const isEveryChecked = useMemo(
    () => users.every((user: User) => _.find(selectedUsers, { id: user.id })),
    [users, selectedUsers]
  );

  const toggleSelections = useCallback(event => {
    let selected = [] as User[];
    if (event.target.checked) {
      selected = selectedUsers.concat(users);
    }
    updateCtrl({ selectedUsers: selected });
  }, [users, selectedUsers, updateCtrl]);

  return <div className="list mb-2">
    <Table striped>
      <thead>
        <tr>
          <th>
            <div className="d-flex align-items-center">
              <FormGroup inline check className="mx-2">
                <Label for="checkAll" check>
                  <CustomInput
                    id="checkAll"
                    name="checkAll"
                    type="checkbox"
                    disabled={disabled}
                    onChange={toggleSelections}
                    checked={Boolean(selectedUsers.length && isEveryChecked)}
                  />
                </Label>
              </FormGroup>
              <h6 className="text-info mb-0">
                <SortByField field="name" disabled={disabled}>Name</SortByField>
              </h6>
            </div>
          </th>
          <th className="align-middle">
            <h6 className="text-info mb-0">
              <SortByField field="id" disabled={disabled}>Id</SortByField>
            </h6>
          </th>
          <th className="align-middle">
            <h6 className="text-info mb-0">
              <SortByField field="createdDate" disabled={disabled}>Creation Date</SortByField>
            </h6>
          </th>
          <th className="align-middle">
            <h6 className="text-info mb-0">
              <SortByField field="roles" disabled>Roles</SortByField>
            </h6>
          </th>
          <th className="align-middle">
            <h6 className="text-info mb-0">
              Actions
            </h6>
          </th>
        </tr>
      </thead>
      <tbody>
        {(users ?? []).map((user: User) => <ListRow key={user.id} {...user} />)}
      </tbody>
    </Table>
  </div>;
};

interface SortByFieldProps {
  field: string;
  disabled: boolean;
  children: React.ReactNode | React.ReactChild;
}

const SortByField: React.FC<SortByFieldProps> = memo(({ disabled, children, field }) => {
  const { sortField, sortDirection } = useControllerData(controller);
  const { updateFilters } = useControllerActions(controller);
  const isSameField = sortField === field ? !sortDirection : false;
  const updateSort = useCallback(
    () => updateFilters({ sortField: field, sortDirection: isSameField } as Filters),
    [sortField, field, sortDirection, updateFilters]
  );
  return <Button color="link" disabled={disabled} onClick={updateSort} >
    <SortIcon status={field === sortField ? sortDirection : null} />
    <strong className="text-info">{children}</strong>
  </Button>;
});

interface SortIconProps {
  status: boolean | null;
}

const SortIcon: React.FC<SortIconProps> = memo(({ status }) => {
  const statusMap = useMemo(() => _.isNull(status) ? ' * ' : status ? ' i ' : ' ! ', [status]);
  return <span>
    {statusMap}
  </span>;
});

export default memo(List);
