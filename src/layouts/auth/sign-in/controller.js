// outsource dependencies
import { create } from 'redux-saga-controller';
import { put, call, takeEvery } from 'redux-saga/effects';

// local dependencies
import { historyPush } from '../../../store';
import { LAYOUT_TEST } from '../../../constants/routes';
import { instanceAPI, instancePUB } from '../../../services/api.service';

const controller = create({
  prefix: 'sign-in',
  actions: ['signIn'],
  initial: {
    disabled: false,
    errorMessage: null,

    data: null,
    initialValues: {
      username: '',
      password: '',
      client: 'admin_application',
    },
  },
  subscriber: function * () {
    yield takeEvery(controller.action.signIn.TYPE, signInSaga);
  }
});

export default controller;

// sagas
function * signInSaga ({ payload }) {
  yield put(controller.action.clearCtrl());
  yield put(controller.action.updateCtrl({ disabled: true, errorMessage: 'null' }));
  try {
    const session = yield call(instancePUB, { method: 'POST', url: '/auth/token', data: payload });
    yield call(instanceAPI.setupSession, session);
    yield call(historyPush, LAYOUT_TEST);
  } catch ({ message }) {
    yield put(controller.action.updateCtrl({ errorMessage: message }));
    alert(`ERROR ${message}`);
  }
  yield put(controller.action.updateCtrl({ disabled: false }));
}
