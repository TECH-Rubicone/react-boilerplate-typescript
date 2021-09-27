// outsource dependencies
import _ from 'lodash';
import React, { memo, useCallback, useMemo } from 'react';
import { Button, CustomInput, FormGroup, Label, Table } from 'reactstrap';
import { useControllerActions, useControllerData } from 'redux-saga-controller';

// local dependencies
import ListRow from './list-row';
import { controller, Filters, User } from './controller';

// components
import { FasIcon } from 'components/fa-icon';

const List = () => {
  const { list, disabled, selected } = useControllerData(controller);
  const { updateCtrl } = useControllerActions(controller);

  const isEveryChecked = useMemo(
    () => list.every((user: User) => _.find(selected, { id: user.id })),
    [list, selected]
  );

  const toggleSelections = useCallback(event => {
    let newSelected: Array<User> = [];
    if (event.target.checked) {
      newSelected = selected.concat(list);
    }
    updateCtrl({ selected: newSelected });
  }, [list, selected, updateCtrl]);

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
                    checked={Boolean(selected.length && isEveryChecked)}
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
        {(list ?? []).map((user: User) => <ListRow key={user.id} {...user} />)}
      </tbody>
    </Table>
  </div>;
};

export default memo(List);

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
  disabled?: boolean
  status: boolean | null
}

const SortIcon: React.FC<SortIconProps> = memo(({ status, ...attr }) => {
  const statusMap = useMemo(() => _.isNull(status) ? 'sort' : status ? 'sort-amount-up' : 'sort-amount-down', [status]);
  const classMap = useMemo(() => {
    switch (status) {
      default: return `ml-1 mr-1 text-thin ${attr.disabled ? 'text-muted' : 'text-gray'}`;
      case true: return `ml-1 mr-1 text-bold ${attr.disabled ? 'text-muted' : 'text-gray-d'}`;
      case false: return `ml-1 mr-1 text-bold ${attr.disabled ? 'text-muted' : 'text-gray-d'}`;
    }
  }, [attr, status]);
  return <FasIcon
    {...attr}
    icon={statusMap}
    className={classMap}
  />;
});
