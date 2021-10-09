import * as actionConstants from './actionConstants';

export const getDemoData = (query) => ({
  type: actionConstants.GET_DEMO_DATA,
  query
});

export const selectDemoData = (sector) => ({
  type: actionConstants.SELECT_DEMO_DATA,
  data: sector
});

export const searchDemoData = (query) => ({
  type: actionConstants.SEARCH_DEMO_DATA,
  query
});

export const deleteDemoData = (id) => ({
  type: actionConstants.DELETE_DEMO_DATA,
  id
});

export const createDemoData = (sector) => ({
  type: actionConstants.CREATE_DEMO_DATA,
  sector
});

export const updateDemoData = (sector) => ({
  type: actionConstants.UPDATE_DEMO_DATA,
  sector
});
