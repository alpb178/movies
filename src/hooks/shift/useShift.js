import { API_SHIFT_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { deleteData, getData, saveData } from '..';

export const saveShifts = async ({ args = {}, options = {} } = {}) => {
  switch (options?.method) {
    case POST:
      await saveData({ path: API_SHIFT_URL, data: args, method: options.method });
      break;
    case PUT:
      await saveData({
        path: API_SHIFT_URL + `/${args.id}`,
        data: args,
        method: options.method
      });
      break;
  }
};

export const deleteShifts = async ({ args = {} } = {}) => {
  await deleteData({ path: API_SHIFT_URL + `/${args.id}`, method: DELETE });
};

export default function useShifts({ args = {}, options = {} } = {}) {
  return useQuery([API_SHIFT_URL, { ...args }], getData, {
    ...options
  });
}
