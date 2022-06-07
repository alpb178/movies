import { API_SHIPMENTS_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { deleteData, getData, saveData } from '..';

export default function useShipments({ args = {}, options = {} } = {}) {
  return useQuery([API_SHIPMENTS_URL, { ...args }], getData, {
    ...options
  });
}

export const saveShipments = async ({ args = {}, options = {} } = {}) => {
  switch (options?.method) {
    case POST:
      await saveData({ path: API_SHIPMENTS_URL, data: args, method: POST });
      break;
    case DELETE:
      await deleteData({ path: API_SHIPMENTS_URL + `/${args.id}`, method: DELETE });
      break;
    case PUT:
      await saveData({ path: API_SHIPMENTS_URL + `/${args.id}`, data: args, method: PUT });
      break;
  }
};
