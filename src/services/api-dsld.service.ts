// outsource dependencies
import axios from 'axios';

// configs
import config from 'configs';

// local dependencies
import { paramsSerializer, prepareError, prepareResponse } from './api-helpers.service';

// configure
export const API_PATH = config.DSLD_URL + config.DSLD_PATH + config.DSLD_VERSION;

/******************************************************************
 *           DSLD  requester instance
 ******************************************************************/
/**
 * axios instance prepared for app
 */
const DSLD = axios.create({
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
DSLD.interceptors.response.use(
  prepareResponse,
  prepareError
);

// NOTE named export only after all prepare thing
export const instanceDSLD = DSLD;
export default DSLD;
