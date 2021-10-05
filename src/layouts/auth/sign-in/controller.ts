// outsource dependencies
import { Action } from 'redux';
import { toast } from 'react-toastify';
import { put, call, takeEvery, select } from 'redux-saga/effects';
import { ActionCreator, ActionCreators, Controller, create } from 'redux-saga-controller';

// local dependencies
import * as ROUTES from 'constants/routes';
import { instanceAPI, instancePUB } from 'services/api.service';
import { showWelcomeToast, dismissToast } from 'components/toast';
import { controller as rootController, Initial as RootInitial } from 'layouts/controller';

// NOTE action shortcut
interface Act<Payload> extends Action {
  payload: Payload
}

interface SignInPayload {
  username: string,
  password: string,
  checked: boolean,
  client: string,
}

interface TokenDto {
  accessToken: string,
  refreshToken: string,
  accessTokenValiditySeconds: number,
  refreshTokenValiditySeconds: number,
}

interface Initial {
  disabled: boolean,
  initialized: boolean,
  initialValues: SignInPayload,
  errorMessage: string | null | unknown,
}

interface Actions extends ActionCreators<Initial> {
  signIn: ActionCreator<SignInPayload>;
}

export const controller: Controller<Actions, Initial> = create({
  prefix: 'sign-in',
  actions: ['signIn', 'initialize'],
  initial: {
    disabled: false,
    errorMessage: null,
    initialized: false,
    initialValues: {
      username: '',
      password: '',
      checked: false,
      client: 'admin_application',
    },
  },
  subscriber: function * () {
    yield takeEvery(controller.action.signIn.TYPE, signInSaga);
    yield takeEvery(controller.action.initialize.TYPE, initializeSaga);
  }
});
function * initializeSaga () {
  const { user } : RootInitial = yield select(rootController.select);
  if (user) {
    yield call(showWelcomeToast, user);
  }
  yield put(controller.action.updateCtrl({ initialized: true }));
}

function * signInSaga ({ payload }: Act<SignInPayload>) {
  yield call(dismissToast);
  yield put(controller.action.updateCtrl({ disabled: true, errorMessage: null }));
  try {
    const session: TokenDto = yield call(instancePUB, '/auth/token', { method: 'POST', data: payload });
    yield call(instanceAPI.setupSession, session);
    yield call(toast.success, 'Welcome! We are really glad to see you!');
    yield call(ROUTES.APP.PUSH);
  } catch ({ message }) {
    yield put(controller.action.updateCtrl({ errorMessage: String(message) }));
    yield call(toast.error, String(message));
  }
  yield put(controller.action.updateCtrl({ disabled: false }));
}
