import { all, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { apiFetcher } from 'lib/apiFetcher';
import { API_USERS_URL, DELETE, POST, PUT } from 'lib/constants';
import * as actionConstants from '../actions/actionConstants';

function* fetchUsers(params) {
  yield put({ type: actionConstants.START_USER_ACTION });
  const query = get(params, 'user', {});
  try {
    const response = yield apiFetcher(API_USERS_URL, { params: query });
    const { data } = response;
    yield put({ type: actionConstants.GET_USERS_SUCCESS, data });
  } catch (error) {
    yield all([
      put({ type: actionConstants.FAILED_USER_ACTION, error }),
      put({ type: actionConstants.ADD_NOTIFICATION, notification: error })
    ]);
  }
}

function* registerUser(params) {
  yield put({ type: actionConstants.START_USER_ACTION });
  const userData = get(params, 'user', {});

  try {
    yield apiFetcher(API_USERS_URL, { data: userData, method: POST });
    yield put({ type: actionConstants.CREATE_USER_SUCCESS });
  } catch (error) {
    yield all([
      put({ type: actionConstants.FAILED_USER_ACTION, error }),
      put({ type: actionConstants.ADD_NOTIFICATION, notification: error })
    ]);
  }
}

function* updateUser(params) {
  yield put({ type: actionConstants.START_USER_ACTION });
  const userData = get(params, 'user', {});

  try {
    yield apiFetcher(API_USERS_URL, { data: userData, method: PUT });
    yield put({ type: actionConstants.UPDATE_USER_SUCCESS });
  } catch (error) {
    yield all([
      put({ type: actionConstants.FAILED_USER_ACTION, error }),
      put({ type: actionConstants.ADD_NOTIFICATION, notification: error })
    ]);
  }
}

function* searchUser(params) {
  yield put({ type: actionConstants.START_USER_ACTION });
  const { query } = params;

  try {
    const response = yield apiFetcher(`${API_USERS_URL}?name.contains=${query}`);
    const { data } = response;
    const count = yield apiFetcher(`${API_USERS_URL}/count?name.contains=${query}`);
    const { data: total } = count;
    yield put({ type: actionConstants.GET_USERS_SUCCESS, data, total });
  } catch (error) {
    yield all([
      put({ type: actionConstants.FAILED_USER_ACTION, error }),
      put({ type: actionConstants.ADD_NOTIFICATION, notification: error })
    ]);
  }
}

function* deleteUser(params) {
  yield put({ type: actionConstants.START_USER_ACTION });
  const { username } = params;
  try {
    const response = yield apiFetcher(`${API_USERS_URL}/${username}`, { method: DELETE });
    const { data } = response;
    yield put({ type: actionConstants.DELETE_USERS_SUCCESS, data });
  } catch (error) {
    console.log(error);
    yield all([
      put({ type: actionConstants.FAILED_USER_ACTION, error }),
      put({ type: actionConstants.ADD_NOTIFICATION, notification: error })
    ]);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actionConstants.CREATE_USER, registerUser),
    takeLatest(actionConstants.GET_USERS, fetchUsers),
    takeLatest(actionConstants.SEARCH_USER, searchUser),
    takeLatest(actionConstants.UPDATE_USER, updateUser),
    takeLatest(actionConstants.DELETE_USER, deleteUser)
  ]);
}
