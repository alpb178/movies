import * as actionConstants from './actionConstants';

export const getRoles = (query) => ({
  type: actionConstants.GET_ROLES,
  query
});
