import { useQuery } from 'react-query';
import { apiFetcher } from '@/lib/apiFetcher';
import { API_REGIONS_URL, POST, PUT } from '@/lib/constants';

const getRegions = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { data } = await apiFetcher(path, { params });
  return data;
};

const createRegion = async (args) => {
  const { path, data: values, method } = args;
  const { data } = await apiFetcher(path, { data: values, method });
  return data;
};

const updateRegion = async (args) => {
  const { path, data: values, method } = args;
  const { data } = await apiFetcher(`${path}/${values.id}`, { data: values, method });
  return data;
};

export default function useRegions({ args = {}, options = {} } = {}) {
  switch (options?.method) {
    case POST:
      createRegion({ path: API_REGIONS_URL, data: args, method: POST });
      break;
    case PUT:
      updateRegion({ path: API_REGIONS_URL, data: args, method: PUT });
      break;
    default:
      return useQuery([API_REGIONS_URL, { ...args }], getRegions, {
        ...options
      });
  }
}
