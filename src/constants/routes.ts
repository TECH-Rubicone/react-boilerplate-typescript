export const NEW_ID = 'new';

export const LAYOUT_APP = '/app';
export const LAYOUT_AUTH = '/auth';

export const TEST = (ROUTE => ({
  ROUTE,
  LINK: () => ROUTE,
}))(`${LAYOUT_APP}/test`);

export const WELCOME = (ROUTE => ({
  ROUTE,
  LINK: () => ROUTE,
}))(`${LAYOUT_APP}/welcome`);

export const SIGN_IN = (ROUTE => ({
  ROUTE,
  LINK: () => ROUTE,
}))(`${LAYOUT_AUTH}/sign-in`);

export const USERS = (ROUTE => ({
  ROUTE,
  REGEXP: new RegExp(`${ROUTE}/.*`, 'i'),
  ROOT: `${ROUTE}/list`,
  EDIT: `${ROUTE}/edit/:id`,
  LINK: () => (`${ROUTE}/list`),
  LINK_EDIT: (id: number | string) => `${ROUTE}/edit/${id}`,
}))(`${LAYOUT_APP}/users`);

/*
export const LAYOUT_SIGN_IN = (ROUTE => ({
  ROUTE,
  REGEXP: new RegExp(`${ROUTE}/.*`, 'i'),
  ROOT: `${ROUTE}/root`,
  EDIT: `${ROUTE}/edit/:id`,
  LINK: () => (`${ROUTE}/root`),
  LINK_EDIT: ({ id }: {id: number}) => `${ROUTE}/edit/${id || NEW_ID}`,
}))(`${LAYOUT_AUTH}/sign-in`);*/
