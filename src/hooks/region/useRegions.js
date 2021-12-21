import { useQuery } from 'react-query';
import { apiFetcher } from '@/lib/apiFetcher';
import { API_REGIONS_URL } from '@/lib/constants';

const getRegions = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { data } = await apiFetcher(path, { params });
  return data;
};

export default function useRegions({ args = {}, options = {} } = {}) {
  return useQuery([API_REGIONS_URL, { ...args }], getRegions, {
    ...options
  });
}
