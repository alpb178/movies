import { all } from 'redux-saga/effects';
import demoSaga from './demoSaga';
import paymentsSaga from './paymentsSaga';
import userSaga from './userSaga';
import rolSaga from './rolSaga';

export default function* rootSaga() {
  yield all([demoSaga(), paymentsSaga(), userSaga(), rolSaga()]);
}
