// outsource dependencies
import { call, delay, put, takeEvery } from 'redux-saga/effects';
import { ActionCreator, ActionCreators, Controller, create } from 'redux-saga-controller';

// constants
import { API_NAMES } from '../constants/api';

// services
import storage from '../services/storage.service';
import { instancePUB } from 'services/api-public.service';
import { instanceAPI, restoreSessionFromStore, setupSession, getToken } from 'services/api-private.service';

type Permission = {
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
  permissions: Permission[];
}

export interface Initial {
  auth: boolean;
  user: Me | null;
  health: boolean;
  disabled: boolean;
  initialized: boolean;
  errorMessage: string;
  token: {
    accessToken: string | null,
    refreshToken: string | null,
    accessTokenValiditySeconds?: number | null,
    refreshTokenValiditySeconds?: number | null,
  };
}

type InitializePayload = null;

interface Actions extends ActionCreators<Initial>{
  // getSelf: ActionCreator<GetSelfPayload>,
  initialize: ActionCreator<InitializePayload>,
}

export const controller: Controller<Actions, Initial> = create({
  prefix: 'root',
  actions: ['initialize', 'getSelf', 'signOut', 'getSelfExecutor'],
  initial: {
    user: null,
    auth: true,
    health: false,
    disabled: true,
    errorMessage: '',
    initialized: false,
    token: {
      accessToken: '',
      refreshToken: '',
      accessTokenValiditySeconds: null,
      refreshTokenValiditySeconds: null
    },
  },
  subscriber: function * () {
    yield takeEvery(controller.action.initialize.TYPE, initializeSaga);
    yield takeEvery(controller.action.signOut.TYPE, signOutSaga);
    yield takeEvery(controller.action.getSelfExecutor.TYPE, getSelfExecutor);
  }
});

function * initializeSaga () {
  yield put(controller.action.clearCtrl());
  try {
    const { status }: {status: string} = yield call(instancePUB, '/actuator/health', { method: 'GET' });
    if (status !== 'UP') {
      throw new Error('API down for maintenance');
    }
    yield put(controller.action.updateCtrl({ health: true }));
  } catch ({ message }) {
    yield put(controller.action.updateCtrl({ health: false }));
    // NOTE try again another time
    yield delay(10 * 1000);
    yield put(controller.action.initialize());
    return;
  }
  // NOTE try to restore user auth
  try {
    const hasSession: boolean = yield call(restoreSessionFromStore);
    if (hasSession) {
      yield call(getSelfExecutor);
      const {
        accessToken,
        refreshToken,
        accessTokenValiditySeconds,
        refreshTokenValiditySeconds
      } = yield call(getToken);
      yield put(controller.action.updateCtrl({
        token: { accessToken, refreshToken, refreshTokenValiditySeconds, accessTokenValiditySeconds }
      }));
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
    yield put(controller.action.updateCtrl({
      token: {
        accessToken: null,
        refreshToken: null,
        accessTokenValiditySeconds: null,
        refreshTokenValiditySeconds: null
      },
      auth: false
    }));
    yield call(storage.remove, API_NAMES.AUTH_STORE);
  } catch ({ message }) {
    yield put(controller.action.updateCtrl({ errorMessage: String(message) }));
  }
  // NOTE clear client side session from store
  yield call(setupSession, null);
  yield put(controller.action.updateCtrl({ user: null })); // redirect to signIn
}

function * getSelfExecutor () {
  const user: Me = yield call(instanceAPI, 'auth/users/me', { method: 'GET' });
  yield put(controller.action.updateCtrl({ user }));
}
