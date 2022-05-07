import { API_RESOURCES_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { deleteData, getData, safeData } from '..';

export const saveResource = async ({ args = {}, options = {} } = {}) => {
  switch (options?.method) {
    case POST:
      await safeData({ path: API_RESOURCES_URL, data: args, method: POST });
      break;
    case DELETE:
      await deleteData({ path: API_RESOURCES_URL + `/${args.id}`, method: DELETE });
      break;
    case PUT:
      await safeData({ path: API_RESOURCES_URL + `/${args.id}`, data: args, method: PUT });
      break;
  }
};

export default function useResources({ args = {}, options = {} } = {}) {
  return useQuery([API_RESOURCES_URL, { ...args }], getData, {
    ...options
  });
}
