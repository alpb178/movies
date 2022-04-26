import { apiFetcher } from '@/lib/apiFetcher';
import { API_COUNTRIES_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';

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

const deleteCountry = async (args) => {
  const { path, method } = args;
  const data = await apiFetcher(path, { method });
  return data;
};

export default function useCountries({ args = {}, options = {} } = {}) {
  if (options?.method === POST) {
    createCountry({ path: API_COUNTRIES_URL, data: args, method: POST });
  } else if (options?.method === DELETE) {
    deleteCountry({ path: API_COUNTRIES_URL + `/${args.id}`, method: DELETE });
  } else if (options?.method === PUT) {
    createCountry({ path: API_COUNTRIES_URL + `/${args.id}`, data: args, method: PUT });
  } else {
    return useQuery([API_COUNTRIES_URL, { ...args }], getCountries, {
      ...options
    });
  }
}
