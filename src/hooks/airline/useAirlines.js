import { useQuery } from 'react-query';
import { apiFetcher } from '@/lib/apiFetcher';
import { API_AIRLINES_URL } from '@/lib/constants';

const getAirlines = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { data } = await apiFetcher(path, { params });
  return data;
};

export default function useAirlines({ args = {}, options = {} } = {}) {
  return useQuery([API_AIRLINES_URL, { ...args }], getAirlines, {
    ...options
  });
}
