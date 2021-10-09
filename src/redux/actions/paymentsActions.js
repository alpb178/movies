import * as actionConstants from './actionConstants';

export const getPayments = (payment) => ({
  type: actionConstants.GET_PAYMENTS,
  payment
});

export const selectPayment = (payment) => ({
  type: actionConstants.SELECT_PAYMENT,
  data: payment
});

export const searchPayment = (query) => ({
  type: actionConstants.SEARCH_PAYMENT,
  query
});

export const deletePayment = (id) => ({
  type: actionConstants.DELETE_PAYMENT,
  id
});

export const createPayment = (payment) => ({
  type: actionConstants.CREATE_PAYMENT,
  payment
});

export const updatePayment = (payment) => ({
  type: actionConstants.UPDATE_PAYMENT,
  payment
});
