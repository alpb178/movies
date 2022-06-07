import { API_PERMISSIONS_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { deleteData, getData, saveData } from '..';

export default function usePermissions({ args = {}, options = {} } = {}) {
  return useQuery([API_PERMISSIONS_URL, { ...args }], getData, {
    ...options
  });
}

export const savePermission = async ({ args = {}, options = {} } = {}) => {
  switch (options?.method) {
    case POST:
      await saveData({ path: API_PERMISSIONS_URL, data: args, method: POST });
      break;
    case DELETE:
      await deleteData({ path: API_PERMISSIONS_URL + `/${args.id}`, method: DELETE });
      break;
    case PUT:
      await saveData({ path: API_PERMISSIONS_URL + `/${args.id}`, data: args, method: PUT });
      break;
  }
};
