// outsource dependencies
import qs from 'qs';
import _ from 'lodash';
import { Action } from 'redux';
import { history } from 'store';
import { AxiosPromise } from 'axios';
import { call, put, select, takeEvery } from 'redux-saga/effects';
import { ActionCreator, ActionCreators, Controller, create } from 'redux-saga-controller';

// services
import { instanceAPI } from 'services/api.service';

// NOTE action shortcut
interface Act<Payload> extends Action {
  payload: Payload
}

type Params = null | {
  page: number;
  sort: string[];
  size: number | string;
}

type Data = null | {
  name: string;
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

const initialFilters: Filters = {
  // params
  page: 0,
  size: 10,
  totalPages: 0,
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
  users: [],
  selectedUsers: [],
  ...initialFilters,
};

export type TRole = null | {
  id: number;
  name: string;
}

type TImg = {
  url: string;
}

interface BaseUser {
  id: number;
  name: string;
  coverImage: TImg;
  roles: null | TRole[];
}

export interface User extends BaseUser{
  createdDate: string;
}

export interface Filters {
  [key: string]: any;
  page: number;
  size: number | string;
  name: string;
  sortField: string;
  totalPages: number;
  sortDirection: boolean;
}

interface Initial extends Filters{
  [key: string]: any;
  users: User[],
  disabled: boolean,
  initialized: boolean,
  selectedUsers: User[],
  errorMessage: null | string,
}

type InitializePayload = null;

interface Actions extends ActionCreators<Initial> {
  initialize: ActionCreator<InitializePayload>;
  updateFilters: ActionCreator<Filters>;
}

export const controller: Controller<Actions, Initial> = create({
  prefix: 'users-list',
  initial,
  actions: ['updateFilters', 'initialize'],
  subscriber: function * () {
    yield takeEvery(controller.action.initialize.TYPE, initializeSaga);
    yield takeEvery(controller.action.updateFilters.TYPE, updateFiltersSaga);
  },
});

// sagas
function * initializeSaga () {
  yield put(controller.action.clearCtrl());
  try {
    const data: Filters = yield call(getQueryParams);
    yield call(updateLocation, data);
    yield put(controller.action.updateFilters(data));
  } catch ({ message }) {
    yield put(controller.action.updateCtrl({ errorMessage: message as string }));
  }
  yield put(controller.action.updateCtrl({ initialized: true }));
}

interface UsersFilter {
  size: number;
  offset: number;
  content: User[];
  totalPages: number;
  pageNumber: number;
  totalElements: number;
}

function * updateFiltersSaga ({ payload }: Act<Filters>) {
  yield put(controller.action.updateCtrl({ disabled: true, errorMessage: null, ...payload }));
  try {
    const reducer: Initial = yield select(controller.select);
    const { content, totalPages, pageNumber }: UsersFilter = yield call(prepareGetUsers, reducer);
    yield call(updateLocation, reducer);
    yield put(controller.action.updateCtrl({ selected: [], users: content, totalPages, page: pageNumber }));
  } catch ({ message }) {
    yield put(controller.action.updateCtrl({ errorMessage: message as string }));
  }
  yield put(controller.action.updateCtrl({ disabled: false }));
}

// helpers
function getQueryParams (): Filters {
  const result = { ...initialFilters };
  const query = qs.parse(history.location.search.slice(1));

  for (const field of MAP.fields) {
    const data = query[MAP.keys[field]];
    if (data) {
      result[field] = data;
    }
  }
  // NOTE fix page type
  const incorrectTypes = ['page', 'size'];
  for (const type of incorrectTypes) {
    _.isString(result[type]) && (result[type] = Number(result[type]));
  }
  return result;
}

function updateLocation (data: Filters) {
  const query = {} as Filters;
  for (const field of MAP.fields) {
    if (!_.isEqual(data[field], initialFilters[field])) {
      query[MAP.keys[field]] = data[field];
    }
  }
}

interface MAP {
  [key: string]: any;
}

const MAP: MAP = {
  fields: ['size', 'page', 'name', 'sort'],
  keys: {
    size: 's',
    page: 'p',
    name: 'n',
    sort: 's',
  }
};
