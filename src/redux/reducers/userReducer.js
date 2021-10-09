import { fromJS, Map, List } from 'immutable';
import * as actionConstants from '../actions/actionConstants';

const initialState = fromJS({
  user: Map(),
  data: List(),
  filters: List(),
  loading: false,
  total: 0,
  error: {}
});

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionConstants.START_USER_ACTION:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', true);
      });
    case actionConstants.CREATE_USER_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', false);
      });
    case actionConstants.UPDATE_USER_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', false);
      });
    case actionConstants.GET_USERS_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState
          .set('data', fromJS(action.data))
          .set('filters', fromJS(action.filters))
          .set('total', action.total)
          .set('loading', false);
      });
    case actionConstants.SELECT_USER:
      return state.withMutations((mutableState) => {
        mutableState.set('user', fromJS(action.data)).set('loading', false);
      });
    case actionConstants.DELETE_USER_SUCCESS:
      return state.withMutations((mutableState) => {
        const dataFiltered = mutableState
          .get('data')
          .filter((activity) => activity.get('username') !== action.usernmae);
        mutableState.set('data', dataFiltered).set('data', Map()).set('loading', false);
      });

    case actionConstants.FAILED_USER_ACTION:
      return state.withMutations((mutableState) => {
        mutableState.set('error', action.error).set('loading', false);
      });
    default:
      return state;
  }
};

export default userReducer;
