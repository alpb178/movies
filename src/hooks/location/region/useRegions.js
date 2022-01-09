import { useQuery } from 'react-query';
import { apiFetcher } from '@/lib/apiFetcher';
import { API_REGIONS_URL, POST } from '@/lib/constants';

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

export default function useRegions({ args = {}, options = {} } = {}) {
  if (options?.method === POST) {
    createRegion({ path: API_REGIONS_URL, data: args, method: POST });
  } else {
    return useQuery([API_REGIONS_URL, { ...args }], getRegions, {
      ...options
    });
  }
}
