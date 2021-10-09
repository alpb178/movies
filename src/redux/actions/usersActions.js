import * as actionConstants from './actionConstants';

export const getUsers = (user) => ({
  type: actionConstants.GET_USERS,
  user
});

export const selectUser = (user) => ({
  type: actionConstants.SELECT_USER,
  data: user
});

export const searchUser = (query) => ({
  type: actionConstants.SEARCH_USER,
  query
});

export const deleteUser = (username) => ({
  type: actionConstants.DELETE_USER,
  username
});

export const createUser = (user) => ({
  type: actionConstants.CREATE_USER,
  user
});

export const updateUser = (user) => ({
  type: actionConstants.UPDATE_USER,
  user
});
