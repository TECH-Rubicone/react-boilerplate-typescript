import { call, delay, put, takeEvery } from 'redux-saga/effects';
import { ActionCreator, ActionCreators, Controller, create } from 'redux-saga-controller';

import { getAccessToken, instanceAPI, instancePUB } from '../services/api.service';

type IPermission = {
  id: number;
  name: string;
};

type Role = {
  id: number;
  name: string;
}

type Image = {
  url: string;
}

export type Me = null | {
  id: number;
  name: string;
  roles: Role[];
  username: string;
  enabled: boolean;
  coverImage: Image;
  clinicRole: string;
  createdDate: string;
  hasDrChronoToken: boolean;
  permissions: IPermission[];
}

interface Initial {
  health: boolean;
  disabled: boolean;
  user: Me | null;
  initialized: boolean;
  accessToken: string | null;
}

type InitializePayload = null;

interface Actions extends ActionCreators<Initial>{
  // getSelf: ActionCreator<GetSelfPayload>,
  initialize: ActionCreator<InitializePayload>,
}

const controller: Controller<Actions, Initial> = create({
  prefix: 'root',
  actions: ['initialize', 'getSelf'],
  initial: {
    user: null,
    health: false,
    disabled: true,
    accessToken: null,
    initialized: false,
  },
  subscriber: function * () {
    yield takeEvery(controller.action.initialize.TYPE, initializeSaga);
  }
});

function * initializeSaga () {
  yield put(controller.action.clearCtrl());
  try {
    const { status }: {status: string} = yield call(instancePUB, '/actuator/health', { method: 'GET' });
    if (status !== 'UP') {
      throw new Error('API down for maintenance');
    }
    yield delay(1000);
    yield put(controller.action.updateCtrl({ health: true }));
  } catch ({ message }) {
    yield put(controller.action.updateCtrl({ health: false }));
    // NOTE try again another time
    yield delay(10000);
    yield put(controller.action.initialize());
    return;
  }
  // NOTE try to restore user auth
  yield delay(1000);
  try {
    const hasSession: boolean = yield call(instanceAPI.restoreSessionFromStore);
    if (hasSession) {
      yield call(getSelfExecutor);
      yield put(controller.action.updateCtrl({ accessToken: getAccessToken() }));
    }
  } catch ({ message }) {
    yield call(signOutSaga);
  }
  // yield call(historyPush, ROUTES.ADMINISTRATIVE_USERS.LINK());
  // NOTE initialization done
  yield put(controller.action.updateCtrl({ initialized: true }));
}

function * signOutSaga () {
  try {
    yield call(instanceAPI, '/auth/logout', { method: 'POST' });
  } catch ({ message }) {
    console.error('SIGN_OUT', message);
  }
  // NOTE clear client side session from store
  yield call(instanceAPI.setupSession, null);
  yield put(controller.action.updateCtrl({ user: null })); // redirect to signIn
}

function * getSelfExecutor () {
  const user: Me = yield call(instanceAPI, 'auth/users/me', { method: 'GET' });
  yield put(controller.action.updateCtrl({ user }));
}

export default controller;
