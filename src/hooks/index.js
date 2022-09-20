import { apiFetcher } from '@/lib/apiFetcher';

export const getData = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { id, ...rest } = params;
  const url = id ? path.concat('/', id) : path;
  const { data } = await apiFetcher(url, { params: rest });
  return data;
};
