import { API_REGULATIONS_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { deleteData, getData, saveData } from '..';

export const saveRegulations = async ({ args = {}, options = {} } = {}) => {
  switch (options?.method) {
    case POST:
      await saveData({ path: API_REGULATIONS_URL, data: args, method: options.method });
      break;
    case PUT:
      await saveData({
        path: API_REGULATIONS_URL + `/${args.id}`,
        data: args,
        method: options.method
      });
      break;
    case DELETE:
      await deleteData({ path: API_REGULATIONS_URL + `/${args.id}`, method: options.method });
      break;
  }
};

export default function useRegulations({ args = {}, options = {} } = {}) {
  return useQuery([API_REGULATIONS_URL, { ...args }], getData, {
    ...options
  });
}
