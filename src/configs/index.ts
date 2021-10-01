// outsource dependencies

interface Config {
  DEBUG: boolean,
  VERSION?: string,
  BASE_URL?: string,
  API_PATH?: string,
  SERVICE_URL?: string,
  CLIENT_TIME_FORMAT?: string
}

const config: Config = {
  VERSION: process.env.REACT_APP_VERSION,
  BASE_URL: process.env.REACT_APP_BASE_URL,
  API_PATH: process.env.REACT_APP_API_PATH,
  SERVICE_URL: process.env.REACT_APP_SERVICE_URL,
  CLIENT_TIME_FORMAT: process.env.REACT_APP_CLIENT_TIME_FORMAT,
  // complex properties
  DEBUG: process.env.REACT_APP_DEBUG === String(true),
};

// ON debug mode for production using url params
config.DEBUG = config.DEBUG ? true : /show_DEBUG/.test(window.location.href);

if (config.DEBUG) {
  console.info('%c CONFIG', 'background: #EC1B24; color: #000; font-weight: bolder; font-size: 30px;'
    , '\n config:', config
    , '\n ENV:', process.env
    , '\n NODE_ENV:', process.env.NODE_ENV
    , '\n REACT_APP_ENV:', process.env.REACT_APP_ENV
  );
}

export default config;
