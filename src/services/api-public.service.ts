// outsource dependencies
import axios from 'axios';

// local dependencies
import { paramsSerializer, prepareError, prepareResponse } from './api-helpers.service';

// constants
import { API_PATH } from 'constants/api';

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

// NOTE named export only after all prepare thing
export const instancePUB = PUB;
export default PUB;
