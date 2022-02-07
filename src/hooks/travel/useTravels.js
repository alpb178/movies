import { apiFetcher } from '@/lib/apiFetcher';
import { API_TRAVELS_URL, POST } from '@/lib/constants';
import { useQuery } from 'react-query';

const getTravels = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { id, ...rest } = params;
  const url = id ? path.concat('/', id) : path;

  const { data } = await apiFetcher(url, { params: rest });
  return data;
};

const createTravel = async (args) => {
  const { path, data: values, method } = args;
  const { data } = await apiFetcher(path, { data: values, method });
  return data;
};

export default function useTravels({ args = {}, options = {} } = {}) {
  if (options?.method === POST) {
    createTravel({ path: API_TRAVELS_URL, data: args, method: POST });
  } else {
    return useQuery([API_TRAVELS_URL, { ...args }], getTravels, {
      ...options
    });
  }
}

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
