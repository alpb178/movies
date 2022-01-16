import { useQuery } from 'react-query';
import { apiFetcher } from '@/lib/apiFetcher';
import { API_FLIGHTS_URL, POST } from '@/lib/constants';

const getFlights = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { data } = await apiFetcher(path, { params });
  return data;
};

const createFlight = async (args) => {
  const { path, data: values, method } = args;
  const { data } = await apiFetcher(path, { data: values, method });
  return data;
};

export default function useFlights({ args = {}, options = {} } = {}) {
  if (options?.method === POST) {
    createFlight({ path: API_FLIGHTS_URL, data: args, method: POST });
  } else {
    return useQuery([API_FLIGHTS_URL, { ...args }], getFlights, {
      ...options
    });
  }
}
