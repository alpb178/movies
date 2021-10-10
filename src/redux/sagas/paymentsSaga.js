import { all, put, takeLatest } from 'redux-saga/effects';
import { get } from 'lodash';
import { apiFetcher } from 'lib/apiFetcher';
import { API_PAYMENTS_URL, DELETE, POST, PUT } from 'lib/constants';
import * as actionConstants from '../actions/actionConstants';

function* fetchPayments(params) {
  yield put({ type: actionConstants.START_PAYMENT_ACTION });
  const query = get(params, 'payment', {});
  try {
    const response = yield apiFetcher(API_PAYMENTS_URL, { params: query });
    const { data } = response;
    yield put({ type: actionConstants.GET_PAYMENTS_SUCCESS, data });
  } catch (error) {
    yield all([
      put({ type: actionConstants.FAILED_PAYMENT_ACTION, error }),
      put({ type: actionConstants.ADD_NOTIFICATION, notification: error })
    ]);
  }
}

function* registerPayment(params) {
  yield put({ type: actionConstants.START_PAYMENT_ACTION });
  const paymentData = get(params, 'payment', {});

  try {
    yield apiFetcher(API_PAYMENTS_URL, { data: paymentData, method: POST });
    yield put({ type: actionConstants.CREATE_PAYMENT_SUCCESS });
  } catch (error) {
    yield all([
      put({ type: actionConstants.FAILED_PAYMENT_ACTION, error }),
      put({ type: actionConstants.ADD_NOTIFICATION, notification: error })
    ]);
  }
}

function* updatePayment(params) {
  yield put({ type: actionConstants.START_PAYMENT_ACTION });
  const paymentData = get(params, 'payment', {});

  try {
    yield apiFetcher(API_PAYMENTS_URL, { data: paymentData, method: PUT });
    yield put({ type: actionConstants.UPDATE_PAYMENT_SUCCESS });
  } catch (error) {
    yield all([
      put({ type: actionConstants.FAILED_PAYMENT_ACTION, error }),
      put({ type: actionConstants.ADD_NOTIFICATION, notification: error })
    ]);
  }
}

function* searchPayment(params) {
  yield put({ type: actionConstants.START_PAYMENT_ACTION });
  const { query } = params;

  try {
    const response = yield apiFetcher(`${API_PAYMENTS_URL}?name.contains=${query}`);
    const { data } = response;
    const count = yield apiFetcher(`${API_PAYMENTS_URL}/count?name.contains=${query}`);
    const { data: total } = count;
    yield put({ type: actionConstants.GET_PAYMENTS_SUCCESS, data, total });
  } catch (error) {
    yield all([
      put({ type: actionConstants.FAILED_PAYMENT_ACTION, error }),
      put({ type: actionConstants.ADD_NOTIFICATION, notification: error })
    ]);
  }
}

function* deletePayment(params) {
  yield put({ type: actionConstants.START_PAYMENT_ACTION });
  const { paymentname } = params;
  try {
    const response = yield apiFetcher(`${API_PAYMENTS_URL}/${paymentname}`, { method: DELETE });
    const { data } = response;
    yield put({ type: actionConstants.DELETE_PAYMENTS_SUCCESS, data });
  } catch (error) {
    console.log(error);
    yield all([
      put({ type: actionConstants.FAILED_PAYMENT_ACTION, error }),
      put({ type: actionConstants.ADD_NOTIFICATION, notification: error })
    ]);
  }
}

export default function* rootSaga() {
  yield all([
    takeLatest(actionConstants.CREATE_PAYMENT, registerPayment),
    takeLatest(actionConstants.GET_PAYMENTS, fetchPayments),
    takeLatest(actionConstants.SEARCH_PAYMENT, searchPayment),
    takeLatest(actionConstants.UPDATE_PAYMENT, updatePayment),
    takeLatest(actionConstants.DELETE_PAYMENT, deletePayment)
  ]);
}
