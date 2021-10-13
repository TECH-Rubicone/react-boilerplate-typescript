// outsource dependencies
import { Action } from 'redux';
import { put, takeEvery } from 'redux-saga/effects';
import { ActionCreator, ActionCreators, Controller, create } from 'redux-saga-controller';

// NOTE action shortcut
interface Act<Payload> extends Action {
  payload: Payload
}

interface SignInPayload {
  username: string,
  password: string,
  client: string,
}

interface Initial {
  disabled: boolean,
  initialized: boolean,
  initialValues: SignInPayload,
  errorMessage: string | null | unknown,
}

interface Actions extends ActionCreators<Initial> {
  updateData: ActionCreator<SignInPayload>;
}

export const controller: Controller<Actions, Initial> = create({
  prefix: 'test',
  actions: ['updateData', 'initialize'],
  initial: {
    disabled: false,
    errorMessage: null,
    initialized: false,
    initialValues: {
      username: '',
      password: '',
      client: 'admin_application',
      radio1: 1,
      fsyncMultiple: [],
      fAsyncMultiple: [],
    },
  },
  subscriber: function * () {
    yield takeEvery(controller.action.updateData.TYPE, updateDataSaga);
    yield takeEvery(controller.action.initialize.TYPE, initializeSaga);
  }
});

function * initializeSaga () {
  yield put(controller.action.updateCtrl({ initialized: true }));
}

function * updateDataSaga ({ payload }: Act<SignInPayload>) {
  yield put(controller.action.updateCtrl({ disabled: true }));
  console.log(payload);
  yield put(controller.action.updateCtrl({ disabled: false }));
}
