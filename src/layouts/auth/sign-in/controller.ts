// outsource dependencies
import { Action } from 'redux';
import { toast } from 'react-toastify';
import { put, call, takeEvery, select } from 'redux-saga/effects';
import { ActionCreator, ActionCreators, Controller, create } from 'redux-saga-controller';

// local dependencies
import { controller as rootController, Initial as RootInitial } from 'layouts/controller';

// components
import { showWelcomeToast, dismissToast } from 'components/toast';

// constants
import * as ROUTES from 'constants/routes';

// interfaces
import { OAuth2AccessTokenDto } from 'interfaces/api';

// services
import { instancePUB } from 'services/api-public.service';
import { setupSession } from 'services/api-private.service';

// NOTE action shortcut
interface Act<Payload> extends Action {
  payload: Payload
}

interface SignInPayload {
  client: string,
  password: string,
  username: string,
}

interface Initial {
  disabled: boolean,
  initialized: boolean,
  errorMessage: string,
  initialValues: SignInPayload,
}

interface Actions extends ActionCreators<Initial> {
  signIn: ActionCreator<SignInPayload>;
}

export const controller: Controller<Actions, Initial> = create({
  prefix: 'sign-in',
  actions: ['signIn', 'initialize'],
  initial: {
    disabled: false,
    errorMessage: '',
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

function * initializeSaga () {
  const { user } : RootInitial = yield select(rootController.select);
  if (user) {
    yield call(showWelcomeToast, user);
  }
  yield put(controller.action.updateCtrl({ initialized: true }));
}

function * signInSaga ({ payload }: Act<SignInPayload>) {
  yield put(controller.action.updateCtrl({ disabled: true, errorMessage: '' }));
  yield put(rootController.action.updateCtrl({ auth: true }));
  try {
    const session: OAuth2AccessTokenDto = yield call(instancePUB, '/auth/token', { method: 'POST', data: payload });
    yield call(dismissToast);
    yield call(setupSession, session);
    yield call(toast.success, 'Welcome! We are really glad to see you!');
    yield call(ROUTES.APP.PUSH);
  } catch ({ message }) {
    yield put(controller.action.updateCtrl({ errorMessage: String(message) }));
    yield call(toast.error, String(message));
  }
  yield put(controller.action.updateCtrl({ disabled: false }));
}
