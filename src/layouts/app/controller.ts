// outsource dependencies
import { put, takeEvery } from 'redux-saga/effects';
import { ActionCreator, ActionCreators, Controller, create } from 'redux-saga-controller';

export interface Initial {
  open: boolean;
  disabled: boolean;
  initialized: boolean;
  errorMessage: string;
}

type InitializePayload = null;

interface Actions extends ActionCreators<Initial>{
  initialize: ActionCreator<InitializePayload>,
}

export const controller: Controller<Actions, Initial> = create({
  prefix: 'app',
  actions: ['initialize'],
  initial: {
    open: false,
    disabled: true,
    errorMessage: '',
    initialized: false,
  },
  subscriber: function * () {
    yield takeEvery(controller.action.initialize.TYPE, initializeSaga);
  },
});
export default controller;

function * initializeSaga () {
  yield put(controller.action.updateCtrl({ initialized: true }));
}
