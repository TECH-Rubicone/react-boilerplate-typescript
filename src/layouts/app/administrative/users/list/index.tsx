// outsource dependencies
import React, { memo } from 'react';

import * as ROUTES from 'constants/routes';
import RouterButton from 'components/router-button';

const List = () => {
  return <div>
    <h2>Users List</h2>
    <RouterButton to={ROUTES.ADMINISTRATIVE_USERS_EDIT.LINK({ id: 10 })}>EDIT</RouterButton>
    <RouterButton to={ROUTES.ADMINISTRATIVE_USERS_EDIT.LINK()}>CREATE</RouterButton>
  </div>;
};

export default memo(List);
