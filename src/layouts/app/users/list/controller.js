// outsource dependencies
import qs from 'qs';
import _ from 'lodash';
import { create } from 'redux-saga-controller';
import { call, put, select, takeEvery } from 'redux-saga/effects';

// local dependencies
import { history } from 'store';
import { instanceAPI } from 'services/api.service';

function getUsers (params, data) {
  return instanceAPI({
    url: 'admin-service/users/filter',
    method: 'POST',
    params,
    data,
  });
}

function prepareGetUsers ({ size, page, name }) {
  return getUsers({ size, page }, { name });
}

const initialFilters = {
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

const initial = {
  disabled: false,
  initialized: false,
  errorMessage: null,
  users: [],
  selectedUsers: [],
  ...initialFilters,
};

export const controller = create({
  prefix: 'users-list',
  initial,
  actions: ['updateFilters', 'initialize', 'deleteItems'],
  subscriber: function * () {
    yield takeEvery(controller.action.initialize.TYPE, initializeSaga);
    yield takeEvery(controller.action.updateFilters.TYPE, updateFiltersSaga);
  },
});

// sagas
function * initializeSaga () {
  yield put(controller.action.clearCtrl());
  try {
    const data = yield call(getQueryParams);
    yield call(updateLocation, data);
    yield put(controller.action.updateFilters(data));
  } catch ({ message }) {
    yield put(controller.action.updateCtrl({ errorMessage: message }));
  }
  yield put(controller.action.updateCtrl({ initialized: true }));
}

function * updateFiltersSaga ({ payload }) {
  yield put(controller.action.updateCtrl({ disabled: true, errorMessage: null, page: 0, ...payload }));
  try {
    const reducer = yield select(controller.select);
    const { content, totalPages, pageNumber } = yield call(prepareGetUsers, reducer);
    yield call(updateLocation, reducer);
    yield put(controller.action.updateCtrl({ selected: [], users: content, totalPages, page: pageNumber }));
  } catch ({ message }) {
    yield put(controller.action.updateCtrl({ errorMessage: message }));
  }
  yield put(controller.action.updateCtrl({ disabled: false }));

}

// helpers
function getQueryParams () {
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

function updateLocation (data) {
  const query = {};
  for (const field of MAP.fields) {
    if (!_.isEqual(data[field], initialFilters[field])) {
      query[MAP.keys[field]] = data[field];
    }
  }
}

const MAP = {
  fields: ['size', 'page', 'name', 'sort'],
  keys: {
    size: 's',
    page: 'p',
    name: 'n',
    sort: 's',
  }
};
