import { create } from 'redux-saga-controller';
import { put, takeEvery } from 'redux-saga/effects';

const initial = {
  disabled: false,
  errorMessage: null,
  initialized: false,
  open: false,
};

export const controller = create({
  prefix: 'layout',
  initial,
  actions: ['initialize'],
  subscriber: function * () {
    yield takeEvery(controller.action.initialize.TYPE, initializeSaga);
  },
});
export default controller;

function * initializeSaga () {
  yield put(controller.action.updateCtrl({ initialized: true }));
}
