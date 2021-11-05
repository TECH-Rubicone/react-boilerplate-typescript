// outsource dependencies
import { Action } from 'redux';
import { AxiosPromise } from 'axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { ActionCreator, ActionCreators, Controller, create } from 'redux-saga-controller';

// services
import { instanceAPI } from 'services/api-private.service';

// constants
import * as ROUTES from 'constants/routes';

type Params = null | {
  page: number
  sort: Array<string>
  size: number | string
}

type Data = null | {
  name: string
}

function getUsers (params: Params, data: Data): AxiosPromise {
  return instanceAPI({
    url: 'admin-service/users/filter',
    method: 'POST',
    params,
    data,
  });
}

function prepareGetUsers ({ size, page, name, sortField, sortDirection }: Filters) {
  return getUsers({ size, page, sort: [`${sortField},${sortDirection ? 'DESC' : 'ASC'}`, 'id,DESC'] }, { name });
}

export interface Role {
  id: number
  name: string
}

interface Img {
  url: string
}

export interface User {
  id: number
  name: string | null
  coverImage: Img |null
  roles: Array<Role> | null
  createdDate: string | null
}

export interface Filters {
  page: number
  size: number | string
  name: string
  sortField: string
  sortDirection: boolean
}

interface Initial extends Filters {
  disabled: boolean
  initialized: boolean
  errorMessage: null | string

  selected: Array<User>
  list: Array<User>

  totalPages: number
  totalElements: number
}

// NOTE action shortcut
interface Act<Payload> extends Action {
  payload: Payload
}

interface UsersFilter {
  size: number
  offset: number
  totalPages: number
  pageNumber: number
  content: Array<User>
  totalElements: number
}

interface Selected {
  id: number
}

interface DeleteItemsPayload {
  selected: Array<Selected>
}

interface Actions extends ActionCreators<Initial> {
  initialize: ActionCreator<null>
  deleteItems: ActionCreator<DeleteItemsPayload>
  updateFilters: ActionCreator<Partial<Filters>>
}

const initialFilters: Filters = {
  // params
  page: 0,
  size: 10,
  // search
  name: '',
  // sort
  sortField: 'name',
  sortDirection: false,
};

const initial: Initial = {
  disabled: false,
  initialized: false,
  errorMessage: null,
  list: [],
  selected: [],
  totalPages: 0,
  totalElements: 0,
  ...initialFilters,
};

export const controller: Controller<Actions, Initial> = create({
  initial,
  prefix: 'users-list',
  actions: ['updateFilters', 'initialize', 'deleteItems'],
  subscriber: function * () {
    yield takeEvery(controller.action.initialize.TYPE, initializeSaga);
    yield takeEvery(controller.action.deleteItems.TYPE, deleteItemsSaga);
    yield takeEvery(controller.action.updateFilters.TYPE, updateFiltersSaga);
  },
});

// sagas
function * initializeSaga () {
  yield put(controller.action.clearCtrl());
  try {
    const query: Partial<Filters> = yield call(ROUTES.ADMINISTRATIVE_USERS_LIST.QUERY);
    yield call(updateFiltersSaga, { type: controller.action.updateFilters.TYPE, payload: query });
  } catch ({ message }) {
    yield put(controller.action.updateCtrl({ errorMessage: String(message) }));
  }
  yield put(controller.action.updateCtrl({ initialized: true }));
}

function * updateFiltersSaga ({ payload }: Act<Partial<Filters>>) {
  yield put(controller.action.updateCtrl({ disabled: true, errorMessage: null, page: 0, ...payload }));
  try {
    const reducer: Initial = yield select(controller.select);
    const { content, totalPages, totalElements, pageNumber }: UsersFilter = yield call(prepareGetUsers, reducer);
    yield put(controller.action.updateCtrl({
      totalPages,
      selected: [],
      totalElements,
      list: content,
      page: pageNumber
    }));
    yield call(
      ROUTES.ADMINISTRATIVE_USERS_LIST.REPLACE,
      {},
      { page: reducer.page, size: reducer.size, search: reducer.name }
    );
  } catch ({ message }) {
    yield put(controller.action.updateCtrl({ errorMessage: String(message) }));
  }
  yield put(controller.action.updateCtrl({ disabled: false }));
}

function * deleteItemsSaga ({ payload }: Act<DeleteItemsPayload>) {
  yield call(console.log, payload);
}
