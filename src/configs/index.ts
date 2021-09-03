// outsource dependencies

const config = {
  ...process.env,
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
