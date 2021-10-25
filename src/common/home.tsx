// outsource dependencies
import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// constants
import * as ROUTES from 'constants/routes';

const Home = () => {
  const { t } = useTranslation();

  return <div>
    <h1 className="pt-5 text-center">
      { t('layouts.welcome') }
    </h1>
    <Link to={ROUTES.ADMINISTRATIVE_USERS_LIST.LINK()} className="nav-link">
      { t('menu.users') }
    </Link>
  </div>;
};

export default memo(Home);
