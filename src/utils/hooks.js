import { apiFetcher } from '@/lib/apiFetcher';

export const getData = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { data } = await apiFetcher(path, { params });
  return data;
};

export const safeData = async (args) => {
  const { path, data: values, method } = args;
  const { data } = await apiFetcher(path, { data: values, method });
  return data;
};

export const deleteData = async (args) => {
  const { path, method } = args;
  const data = await apiFetcher(path, { method });
  return data;
};
