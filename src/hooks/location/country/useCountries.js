import { useQuery } from 'react-query';
import { apiFetcher } from '@/lib/apiFetcher';
import { API_COUNTRIES_URL, POST } from '@/lib/constants';

const getCountries = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { data } = await apiFetcher(path, { params });
  return data;
};

const createCountry = async (args) => {
  const { path, data: values, method } = args;
  const { data } = await apiFetcher(path, { data: values, method });
  return data;
};

export default function useCountries({ args = {}, options = {} } = {}) {
  if (options?.method === POST) {
    createCountry({ path: API_COUNTRIES_URL, data: args, method: POST });
  } else {
    return useQuery([API_COUNTRIES_URL, { ...args }], getCountries, {
      ...options
    });
  }
}
