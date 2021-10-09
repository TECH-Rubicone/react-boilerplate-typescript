// interfaces
import { StringObject } from 'interfaces/common';

// configs
import config from '../configs';

// absolute path to API
export const API_PATH = config.SERVICE_URL + config.API_PATH;

// private names
export const API_NAMES: StringObject = {
  AUTH_STORE: 'sAuth',
  AUTH_BEARER: 'Bearer ',
  AUTH_HEADER: 'Authorization',
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
};

export const MESSAGE: StringObject = {
  CODE_NULL: '', // errors which will be displayed as UNKNOWN_ERROR
  NESTED_EXCEPTION: '', // errors which will be displayed as UNKNOWN_ERROR
  FORBIDDEN: 'Access is denied.',
  ACCESS_DENIED: 'Access denied',
  404: '404: Resources not found',
  BAD_CREDENTIALS: 'Bad credentials',
  USER_IS_DISABLED: 'User is disabled',
  NAME_NOT_UNIQUE: 'Name should be unique',
  EMAIL_NOT_UNIQUE: 'Email should be unique',
  UNKNOWN_ERROR: 'Some thing went wrong ...',
  NOT_FOUND: 'Entity wasn\'t found in a system',
  CELL_PHONE_NOT_UNIQUE: 'Cell phone is not unique',
  HOME_PHONE_NOT_UNIQUE: 'Home phone is not unique',
  WORK_PHONE_NOT_UNIQUE: 'Work phone is not unique',
  UNMODIFIABLE_ROLE: 'This role can not be modified',
  NOT_IMPLEMENTED: 'Functionality currently unavailable',
  CROSS_DOMAIN_REQUEST: 'Cross domain request not allowed !',
  CANT_DELETE_ENTITY_IS_USED: 'Impossible to delete. Entity is in use',
};
