import { fromJS, List } from 'immutable';
import * as actionConstants from '../actions/actionConstants';

const initialState = fromJS({
  data: List(),
  filters: List(),
  loading: false,
  total: 0,
  error: {}
});

const demoReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionConstants.START_DEMO_DATA_ACTION:
      return state.withMutations((mutableState) => {
        mutableState.set('loading', true);
      });
    // case actionConstants.CREATE_DEMO_DATA_SUCCESS:
    //   return state
    //     .update('data', (data) => data.unshift(fromJS(action.data)))
    //     .update('total', (total) => parseInt(total, 10) + 1)
    //     .set('loading', false);
    case actionConstants.GET_DEMO_DATA_SUCCESS:
      return state.withMutations((mutableState) => {
        mutableState
          .set('data', fromJS(action.data))
          .set('filters', fromJS(action.filters))
          .set('total', action.total)
          .set('loading', false);
      });
    // case actionConstants.UPDATE_DEMO_DATA_SUCCESS:
    //   return state
    //     .update('data', (data) =>
    //       data.set(
    //         data.findIndex((item) => item.get('id') === action.data.id),
    //         fromJS(action.data)
    //       )
    //     )
    //     .set('loading', false);
    // case actionConstants.DELETE_DEMO_DATA_SUCCESS:
    //   return state.withMutations((mutableState) => {
    //     const dataFiltered = mutableState
    //       .get('data')
    //       .filter((it) => it.get('id') !== parseInt(action.id, 10));
    //     mutableState
    //       .update('total', (total) => parseInt(total, 10) - 1)
    //       .set('data', dataFiltered)
    //       .set('loading', false);
    //   });
    case actionConstants.FAILED_DEMO_DATA_ACTION:
      return state.withMutations((mutableState) => {
        mutableState.set('error', action.error).set('loading', false);
      });
    default:
      return state;
  }
};

export default demoReducer;
