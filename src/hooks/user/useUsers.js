import { apiFetcher } from '@/lib/apiFetcher';
import { API_USERS_URL } from '@/lib/constants';
import { useQuery } from 'react-query';

const getUsers = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { id, ...rest } = params;
  const url = id ? path.concat('/', id) : path;

  const { data } = await apiFetcher(url, { params: rest });
  return data;
};

export default function useUsers({ args = {}, options = {} } = {}) {
  return useQuery([API_USERS_URL, { ...args }], getUsers, {
    ...options
  });
}
