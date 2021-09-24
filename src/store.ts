// outsource dependencies
import createSagaMiddleware from 'redux-saga';
import { createBrowserHistory } from 'history';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { reducer as controllerReducer, sagas as controllerSagas, path } from 'redux-saga-controller';

// export history outside to be able to dispatch navigation actions from anywhere
export const history = createBrowserHistory();

// NOTE Build the middleware to run our Saga
const saga = createSagaMiddleware();
export const middleware = compose(applyMiddleware(saga));

// NOTE explain to ts what is it ;) to avoid type errors for --declaration
export const reducers = combineReducers({
  [path]: controllerReducer,
  // NOTE whatever what you may need
  // ...
});
// NOTE Create store outside of root to be able dispatch actions from anywhere!
const store = createStore(reducers, middleware);

// NOTE simple initialize only "controller" sagas
saga.run(controllerSagas);

export default store;

export const historyPush = (path: string) => history.push(path);
