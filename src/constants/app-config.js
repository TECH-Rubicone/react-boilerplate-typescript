/* eslint-disable */

'use strict';

/*-------------------------------------------------
    Source of this template in root directory
    environment/config.template.js
    this is only example which you may define any structure
---------------------------------------------------*/
/**
 * app configuration from environment
 * @typedef {Object} config
 * @property {Number}       timestamp
 * @property {String}       version
 * @property {Boolean}      production
 * @property {String}       baseUrl
 * @property {String}       apiPath
 * @property {String}       serviceUrl
 * @property {String}       websiteUrl
 */
export default {
  "timestamp": 1631867336376,
  "version": "1.0.0",
  "baseUrl": "/",
  "production": false,
  "clientTimeFormat": "D MMMM YYYY",
  "serviceUrl": "https://healthene-gateway-dev.intelliceed.cf",
  "websiteUrl": "https://admin-dev.intelliceed.cf",
  "clinicUrl": "https://clinic-dev.intelliceed.cf",
  "foodServiceUrl": "https://fs-dev.intelliceed.cf",
  "apiPath": "/api"
}
