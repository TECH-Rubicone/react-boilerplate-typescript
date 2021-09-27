// outsource dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

// services
import { history } from 'services/route';

// local dependencies
import App from './layouts';
import store from './store';
import reportWebVitals from './reportWebVitals';

// styles
import './styles';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <ToastContainer
          closeOnClick
          pauseOnHover
          theme="colored"
          pauseOnFocusLoss
          autoClose={5000}
          newestOnTop={false}
          position="top-right"
        />
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
