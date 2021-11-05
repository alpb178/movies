import { useQuery } from 'react-query';
import { apiFetcher } from '@/lib/apiFetcher';
import { API_COUNTRIES_URL } from '@/lib/constants';

const getCountries = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { data } = await apiFetcher(path, { params });
  return data;
};

export default function useCountries({ args = {}, options = {} } = {}) {
  return useQuery([API_COUNTRIES_URL, { ...args }], getCountries, {
    ...options
  });
}
