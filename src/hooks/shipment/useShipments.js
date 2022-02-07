import { apiFetcher } from '@/lib/apiFetcher';
import { API_SHIPMENTS_URL, POST } from '@/lib/constants';
import { useQuery } from 'react-query';

const getShipments = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { data } = await apiFetcher(path, { params });
  return data;
};

const createShipmentItem = async (args) => {
  const { path, data: values, method } = args;
  const { data } = await apiFetcher(path, { data: values, method });
  return data;
};

export default function useShipments({ args = {}, options = {} } = {}) {
  if (options?.method === POST) {
    createShipmentItem({ path: API_SHIPMENTS_URL, data: args, method: POST });
  } else {
    return useQuery([API_SHIPMENTS_URL, { ...args }], getShipments, {
      ...options
    });
  }
}
