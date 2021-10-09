import { all, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { apiFetcher } from 'lib/apiFetcher';
import { API_ROLES_URL } from 'lib/constants';
import * as actionConstants from '../actions/actionConstants';

function* fetchRoles(params) {
  yield put({ type: actionConstants.START_ROL_ACTION });
  const query = get(params, 'query', {});
  const { page, size } = query;

  try {
    const response = yield apiFetcher(API_ROLES_URL);
    const { data } = response;
    yield put({ type: actionConstants.GET_ROLES_SUCCESS, data });
  } catch (error) {
    yield all([
      put({ type: actionConstants.FAILED_ROL_ACTION, error }),
      put({ type: actionConstants.ADD_NOTIFICATION, notification: error })
    ]);
  }
}

export default function* rootSaga() {
  yield all([takeLatest(actionConstants.GET_ROLES, fetchRoles)]);
}
