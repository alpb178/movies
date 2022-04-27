import { apiFetcher } from '@/lib/apiFetcher';
import { API_REGIONS_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';

const getRegions = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { data } = await apiFetcher(path, { params });
  return data;
};

const safeRegion = async (args) => {
  const { path, data: values, method } = args;
  const { data } = await apiFetcher(path, { data: values, method });
  return data;
};

const deleteRegion = async (args) => {
  const { path, method } = args;
  const data = await apiFetcher(path, { method });
  return data;
};

export default function useRegions({ args = {}, options = {} } = {}) {
  switch (options?.method) {
    case POST:
      safeRegion({ path: API_REGIONS_URL, data: args, method: POST });
      break;
    case DELETE:
      deleteRegion({ path: API_REGIONS_URL + `/${args.id}`, method: DELETE });
      break;
    case PUT:
      safeRegion({ path: API_REGIONS_URL + `/${args.id}`, data: args, method: PUT });
      break;
    default:
      return useQuery([API_REGIONS_URL, { ...args }], getRegions, {
        ...options
      });
  }
}
