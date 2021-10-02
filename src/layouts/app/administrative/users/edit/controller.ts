// outsource dependencies
import { Action } from 'redux';
import { takeEvery, put, select, call } from 'redux-saga/effects';
import { ActionCreator, ActionCreators, Controller, create } from 'redux-saga-controller';

// local dependencies
import { NEW_ID } from '../../../../../services/route';
import { instanceAPI } from '../../../../../services/api.service';

type Role = {
  id: number;
  name: string;
}

export interface UserInfo {
  name: string | null
  email: string | null
  prefix: string | null
  suffix: string | null
  username: string | null
  firsName: string | null
  lastName: string | null
  roles: Array<Role> | null
  middleName: string | null
  createdDate: string | null
  coverImage: string | undefined
}

// Prepare actions
interface Act<Payload> extends Action {
  payload: Payload
}

interface InitializePayload {
    id: number | string
}

interface UpdateDataPayload {
  username: string,
}

interface Actions extends ActionCreators<Initial> {
    initialize: ActionCreator<InitializePayload>
    updateData: ActionCreator<UpdateDataPayload>
}

interface Initial {
    disabled: boolean
    initialized: boolean
    errorMessage: null | string

    id: number | string
    initialValues: UserInfo
}

// configure
const initial = {
  disabled: true,
  errorMessage: null,
  initialized: false,

  id: 160662, //NEW_ID,
  initialValues: {
    roles: [],
    name: '',
    email: '',
    prefix: '',
    suffix: '',
    username: '',
    firsName: '',
    lastName: '',
    middleName: '',
    coverImage: '',
    createdDate: ''
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

// { payload: { id }
function * initializeSaga () {
  // yield put(controller.action.updateCtrl({ id }));
  const { id } = yield select(controller.select);
  if (id) {
    const initialValues:UserInfo = yield call(instanceAPI, `admin-service/users/${id}`, { method: 'GET' });
    yield put(controller.action.updateCtrl({ initialValues }));
  }
  yield put(controller.action.updateCtrl({ initialized: true, disabled: false }));
}

function * updateDataSaga ({ payload }: Act<UpdateDataPayload>) {
  yield console.log('Payload:', payload);
}
