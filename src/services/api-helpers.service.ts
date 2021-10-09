// outside dependencies
import qs from 'qs';
import _ from 'lodash';
import { AxiosError, AxiosResponse } from 'axios';

// local dependencies
import config from '../configs';

// constants
import { MESSAGE } from 'constants/api';

/**
 * override query serializer to define array Format as API needed
 *
 * @param {Object} options
 * @returns {String}
 */
interface ParamsSerializer {
  name: string;
  sort: string;
  page: string | number;
  size: string | number;
}
export const paramsSerializer = (options: ParamsSerializer): string => qs.stringify(options, { arrayFormat: 'repeat', encode: false });

/**
 * prepare results. Solution to prepare success data
 *
 * @param {Object} response
 * @return {Object}
 */

export const prepareResponse = (response: AxiosResponse) => response.data;

/**
 * prepare error
 *
 * @param {Object} error
 * @return {Promise}
 */

interface FormatAxiosError {
  path: string;
  method: string;
  status: string;
  requestData: any;
  errorCode: string;
  requestParams: any;
  response: AxiosResponse;
}

export const prepareError = (error: AxiosError): Promise<FormatAxiosError> => {
  const formattedError: FormatAxiosError = formatAxiosError(error);
  if (config.DEBUG) {
    debugErrors.unshift(formattedError);
    console.warn('%c Interceptor: ', 'background: #EC1B24; color: #fff; font-size: 14px;', error);
  }
  const message = getMessage([formattedError.errorCode], error.response ? 'CODE_NULL' : 'CROSS_DOMAIN_REQUEST');
  return Promise.reject({ ...formattedError.response, message });
};

export const formatAxiosError = (error: AxiosError): FormatAxiosError => ({
  // axiosError: error,
  path: _.get(error, 'config.url', null),
  response: _.get(error, 'response.data', null),
  status: _.get(error, 'response.status', null),
  requestData: _.get(error, 'config.data', null),
  method: _.get(error, 'config.method', 'CODE_NULL'),
  requestParams: _.get(error, 'config.params', null),
  errorCode: _.get(error, 'response.data.errorCode', null),
});

const debugErrors: FormatAxiosError[] = [];

export function getMessage (errors: string[] | string, defMessage: string | null): string | null {
  // NOTE check and setup default message
  if (!_.isString(defMessage)) {
    defMessage = getMessage('UNKNOWN_ERROR', 'Some thing went wrong ...');
  } else {
    defMessage = MESSAGE[defMessage] ? MESSAGE[defMessage] : defMessage;
  }
  // NOTE try to get message from specification
  let message = '';
  if (_.isArray(errors)) {
    message = errors.map(error => getMessage(error, defMessage)).join(', ');
  } else if (errors) {
    message = MESSAGE[errors];
  }
  return message || defMessage;
}
