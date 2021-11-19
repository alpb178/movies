import { useQuery } from 'react-query';
import { apiFetcher } from '@/lib/apiFetcher';
import { API_SHIPMENT_ITEMS_URL, POST } from '@/lib/constants';

const getShipmentItems = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { data } = await apiFetcher(path, { params });
  return data;
};

const createShipmentItem = async (args) => {
  const { path, data: values, method } = args;
  const { data } = await apiFetcher(path, { data: values, method });
  return data;
};

export default function useShipmentItems({ args = {}, options = {} } = {}) {
  if (options?.method === POST) {
    createShipmentItem({ path: API_SHIPMENT_ITEMS_URL, data: args, method: POST });
  } else {
    return useQuery([API_SHIPMENT_ITEMS_URL, { ...args }], getShipmentItems, {
      ...options
    });
  }
}
