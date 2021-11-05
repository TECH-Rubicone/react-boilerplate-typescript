// services
import { defineRoute, ANNOTATION } from 'services/route';

export const APP = defineRoute('/app', {});
export const AUTH = defineRoute('/auth', {});

export const ADMINISTRATIVE = defineRoute(`${APP.ROUTE}/administrative`, {});
export const CLIENT = defineRoute(`${APP.ROUTE}/client`, {});

export const SIGN_IN = defineRoute(`${AUTH.ROUTE}/sign-in`, {});
export const FORGOT_PASSWORD = defineRoute(`${AUTH.ROUTE}/forgot-password`, {});
export const WELCOME = defineRoute(`${APP.ROUTE}/welcome`, {});
export const TEST = defineRoute(`${APP.ROUTE}/test`, {});

// NOTE ADMINISTRATIVE
export const ADMINISTRATIVE_HOME = defineRoute(`${ADMINISTRATIVE.ROUTE}/home`, {});
export const ADMINISTRATIVE_USERS = defineRoute(`${ADMINISTRATIVE.ROUTE}/users`, {});
export const ADMINISTRATIVE_USERS_LIST = defineRoute(`${ADMINISTRATIVE.ROUTE}/users/list`, {
  query: [
    ANNOTATION.PAGE({ defaults: 0 }),
    ANNOTATION.SIZE({ defaults: 10 }),
    ANNOTATION.SEARCH({ defaults: '', short: 'search' }),
  ]
});
export const ADMINISTRATIVE_USERS_EDIT = defineRoute(`${ADMINISTRATIVE.ROUTE}/users/edit/:id`, {
  params: [ANNOTATION.ID({})]
});

// NOTE CLIENT
export const CLIENT_DSLD = defineRoute(`${CLIENT.ROUTE}/dsld`, {});
export const CLIENT_DSLD_SUPPLEMENTS = defineRoute(`${CLIENT_DSLD.ROUTE}/supplements`, {});
export const CLIENT_DSLD_INGREDIENTS = defineRoute(`${CLIENT_DSLD.ROUTE}/ingredients`, {});
