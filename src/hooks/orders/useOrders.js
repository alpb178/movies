import { API_ORDERS_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { deleteData, getData, saveData } from '..';

export const saveOrders = async ({ args = {}, options = {} } = {}) => {
  switch (options?.method) {
    case POST:
      await saveData({ path: API_ORDERS_URL, data: args, method: options.method });
      break;
    case PUT:
      await saveData({
        path: API_ORDERS_URL + `/${args.id}`,
        data: args,
        method: options.method
      });
      break;
  }
};

export const deleteOrders = async ({ args = {} } = {}) => {
  await deleteData({ path: API_ORDERS_URL + `/${args.id}`, method: DELETE });
};

export default function useOrders({ args = {}, options = {} } = {}) {
  return useQuery([API_ORDERS_URL, { ...args }], getData, {
    ...options
  });
}
