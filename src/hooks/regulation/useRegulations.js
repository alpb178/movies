import { API_REGULATIONS_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { deleteData, getData, safeData } from '..';

export default function useRegulations({ args = {}, options = {} } = {}) {
  switch (options?.method) {
    case POST:
      safeData({ path: API_REGULATIONS_URL, data: args, method: options.method });
      break;
    case PUT:
      safeData({ path: API_REGULATIONS_URL + `/${args.id}`, data: args, method: options.method });
      break;
    case DELETE:
      deleteData({ path: API_REGULATIONS_URL + `/${args.id}`, method: options.method });
      break;
    default:
      return useQuery([API_REGULATIONS_URL, { ...args }], getData, {
        ...options
      });
  }
}
