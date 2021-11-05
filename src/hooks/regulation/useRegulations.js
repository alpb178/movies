import { useQuery } from 'react-query';
import { apiFetcher } from '@/lib/apiFetcher';
import { API_REGULATIONS_URL } from '@/lib/constants';

const getRegulations = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { data } = await apiFetcher(path, { params });
  return data;
};

export default function useRegulations({ args = {}, options = {} } = {}) {
  return useQuery([API_REGULATIONS_URL, { ...args }], getRegulations, {
    ...options
  });
}
