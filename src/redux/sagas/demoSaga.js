import { all, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { apiFetcher } from 'lib/apiFetcher';
import * as actionConstants from '../actions/actionConstants';

const url = '/comunication/getAllInvoicesOfClient';

function* fetchDemoData(params) {
  yield put({ type: actionConstants.START_DEMO_DATA_ACTION });
  const query = get(params, 'query', {});
  const { page, size } = query;

  try {
    const response = yield apiFetcher(`${url}`);
    const { data } = response;
    yield put({ type: actionConstants.GET_DEMO_DATA_SUCCESS, data });
  } catch (error) {
    yield all([
      put({ type: actionConstants.FAILED_DEMO_DATA_ACTION, error }),
      put({ type: actionConstants.ADD_NOTIFICATION, notification: error })
    ]);
  }
}

function* searchDemoData(params) {
  yield put({ type: actionConstants.START_DEMO_DATA_ACTION });
  const { query } = params;

  try {
    const response = yield apiFetcher(`${url}?name.contains=${query}`);
    const { data } = response;
    const count = yield apiFetcher(`${url}/count?name.contains=${query}`);
    const { data: total } = count;
    yield put({ type: actionConstants.GET_DEMO_DATA_SUCCESS, data, total });
  } catch (error) {
    yield all([
      put({ type: actionConstants.FAILED_DEMO_DATA_ACTION, error }),
      put({ type: actionConstants.ADD_NOTIFICATION, notification: error })
    ]);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actionConstants.GET_DEMO_DATA, fetchDemoData),
    takeLatest(actionConstants.SEARCH_DEMO_DATA, searchDemoData)
  ]);
}
