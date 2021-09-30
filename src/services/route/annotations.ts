// local dependencies
import { NEW_ID } from './constants';
import { defineParam } from './index';
import { ParamOptions } from './param';

/**
 * Some commonly used annotations
 */
export const ANNOTATION = {
  // NOTE popular params
  ID: (options: Partial<ParamOptions<number, string>>) => defineParam<number, string>({ name: 'id', defaults: NEW_ID, ...options }),
  TOKEN: (options: Partial<ParamOptions<string, string>>) => defineParam<string, string>({ name: 'token', defaults: 'invalid-token', ...options }),
  // NOTE popular query
  SEARCH: (options: Partial<ParamOptions<string, string>>) => defineParam<string, string>({ short: 's', name: 'search', defaults: '', ...options }),
  NAME: (options: Partial<ParamOptions<string, string>>) => defineParam<string, string>({ short: 'n', name: 'name', defaults: '', ...options }),
  PAGE: (options: Partial<ParamOptions<number, number>>) => defineParam<number, number>({ short: 'p', name: 'page', defaults: 0, archive: String, extract: Number, ...options }),
  SIZE: (options: Partial<ParamOptions<number, number>>) => defineParam<number, number>({
    short: 's',
    name: 'size',
    defaults: 10,
    archive: String,
    extract: Number,
    ...options
  }),
  SORT_DIRECTION: (options: Partial<ParamOptions<boolean, boolean>>) => defineParam<boolean, boolean>({
    short: 'sd',
    name: 'sortDirection',
    defaults: false,
    archive: (value: boolean) => String(Number(value)),
    extract: (value: string) => Boolean(Number(value)),
    ...options
  }),
  SORT_FIELD: (options: Partial<ParamOptions<string, string>>) => defineParam<string, string>({
    short: 'sf',
    name: 'sortField',
    defaults: 'name',
    isValid: (value: string) => ['name'].includes(value),
    ...options
  }),
  // Complex types
  // STATUSES: (options: Partial<ParamOptions<Array<string>, Array<string>>>) =>
  // defineParam<Array<string>, Array<string>>({
  //   short: 'st',
  //   name: 'statuses',
  //   defaults: [],
  //   isValid: (value: Array<string>) => yup.array()
  //     .of(
  //       yup.string()
  //         .required()
  //         .oneOf(Object.values(ENTITY_STATUS))
  //     )
  //     .required()
  //     .isValidSync(value),
  //   ...options
  // }),
};
