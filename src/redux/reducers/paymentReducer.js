import { fromJS, Map, List } from 'immutable';
import * as actionConstants from '../actions/actionConstants';

const initialState = fromJS({
  payment: Map(),
  data: List(),
  filters: List(),
  loading: false,
  total: 0,
  error: {}
});

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionConstants.START_PAYMENT_ACTION:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', true);
      });
    case actionConstants.CREATE_PAYMENT_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', false);
      });
    case actionConstants.UPDATE_PAYMENT_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', false);
      });
    case actionConstants.GET_PAYMENTS_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState
          .set('data', fromJS(action.data))
          .set('filters', fromJS(action.filters))
          .set('total', action.total)
          .set('loading', false);
      });
    case actionConstants.SELECT_PAYMENT:
      return state.withMutations((mutableState) => {
        mutableState.set('payment', fromJS(action.data)).set('loading', false);
      });
    case actionConstants.DELETE_PAYMENT_SUCCESS:
      return state.withMutations((mutableState) => {
        const dataFiltered = mutableState
          .get('data')
          .filter((activity) => activity.get('paymentname') !== action.paymentnmae);
        mutableState.set('data', dataFiltered).set('data', Map()).set('loading', false);
      });

    case actionConstants.FAILED_PAYMENT_ACTION:
      return state.withMutations((mutableState) => {
        mutableState.set('error', action.error).set('loading', false);
      });
    default:
      return state;
  }
};

export default paymentReducer;
