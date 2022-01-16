import { useQuery } from 'react-query';
import { apiFetcher } from '@/lib/apiFetcher';
import { API_TRAVELS_URL, POST } from '@/lib/constants';

const getTravels = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { data } = await apiFetcher(path, { params });
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
