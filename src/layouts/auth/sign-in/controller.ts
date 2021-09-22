// outsource dependencies
import { Action } from 'redux';
import { put, call, takeEvery } from 'redux-saga/effects';
import { ActionCreators, ActionCreator, Controller, create } from 'redux-saga-controller';

// local dependencies
import { historyPush } from 'store';
import { LAYOUT_TEST } from 'constants/routes';
import { instanceAPI, instancePUB } from 'services/api.service';

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
  errorMessage: string | null | unknown,
  data: ITokenData | null,
  initialValues: SignInPayload,
}

interface IActions extends ActionCreators<IInitial> {
  signIn: ActionCreator<SignInPayload>;
}

const controller: Controller<IActions, IInitial> = create({
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
function * signInSaga ({ payload }: Act<SignInPayload>) {
  yield put(controller.action.clearCtrl());
  yield put(controller.action.updateCtrl({ disabled: true, errorMessage: 'null' }));
  try {
    const session: ITokenData = yield call(instancePUB, '/auth/token', { method: 'POST', data: payload });
    yield call(instanceAPI.setupSession, session);
    yield call(historyPush, LAYOUT_TEST);
  } catch ({ message }) {
    yield put(controller.action.updateCtrl({ errorMessage: message }));
    alert(`ERROR ${message}`);
  }
  yield put(controller.action.updateCtrl({ disabled: false }));
}
