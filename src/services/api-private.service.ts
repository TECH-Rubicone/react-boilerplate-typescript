// outsource dependencies
import _ from 'lodash';
import axios, { AxiosError } from 'axios';

// local dependencies
import PUB from './api-public.service';
import storage from './storage.service';
import { paramsSerializer, prepareError, prepareResponse } from './api-helpers.service';

// constants
import { API_NAMES, API_PATH } from 'constants/api';

// interfaces
import { OAuth2AccessTokenDto } from '../interfaces/api';

type Session = OAuth2AccessTokenDto | null;

/******************************************************************
 *           STORAGE
 ******************************************************************/
/**
 * update session in storage to provide ability restore session from ("local" || "cookie") storage
 *
 * @param {Object} [session=null]
 */
const updateStoredSession = (session: Session): void => {
  return (!session ? storage.remove(API_NAMES.AUTH_STORE) : storage.set(API_NAMES.AUTH_STORE, {
    [API_NAMES.ACCESS_TOKEN]: session.accessToken,
    [API_NAMES.REFRESH_TOKEN]: session.refreshToken,
    [API_NAMES.AUTH_STORE]: session
  }));
};

export const getAccessToken = (): string | null => _.get(
  storage.get(API_NAMES.AUTH_STORE),
  API_NAMES.ACCESS_TOKEN,
  null
);

export const getRefreshToken = (): string | null => _.get(
  storage.get(API_NAMES.AUTH_STORE),
  API_NAMES.REFRESH_TOKEN,
  null
);

export const getToken = (): Session => _.get(
  storage.get(API_NAMES.AUTH_STORE),
  API_NAMES.AUTH_STORE,
  null
);

const hasStoredSession = (): boolean => _.isEmpty(storage.get(API_NAMES.AUTH_STORE));

const getAuthHeader = (): string => API_NAMES.AUTH_BEARER + getAccessToken();

/******************************************************************
 *           API(PRIVATE) requester instance
 ******************************************************************/
/**
 * axios instance prepared for app with authorization
 * contain logic for working with authorization and 401 interceptor
 */

const API = axios.create({
  paramsSerializer,
  baseURL: API_PATH,
  withCredentials: false,
  headers: {
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
  },
});

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
    && !/sign-out|\/oauth\/token/.test(String(error.config.url))
  ) ? handleRefreshSession(error) : prepareError(error))
);

/**
 * local variables to correctness refreshing session process
 */
interface StuckRequest {
  config: any
  error: AxiosError
  reject: (reason?: any) => void
  resolve: (value: unknown) => void
}

let isRefreshing = false,
  stuckRequests: StuckRequest[] = [];

/**
 * store all requests with 401 refresh session and try send request again
 *
 * @param {Object} error
 * @return {Promise}
 */

const handleRefreshSession = (error: AxiosError) => {
  const config = error.config;
  let configWasTryingToRestore = false;

  if (!isRefreshing) {
    isRefreshing = true;
    // NOTE PUB instance result does not match the AxiosRequest type
    PUB.post<OAuth2AccessTokenDto, OAuth2AccessTokenDto>('auth/token/refresh', { refreshToken: getRefreshToken() })
      .then(response => {
        setupSession(response);
        // NOTE resend all
        stuckRequests.map(({ config, resolve, reject }) => {
          // NOTE setup new authentication header in old request config
          config.headers[API_NAMES.AUTH_HEADER] = getAuthHeader();
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
        onAuthFailApplicationAction(error);
        // NOTE start new stuck
        stuckRequests = [];
        isRefreshing = false;
      });
  }
  // NOTE determine first trying to restore session
  if (!configWasTryingToRestore) {
    return new Promise((resolve, reject) => {
      configWasTryingToRestore = true;
      stuckRequests.push({ config, error, resolve, reject });
    });
  }
  return prepareError(error);
};

/**
 * provide correct way to restore session
 */

export const restoreSessionFromStore = (): boolean => Boolean(hasStoredSession()
  ? (API.defaults.headers[API_NAMES.AUTH_HEADER] = void(0))
  : (API.defaults.headers[API_NAMES.AUTH_HEADER] = getAuthHeader()));

/**
 * provide correct way to setup authorization session
 *
 * @param {String} session - null to kill session within instanceAPI
 */
export const setupSession = (session: Session): void => {
  updateStoredSession(session);
  restoreSessionFromStore();
  // store.dispatch(appController.action.updateCtrl({ accessToken: _.get(session, ACCESS_TOKEN) }));
};
/**
 * "event" to provide correct way to handle authorization fail during requests
 *
 */
export const onAuthFailApplicationAction = (error: AxiosError): void => console.warn('authorization is fail. Expected to override this action');
/******************************************************************
 *           format of ERRORS
 ******************************************************************/
/**
 * try to find explanation of error in specification
 *
 * @param {String[]|String} errors
 * @param {String} [defMessage=null]
 */

// NOTE named export only after all prepare thing
export const instanceAPI = API;
export default API;
