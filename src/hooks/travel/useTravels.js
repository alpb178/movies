import { useQuery } from 'react-query';
import { apiFetcher } from '@/lib/apiFetcher';
import { API_TRAVELS_URL } from '@/lib/constants';

const getTravels = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { id, ...rest } = params;
  const { data } = await apiFetcher(`${path}${id ? `/${id}` : ''}`, { params: rest });
  return data;
};

export default function useTravels({ args = {}, options = {} } = {}) {
  return useQuery([API_TRAVELS_URL, { ...args }], getTravels, {
    ...options
  });
}
