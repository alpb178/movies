import { API_SHIPMENT_ITEMS_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { deleteData, getData, safeData } from '..';

export default function useShipmentItems({ args = {}, options = {} } = {}) {
  return useQuery([API_SHIPMENT_ITEMS_URL, { ...args }], getData, {
    ...options
  });
}

export const saveShipmentItems = async ({ args = {}, options = {} } = {}) => {
  switch (options?.method) {
    case POST:
      safeData({ path: API_SHIPMENT_ITEMS_URL, data: args, method: POST });
      break;
    case DELETE:
      deleteData({ path: API_SHIPMENT_ITEMS_URL + `/${args.id}`, method: DELETE });
      break;
    case PUT:
      safeData({ path: API_SHIPMENT_ITEMS_URL + `/${args.id}`, data: args, method: PUT });
      break;
  }
};
