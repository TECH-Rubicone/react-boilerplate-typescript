// services
import { defineRoute, ANNOTATION } from 'services/route';

export const LAYOUT_APP = '/app';
export const LAYOUT_AUTH = '/auth';

export const ADMINISTRATIVE = defineRoute(`${LAYOUT_APP}/administrative`, {});

export const SIGN_IN = defineRoute(`${LAYOUT_AUTH}/sign-in`, {});
export const WELCOME = defineRoute(`${LAYOUT_APP}/welcome`, {});

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
