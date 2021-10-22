// outside dependencies
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// local dependencies
import * as ROUTES from 'constants/routes';

const Welcome = () => {
  const { t } = useTranslation();

  return <div className="d-flex h-100 p-3 mx-auto flex-column">
    <header className="masthead mb-auto">
      <nav className="nav nav-masthead">
        <NavLink to={ROUTES.SIGN_IN.LINK()} className="nav-link">
          { t('menu.sign-in') }
        </NavLink>
        <NavLink to={ROUTES.WELCOME.LINK()} className="nav-link">
          { t('menu.welcome') }
        </NavLink>
        <NavLink to={ROUTES.ADMINISTRATIVE.LINK()} className="nav-link">
          { t('menu.administrative') }
        </NavLink>
      </nav>
    </header>
    <main>
      <h1 className="cover-heading">
        { t('WELCOME.general.title') }
      </h1>
      <p className="lead">
        { t('WELCOME.general.description') }
      </p>
    </main>
    <footer className="mastfoot mt-auto">
      <div className="inner">
        { t('WELCOME.general.other') }
      </div>
    </footer>
  </div>;
};

export default Welcome;
