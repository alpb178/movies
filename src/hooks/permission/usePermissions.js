import { apiFetcher } from '@/lib/apiFetcher';
import { API_PERMISSIONS_URL } from '@/lib/constants';
import { useQuery } from 'react-query';

const getPermissions = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { id, ...rest } = params;
  const url = id ? path.concat('/', id) : path;

  const { data } = await apiFetcher(url, { params: rest });
  return data;
};

export default function usePermissions({ args = {}, options = {} } = {}) {
  return useQuery([API_PERMISSIONS_URL, { ...args }], getPermissions, {
    ...options
  });
}
