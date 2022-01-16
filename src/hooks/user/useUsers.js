import { useQuery } from 'react-query';
import { apiFetcher } from '@/lib/apiFetcher';
import { API_USERS_URL } from '@/lib/constants';

const getUsers = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { data } = await apiFetcher(path, { params });
  return data;
};

export default function useUsers({ args = {}, options = {} } = {}) {
  return useQuery([API_USERS_URL, { ...args }], getUsers, {
    ...options
  });
}
