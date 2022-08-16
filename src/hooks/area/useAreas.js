import { API_AREA_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { deleteData, getData, saveData } from '..';

export const saveAreas = async ({ args = {}, options = {} } = {}) => {
  switch (options?.method) {
    case POST:
      await saveData({ path: API_AREA_URL, data: args, method: POST });
      break;
    case PUT:
      await saveData({ path: API_AREA_URL + `/${args.id}`, data: args, method: PUT });
      break;
  }
};
export const deleteAreas = async ({ args = {}, options = {} } = {}) => {
  await deleteData({ path: API_SALES_URL + `/${args.id}`, method: DELETE });
}
export default function useAreas({ args = {}, options = {} } = {}) {
  return useQuery([API_AREA_URL, { ...args }], getData, {
    ...options
  });
}
