import { API_AIRLINES_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { deleteData, getData, saveData } from '..';

export const saveAirlines = async ({ args = {}, options = {} } = {}) => {
  switch (options?.method) {
    case POST:
      await saveData({ path: API_AIRLINES_URL, data: args, method: POST });
      break;
    case DELETE:
      await deleteData({ path: API_AIRLINES_URL + `/${args.id}`, method: DELETE });
      break;
    case PUT:
      await saveData({ path: API_AIRLINES_URL + `/${args.id}`, data: args, method: PUT });
      break;
  }
};

export default function useAirlines({ args = {}, options = {} } = {}) {
  return useQuery([API_AIRLINES_URL, { ...args }], getData, {
    ...options
  });
}
