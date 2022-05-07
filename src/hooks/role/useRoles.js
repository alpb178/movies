import { API_ROLES_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { deleteData, getData, saveData } from '..';

export const saveRole = async ({ args = {}, options = {} } = {}) => {
  switch (options?.method) {
    case POST:
      await saveData({ path: API_ROLES_URL, data: args, method: POST });
      break;
    case DELETE:
      await deleteData({ path: API_ROLES_URL + `/${args.id}`, method: DELETE });
      break;
    case PUT:
      await saveData({ path: API_ROLES_URL + `/${args.id}`, data: args, method: PUT });
      break;
  }
};

export default function useRoles({ args = {}, options = {} } = {}) {
  return useQuery([API_ROLES_URL, { ...args }], getData, {
    ...options
  });
}
