import { API_SALES_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { deleteData, getData, saveData } from '..';

export const saveSales = async ({ args = {}, options = {} } = {}) => {
  switch (options?.method) {
    case POST:
      await saveData({ path: API_SALES_URL, data: args, method: options.method });
      break;
    case PUT:
      await saveData({
        path: API_SALES_URL + `/${args.id}`,
        data: args,
        method: options.method
      });
      break;
  }
};

export const deleteSales = async ({ args = {} } = {}) => {
  await deleteData({ path: API_SALES_URL + `/${args.id}`, method: DELETE });
};

export default function useSales({ args = {}, options = {} } = {}) {
  return useQuery([API_SALES_URL, { ...args }], getData, {
    ...options
  });
}
