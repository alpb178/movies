import { API_COMANDAS_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { deleteData, getData, saveData } from '..';

export const saveComandas = async ({ args = {}, options = {} } = {}) => {
  switch (options?.method) {
    case POST:
      await saveData({ path: API_COMANDAS_URL, data: args, method: options.method });
      break;
    case PUT:
      await saveData({
        path: API_COMANDAS_URL + `/${args.id}`,
        data: args,
        method: options.method
      });
      break;
  }
};

export const deleteComandas = async ({ args = {} } = {}) => {
  await deleteData({ path: API_COMANDAS_URL + `/${args.id}`, method: DELETE });
};

export default function useComandas({ args = {}, options = {} } = {}) {
  return useQuery([API_COMANDAS_URL, { ...args }], getData, {
    ...options
  });
}
