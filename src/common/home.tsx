// outsource dependencies
import React, { memo } from 'react';
import { Link } from 'react-router-dom';

// constants
import * as ROUTES from 'constants/routes';

const Home = () => <div>
  <h1 className="pt-5 text-center">Welcome</h1>
  <Link to={ROUTES.ADMINISTRATIVE_USERS_LIST.LINK()} className="nav-link">User List</Link>
</div>;

export default memo(Home);
