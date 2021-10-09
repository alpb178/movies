/**
 * Combine all reducers in this file and export the combined reducers.
 */
import { combineReducers } from 'redux-immutable';
import demoReducer from './reducers/demoReducer';
import rolReducer from './reducers/rolReducers';
import userReducer from './reducers/userReducer';

/**
 * Creates the main reducer with the dynamically injected ones
 */
export default function createReducer(injectedReducers = {}) {
  const rootReducer = combineReducers({
    demo: demoReducer,
    user: userReducer,
    rol: rolReducer,
    ...injectedReducers
  });

  return rootReducer;
}
