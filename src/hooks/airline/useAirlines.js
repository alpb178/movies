import { useQuery } from 'react-query';
import { apiFetcher } from '@/lib/apiFetcher';
import { API_AIRLINES_URL, POST } from '@/lib/constants';

const getAirlines = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { data } = await apiFetcher(path, { params });
  return data;
};

const createAirline = async (args) => {
  const { path, data: values, method } = args;
  const { data } = await apiFetcher(path, { data: values, method });
  return data;
};

export default function useAirlines({ args = {}, options = {} } = {}) {
  if (options?.method === POST) {
    createAirline({ path: API_AIRLINES_URL, data: args, method: POST });
  } else {
    return useQuery([API_AIRLINES_URL, { ...args }], getAirlines, {
      ...options
    });
  }
}
