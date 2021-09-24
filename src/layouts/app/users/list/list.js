// outsource dependencies
import _ from 'lodash';
import moment from 'moment';
import React, { memo, useCallback, useMemo } from 'react';
import { Button, CustomInput, FormGroup, Label, Table } from 'reactstrap';
import { useControllerActions, useControllerData } from 'redux-saga-controller';

// local dependencies
import ListRow from './list-row';
import controller from './controller';

const List = () => {
  const { users, disabled, selectedUsers } = useControllerData(controller);
  const { updateCtrl } = useControllerActions(controller);

  const preparedUsers = useMemo(() => users.map(user => {
    const createdDate = moment(user.createdDate, 'YYYY-MM-DD').isValid() ? moment(user.createdDate) : null;
    return { ...user, createdDate };
  }),
  [users]
  );

  const isEveryChecked = useMemo(
    () => preparedUsers.every(user => _.find(selectedUsers, { id: user.id })),
    [preparedUsers, selectedUsers]
  );

  const toggleSelections = useCallback(event => {
    let selected = [];
    if (event.target.checked) {
      selected = selectedUsers.concat(preparedUsers);
    }
    updateCtrl({ selectedUsers: selected });
  }, [preparedUsers, selectedUsers, updateCtrl]);

  return <div className="list">
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
                    checked={selectedUsers.length && isEveryChecked}
                  />
                </Label>
              </FormGroup>
              <h6 className="text-info mb-0">
                <SortByField field="name">Name</SortByField>
              </h6>
            </div>
          </th>
          <th className="align-middle">
            <h6 className="text-info mb-0">
              <SortByField field="id">Id</SortByField>
            </h6>
          </th>
          <th className="align-middle">
            <h6 className="text-info mb-0">
              <SortByField field="createdDate">Creation Date</SortByField>
            </h6>
          </th>
          <th className="align-middle">
            <h6 className="text-info mb-0">
              <SortByField field="roles">Roles</SortByField>
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
        {(preparedUsers ?? []).map(user => <ListRow key={user.id} {...user} />)}
      </tbody>
    </Table>
  </div>;
};

const SortByField = memo(({ disabled, children, field }) => {
  const { sortField, sortDirection } = useControllerData(controller);
  const { updateFilters } = useControllerActions(controller);
  const isSameField = sortField === field ? !sortDirection : false;
  const updateSort = useCallback(
    () => updateFilters({ sortField: field, sortDirection: isSameField }),
    [sortField, field, sortDirection, updateFilters]
  );
  return <Button
    color="link"
    disabled={disabled}
    onClick={updateSort}
  >
    <SortIcon status={field === sortField ? sortDirection : null} />
    <strong className="text-info">{children}</strong>
  </Button>;
});

const SortIcon = memo(({ status }) => {
  const statusMap = useMemo(status => _.isNull(status) ? ' * ' : status ? ' ! ' : ' i ', [status]);
  return <span>
    {statusMap}
  </span>;
});

export default List;
