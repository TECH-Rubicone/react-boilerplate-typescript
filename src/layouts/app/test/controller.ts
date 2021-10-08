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
  prefix: 'sign-in',
  actions: ['updateData', 'initialize'],
  initial: {
    disabled: false,
    errorMessage: null,
    initialized: false,
    initialValues: {
      username: '',
      password: '',
      client: 'admin_application',
      radio1: 1
    },
  },
  subscriber: function * () {
    yield takeEvery(controller.action.updateData.TYPE, updateDataSaga);
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

function * updateDataSaga ({ payload }: Act<SignInPayload>) {
  yield put(controller.action.updateCtrl({ disabled: true }));
  console.log(payload);
  yield put(controller.action.updateCtrl({ disabled: false }));
}
