import { apiFetcher } from '@/lib/apiFetcher';
import { API_ROLES_URL } from '@/lib/constants';
import { useQuery } from 'react-query';

const getRoles = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { id, ...rest } = params;
  const url = id ? path.concat('/', id) : path;

  const { data } = await apiFetcher(url, { params: rest });
  return data;
};

export default function useRoles({ args = {}, options = {} } = {}) {
  return useQuery([API_ROLES_URL, { ...args }], getRoles, {
    ...options
  });
}
