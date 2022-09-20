import { apiFetcher } from '@/lib/apiFetcher';

export const getData = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { id, ...rest } = params;
  const url = id ? path.concat('/', id) : path;
  const { data } = await apiFetcher(url, { params: rest });
  return data;
};

export const saveData = async (args) => {
  const { path, data: values, method } = args;
  const { data } = await apiFetcher(path, { data: values, method });
  return data;
};

export const deleteData = async (args) => {
  const { path, method } = args;
  const { data } = await apiFetcher(path, { method });
  return data;
};
