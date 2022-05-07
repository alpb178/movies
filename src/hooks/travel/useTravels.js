import { apiFetcher } from '@/lib/apiFetcher';
import { API_TRAVELS_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { deleteData, getData, saveData } from '..';

export function useAvailablePayload({ args = {}, options = {} } = {}) {
  return useQuery([API_TRAVELS_URL, { ...args }], getAvailablePayload, {
    ...options
  });
}

const getAvailablePayload = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const url = `${path}/available-payload`;
  const { data } = await apiFetcher(url, { params });
  return data;
};

export default function useTravels({ args = {}, options = {} } = {}) {
  return useQuery([API_TRAVELS_URL, { ...args }], getData, {
    ...options
  });
}

export const saveTravels = async ({ args = {}, options = {} } = {}) => {
  switch (options?.method) {
    case POST:
      await saveData({ path: API_TRAVELS_URL, data: args, method: POST });
      break;
    case DELETE:
      await deleteData({ path: API_TRAVELS_URL + `/${args.id}`, method: DELETE });
      break;
    case PUT:
      await saveData({ path: API_TRAVELS_URL + `/${args.id}`, data: args, method: PUT });
      break;
  }
};
