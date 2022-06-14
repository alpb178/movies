import { API_USERS_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { deleteData, getData, saveData } from '..';

export const saveUser = async ({ args = {}, options = {} } = {}) => {
  switch (options?.method) {
    case POST:
      await saveData({ path: API_USERS_URL, data: args, method: POST });
      break;
    case DELETE:
      await deleteData({ path: API_USERS_URL + `/${args.id}`, method: DELETE });
      break;
    case PUT:
      await saveData({ path: API_USERS_URL + `/${args.id}`, data: args, method: PUT });
      break;
  }
};

export const userActivatedDesactivated = async ({ args = {}, actions = {} } = {}) => {
  await saveData({ path: API_USERS_URL + `/${args.id}/${actions}`, data: {}, method: PUT });
};

export default function useUsers({ args = {}, options = {} } = {}) {
  return useQuery([API_USERS_URL, { ...args }], getData, {
    ...options
  });
}
