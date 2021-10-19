// outsource dependencies
import { Action } from 'redux';
import { toast } from 'react-toastify';
import { takeEvery, put, call, select } from 'redux-saga/effects';
import { ActionCreator, ActionCreators, Controller, create } from 'redux-saga-controller';

// services
import { NEW_ID } from 'services/route';
import { instanceAPI } from 'services/api-private.service';

// constants
import * as ROUTES from 'constants/routes';

// interfaces
import { EntityContentDto } from 'interfaces/api';

export interface UserInfo {
  name: string | null
  email: string | null
  prefix: string | null
  suffix: string | null
  username: string | null
  lastName: string | null
  firstName: string | null
  middleName: string | null
  createdDate: string | null
  coverImage: string | undefined
  roles: Array<EntityContentDto> | null
}

// Prepare actions
interface Act<Payload> extends Action {
  payload: Payload
}

interface InitializePayload {
  id: string
}

interface UpdateDataPayload {
  username: string
}

interface Actions extends ActionCreators<Initial> {
  initialize: ActionCreator<InitializePayload>
  updateData: ActionCreator<UpdateDataPayload>
}

interface Initial {
  disabled: boolean
  initialized: boolean
  errorMessage: null | string

  id: string
  initialValues: UserInfo
}

// configure
const initial = {
  disabled: true,
  errorMessage: null,
  initialized: false,

  id: NEW_ID,
  initialValues: {
    roles: [],
    name: '',
    email: '',
    prefix: '',
    suffix: '',
    username: '',
    lastName: '',
    firstName: '',
    coverImage: '',
    middleName: '',
    createdDate: '',
  }
};

export const controller: Controller<Actions, Initial> = create({
  initial,
  prefix: 'user-edit',
  actions: ['initialize', 'updateData'],
  subscriber: function * () {
    yield takeEvery(controller.action.initialize.TYPE, initializeSaga);
    yield takeEvery(controller.action.updateData.TYPE, updateDataSaga);
  },
});
export default controller;

function * initializeSaga ({ payload: { id } }: Act<InitializePayload>) {
  yield put(controller.action.updateCtrl({ id }));
  try {
    if (id !== NEW_ID) {
      const initialValues: UserInfo = yield call(instanceAPI, `admin-service/users/${id}`, { method: 'GET' });
      yield put(controller.action.updateCtrl({ initialValues }));
    }
  } catch ({ message }) {
    yield put(controller.action.updateCtrl({ errorMessage: String(message) }));
    yield call(toast, `Error: ${message}`);
  }
  yield put(controller.action.updateCtrl({ initialized: true, disabled: false }));
}

function * updateDataSaga ({ payload }: Act<UpdateDataPayload>) {
  yield put(controller.action.updateCtrl({ disabled: true }));
  const { id }: Partial<Initial> = yield select(controller.select);
  try {
    yield call(instanceAPI, 'admin-service/users', { method: id === NEW_ID ? 'POST' : 'PUT', data: payload });
    yield call(toast.success, 'Success');
    yield call(ROUTES.ADMINISTRATIVE_USERS_LIST.PUSH);
  } catch ({ message }) {
    yield put(controller.action.updateCtrl({ errorMessage: String(message) }));
    yield call(toast, `Error: ${message}`);
  }
  yield put(controller.action.updateCtrl({ disabled: false }));
}
