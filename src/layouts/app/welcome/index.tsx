// outside dependencies
import React from 'react';
import { NavLink } from 'react-router-dom';

// local dependencies
import * as ROUTES from 'constants/routes';

const Welcome = () => <div className="d-flex h-100 p-3 mx-auto flex-column">
  <header className="masthead mb-auto">
    <nav className="nav nav-masthead">
      <NavLink to={ROUTES.SIGN_IN.LINK()} className="nav-link">SignIn</NavLink>
      <NavLink to={ROUTES.WELCOME.LINK()} className="nav-link">Welcome</NavLink>
      <NavLink to={ROUTES.ADMINISTRATIVE.LINK()} className="nav-link">Administrative</NavLink>
    </nav>
  </header>
  <main>
    <h1 className="cover-heading">WELCOME!</h1>
    <p className="lead">We are really glad to see you!</p>
  </main>
  <footer className="mastfoot mt-auto">
    <div className="inner">
      Welcome footer
    </div>
  </footer>
</div>;

export default Welcome;
