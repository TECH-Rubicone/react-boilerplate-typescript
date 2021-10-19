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

type ImageDto = {
  img: string | null
}

export interface AdminFullUserDto {
  name: string | null
  email: string | null
  prefix: string | null
  suffix: string | null
  username: string | null
  lastName: string | null
  firstName: string | null
  middleName: string | null
  createdDate: string | null
  coverImage: ImageDto | null
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
  initialValues: AdminFullUserDto
}

// configure
const initial = {
  disabled: true,
  errorMessage: null,
  initialized: false,

  id: NEW_ID,
  initialValues: {
    roles: [],
    name: null,
    email: null,
    prefix: null,
    suffix: null,
    username: null,
    lastName: null,
    firstName: null,
    coverImage: null,
    middleName: null,
    createdDate: null,
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
      const initialValues: AdminFullUserDto = yield call(instanceAPI, `admin-service/users/${id}`, { method: 'GET' });
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
