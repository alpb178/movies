import { apiFetcher } from '@/lib/apiFetcher';
import { API_ROLES_URL, POST } from '@/lib/constants';
import { useQuery } from 'react-query';

const getRoles = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { id, ...rest } = params;
  const url = id ? path.concat('/', id) : path;

  const { data } = await apiFetcher(url, { params: rest });
  return data;
};

const createRole = async (args) => {
  const { path, data: values, method } = args;
  const { data } = await apiFetcher(path, { data: values, method });
  return data;
};

export default function useRoles({ args = {}, options = {} } = {}) {
  if (options?.method === POST) {
    createRole({ path: API_ROLES_URL, data: args, method: POST });
  } else {
    return useQuery([API_ROLES_URL, { ...args }], getRoles, {
      ...options
    });
  }
}
