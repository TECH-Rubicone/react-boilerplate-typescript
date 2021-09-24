
// outsource dependencies
import qs from 'qs';
import _ from 'lodash';
import axios, { AxiosError, AxiosStatic, AxiosRequestConfig, AxiosResponse } from 'axios';

// local dependencies
import storage from './storage.service';
import config from '../configs';

// absolute path to API
export const API_PATH = process.env.REACT_APP_SERVICE_URL as string + process.env.REACT_APP_API_PATH as string;

// private names
const AUTH_STORE = 'sAuth';
const AUTH_BEARER = 'Bearer ';
const AUTH_HEADER = 'Authorization';
const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

type ITokenData = null | {
  accessToken: string;
  refreshToken: string;
  accessTokenValiditySeconds: number;
  refreshTokenValiditySeconds: number;
}

/******************************************************************
 *           STORAGE
 ******************************************************************/
/**
 * update session in storage to provide ability restore session from ("local" || "cookie") storage
 *
 * @param {Object} [session=null]
 */
const updateStoredSession = (session: ITokenData): void => {
  return (!session ? storage.remove(AUTH_STORE) : storage.set(AUTH_STORE, {
    [ACCESS_TOKEN]: session[ACCESS_TOKEN],
    [REFRESH_TOKEN]: session[REFRESH_TOKEN]
  }));
};

// (window as any).storage = storage;

export const getAccessToken = (): string => _.get(storage.get(AUTH_STORE), ACCESS_TOKEN, null);

const getRefreshToken = (): string => _.get(storage.get(AUTH_STORE), REFRESH_TOKEN, null);

const hasStoredSession = (): boolean => _.isEmpty(storage.get(AUTH_STORE));

const getAuthHeader = (): string => AUTH_BEARER + getAccessToken();

/******************************************************************
 *           helpers
 *******************************************************************/

/**
 * override query serializer to define array Format as API needed
 *
 * @param {Object} options
 * @returns {String}
 */
interface IParamsSerializer {
  name: string;
  sort: string;
  page: string | number;
  size: string | number;
}
const paramsSerializer = (options: IParamsSerializer): string => qs.stringify(options, { arrayFormat: 'repeat', encode: false });

/**
 * prepare results. Solution to prepare success data
 *
 * @param {Object} response
 * @return {Object}
 */

type IResponse = {
  data: ITokenData;
  status?: number;
  statusTest?: string;
}

const prepareResponse = (response: IResponse): ITokenData => response.data;

/**
 * prepare error
 *
 * @param {Object} error
 * @return {Promise}
 */

interface IFormatAxiosError {
  path: string;
  method: string;
  status: string;
  requestData: any;
  errorCode: string;
  requestParams: any;
  response: AxiosResponse<any>;
}

const prepareError = (error: AxiosError): Promise<IFormatAxiosError> => {
  const formattedError: IFormatAxiosError = formatAxiosError(error);
  if (config.DEBUG) {
    debugErrors.unshift(formattedError);
    console.warn('%c Interceptor: ', 'background: #EC1B24; color: #fff; font-size: 14px;', error);
  }
  const message = getMessage([formattedError.errorCode], error.response ? 'CODE_NULL' : 'CROSS_DOMAIN_REQUEST');
  return Promise.reject({ ...formattedError.response, message });
};

const formatAxiosError = (error: AxiosError): IFormatAxiosError => ({
  // axiosError: error,
  path: _.get(error, 'config.url', null),
  response: _.get(error, 'response.data', null),
  status: _.get(error, 'response.status', null),
  requestData: _.get(error, 'config.data', null),
  method: _.get(error, 'config.method', 'CODE_NULL'),
  requestParams: _.get(error, 'config.params', null),
  errorCode: _.get(error, 'response.data.errorCode', null),
});

/******************************************************************
 *           PUBLIC  requester instance
 ******************************************************************/
/**
 * axios instance prepared for app
 */
const PUB = axios.create({
  paramsSerializer,
  baseURL: API_PATH,
  withCredentials: false,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  }
});

/**
 * setup interceptors
 */
PUB.interceptors.response.use(
  prepareResponse,
  prepareError
);

/******************************************************************
 *           API(PRIVATE) requester instance
 ******************************************************************/
/**
 * axios instance prepared for app with authorization
 * contain logic for working with authorization and 401 interceptor
 */

interface IAxiosInstance extends AxiosStatic {
  restoreSessionFromStore: () => boolean,
  setupSession: (session: ITokenData) => void,
  onAuthFailApplicationAction: (error: AxiosError) => void,
}

const API = axios.create({
  paramsSerializer,
  baseURL: API_PATH,
  withCredentials: false,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  },
}) as IAxiosInstance;

/**
 * setup interceptors
 * sync check to known is user logged in
 * NOTE to known more {@link https://gist.github.com/mkjiau/650013a99c341c9f23ca00ccb213db1c | axios-interceptors-refresh-token}
 */

API.interceptors.response.use(
  prepareResponse,
  (error: AxiosError) => ((
    !hasStoredSession()
    && error.request.status === 401
    // NOTE support request may get 401 (JAVA Spring is fucking genius ...) we must skip restoring for that case
    && !/sign-out|\/oauth\/token/.test(error.config.url as string)
  ) ? handleRefreshSession(error) : prepareError(error))
);

/**
 * local variables to correctness refreshing session process
 */
interface IStuckRequest {
  config: any;
  error: AxiosError;
  reject: (reason?: any) => void;
  resolve: (value: unknown) => void;
}

let isRefreshing = false,
  stuckRequests: IStuckRequest[] = [];

/**
 * store all requests with 401 refresh session and try send request again
 *
 * @param {Object} error
 * @return {Promise}
 */
interface IConfig extends AxiosRequestConfig {
  wasTryingToRestore: boolean;
}

const handleRefreshSession = (error: AxiosError) => {
  const config = error.config as IConfig;
  if (!isRefreshing) {
    isRefreshing = true;
    // NOTE PUB instance result does not match the AxiosRequest type
    axios.post<ITokenData>(`${API_PATH}/auth/token/refresh`, { refreshToken: getRefreshToken() })
      .then(response => {
        API.setupSession(response.data);
        // NOTE resend all
        stuckRequests.map(({ config, resolve, reject }) => {
          // NOTE setup new authentication header in old request config
          config.headers[AUTH_HEADER] = getAuthHeader();
          API(config).then(resolve).catch(reject);
          // NOTE "array-callback-return"
          return null;
        });
        // NOTE start new stuck
        stuckRequests = [];
        isRefreshing = false;
      })
      .catch(() => {
        // NOTE reject all
        stuckRequests.map(({ error, reject }) => reject(error));
        // NOTE provide ability to handle this situation
        API.onAuthFailApplicationAction(error);
        // NOTE start new stuck
        stuckRequests = [];
        isRefreshing = false;
      });
  }
  // NOTE determine first trying to restore session
  if (!config.wasTryingToRestore) {
    return new Promise((resolve, reject) => {
      config.wasTryingToRestore = true;
      stuckRequests.push({ config, error, resolve, reject });
    });
  }
  return prepareError(error);
};

/**
 * provide correct way to restore session
 */
API.restoreSessionFromStore = (): boolean => Boolean(hasStoredSession()
  ? (API.defaults.headers[AUTH_HEADER] = void(0))
  : (API.defaults.headers[AUTH_HEADER] = getAuthHeader()));

/**
 * provide correct way to setup authorization session
 *
 * @param {String} session - null to kill session within instanceAPI
 */
API.setupSession = (session: ITokenData): void => {
  updateStoredSession(session);
  API.restoreSessionFromStore();
  // store.dispatch(appController.action.updateCtrl({ accessToken: _.get(session, ACCESS_TOKEN) }));
};
/**
 * "event" to provide correct way to handle authorization fail during requests
 *
 */
API.onAuthFailApplicationAction = (error: AxiosError): void => console.warn('authorization is fail. Expected to override this action');
/******************************************************************
 *           format of ERRORS
 ******************************************************************/
/**
 * try to find explanation of error in specification
 *
 * @param {String[]|String} errors
 * @param {String} [defMessage=null]
 */

function getMessage (errors: string[] | string, defMessage: string | null): string | null {
  // NOTE check and setup default message
  if (!_.isString(defMessage)) {
    defMessage = getMessage('UNKNOWN_ERROR', 'Some thing went wrong ...');
  } else {
    defMessage = MESSAGE[defMessage] ? MESSAGE[defMessage] : defMessage;
  }
  // NOTE try to get message from specification
  let message = '';
  if (_.isArray(errors)) {
    message = errors.map(e => getMessage(e, defMessage)).join(', ');
  } else if (errors) {
    message = MESSAGE[errors];
  }
  return message || defMessage;
}

type MessageType = {
  [key: string]: string;
  404: string;
  FORBIDDEN: string;
  CODE_NULL: string;
  NOT_FOUND: string;
  ACCESS_DENIED: string;
  UNKNOWN_ERROR: string;
  NAME_NOT_UNIQUE: string;
  BAD_CREDENTIALS: string;
  NOT_IMPLEMENTED: string;
  EMAIL_NOT_UNIQUE: string;
  USER_IS_DISABLED: string;
  NESTED_EXCEPTION: string;
  UNMODIFIABLE_ROLE: string;
  CROSS_DOMAIN_REQUEST: string;
  CELL_PHONE_NOT_UNIQUE: string;
  HOME_PHONE_NOT_UNIQUE: string;
  WORK_PHONE_NOT_UNIQUE: string;
  CANT_DELETE_ENTITY_IS_USED: string;
}

const MESSAGE: MessageType = {
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

const debugErrors: IFormatAxiosError[] = [];
export const getDebugErrors = (): IFormatAxiosError[] => debugErrors;
// NOTE named export only after all prepare thing
export const instanceAPI = API;
export const instancePUB = PUB;
export default API;
