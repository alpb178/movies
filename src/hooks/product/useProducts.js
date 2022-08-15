import { API_PRODUCTS_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { deleteData, getData, saveData } from '..';

export default function useProducts({ args = {}, options = {} } = {}) {
  const path = args?.id ? API_PRODUCTS_URL : `${API_PRODUCTS_URL}/catalog`;
  return useQuery([path, { ...args }], getData, {
    ...options
  });
}

export const saveProduct = async ({ args = {}, options = {} } = {}) => {
  switch (options?.method) {
    case POST:
      await saveData({ path: API_PRODUCTS_URL, data: args, method: POST });
      break;
    case DELETE:
      await deleteData({ path: API_PRODUCTS_URL + `/${args.id}`, method: DELETE });
      break;
    case PUT:
      await saveData({ path: API_PRODUCTS_URL + `/${args.id}`, data: args, method: PUT });
      break;
  }
};
