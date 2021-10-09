import { fromJS, Map, List } from 'immutable';
import * as actionConstants from '../actions/actionConstants';

const initialState = fromJS({
  rol: Map(),
  data: List(),
  filters: List(),
  loading: false,
  total: 0,
  error: {}
});

const rolReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionConstants.START_ROL_ACTION:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', true);
      });
    case actionConstants.GET_ROLES_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState
          .set('data', fromJS(action.data))
          .set('filters', fromJS(action.filters))
          .set('total', action.total)
          .set('loading', false);
      });

    case actionConstants.FAILED_ROL_ACTION:
      return state.withMutations((mutableState) => {
        mutableState.set('error', action.error).set('loading', false);
      });
    default:
      return state;
  }
};

export default rolReducer;
