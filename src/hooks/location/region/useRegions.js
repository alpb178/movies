import { API_REGIONS_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { deleteData, getData, safeData } from '../..';

export default function useRegions({ args = {}, options = {} } = {}) {
  return useQuery([API_REGIONS_URL, { ...args }], getData, {
    ...options
  });
}

export const saveRegions = async ({ args = {}, options = {} } = {}) => {
  switch (options?.method) {
    case POST:
      await safeData({ path: API_REGIONS_URL, data: args, method: POST });
      break;
    case DELETE:
      await deleteData({ path: API_REGIONS_URL + `/${args.id}`, method: DELETE });
      break;
    case PUT:
      await safeData({ path: API_REGIONS_URL + `/${args.id}`, data: args, method: PUT });
      break;
  }
};
