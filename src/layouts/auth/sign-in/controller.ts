// outsource dependencies
import { Action } from 'redux';
import { put, call, takeEvery } from 'redux-saga/effects';

// local dependencies
import { historyPush } from 'store';
import { USERS } from 'constants/routes';
import { instanceAPI, instancePUB } from 'services/api.service';
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

interface ITokenData {
  accessToken: string,
  refreshToken: string,
  accessTokenValiditySeconds: number,
  refreshTokenValiditySeconds: number,
}

interface IInitial {
  disabled: boolean,
  initialized: boolean,
  initialValues: SignInPayload,
  errorMessage: string | null | unknown,
}

interface IActions extends ActionCreators<IInitial> {
  signIn: ActionCreator<SignInPayload>;
}

const controller: Controller<IActions, IInitial> = create({
  prefix: 'sign-in',
  actions: ['signIn', 'initialize'],
  initial: {
    disabled: false,
    errorMessage: null,
    initialized: false,
    initialValues: {
      username: '',
      password: '',
      client: 'admin_application',
    },
  },
  subscriber: function * () {
    yield takeEvery(controller.action.signIn.TYPE, signInSaga);
    yield takeEvery(controller.action.initialize.TYPE, initializeSaga);
  }
});

export default controller;

// sagas
function * initializeSaga () {
  yield put(controller.action.clearCtrl());
  yield put(controller.action.updateCtrl({ initialized: true }));
}

function * signInSaga ({ payload }: Act<SignInPayload>) {
  yield put(controller.action.clearCtrl());
  yield put(controller.action.updateCtrl({ disabled: true, errorMessage: null }));
  try {
    const session: ITokenData = yield call(instancePUB, '/auth/token', { method: 'POST', data: payload });
    yield call(instanceAPI.setupSession, session);
    // yield call(instanceAPI.setupSession, session);
    yield call(historyPush, USERS.ROOT);
  } catch ({ message }) {
    yield put(controller.action.updateCtrl({ errorMessage: message }));
    alert(`ERROR ${message}`);
  }
  yield put(controller.action.updateCtrl({ disabled: false }));
}
