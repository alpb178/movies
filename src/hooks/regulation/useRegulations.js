import { apiFetcher } from '@/lib/apiFetcher';
import { API_REGULATIONS_URL, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';

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

const updateRegulation = async (args) => {
  const { path, data: values, method } = args;
  const { data } = await apiFetcher(`${path}/${values.id}`, { data: values, method });
  return data;
};

export default function useRegulations({ args = {}, options = {} } = {}) {
  switch (options?.method) {
    case POST:
      createRegulation({ path: API_REGULATIONS_URL, data: args, method: options.method });
      break;
    case PUT:
      updateRegulation({ path: API_REGULATIONS_URL, data: args, method: options.method });
      break;
    default:
      return useQuery([API_REGULATIONS_URL, { ...args }], getRegulations, {
        ...options
      });
  }
}
