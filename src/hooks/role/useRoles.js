import { API_ROLES_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { deleteData, getData, safeData } from '..';

export default function useRoles({ args = {}, options = {} } = {}) {
  switch (options?.method) {
    case POST:
      safeData({ path: API_ROLES_URL, data: args, method: POST });
      break;
    case DELETE:
      deleteData({ path: API_ROLES_URL + `/${args.id}`, method: DELETE });
      break;
    case PUT:
      safeData({ path: API_ROLES_URL + `/${args.id}`, data: args, method: PUT });
      break;
    default:
      return useQuery([API_ROLES_URL, { ...args }], getData, {
        ...options
      });
  }
}
