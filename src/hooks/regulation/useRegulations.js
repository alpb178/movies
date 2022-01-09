import { useQuery } from 'react-query';
import { apiFetcher } from '@/lib/apiFetcher';
import { API_REGULATIONS_URL, POST } from '@/lib/constants';

const getRegulations = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { data } = await apiFetcher(path, { params });
  return data;
};

const createRegulation = async (args) => {
  const { path, data: values, method } = args;
  const { data } = await apiFetcher(path, { data: values, method });
  return data;
};

export default function useRegulations({ args = {}, options = {} } = {}) {
  if (options?.method === POST) {
    createRegulation({ path: API_REGULATIONS_URL, data: args, method: POST });
  } else {
    return useQuery([API_REGULATIONS_URL, { ...args }], getRegulations, {
      ...options
    });
  }
}
