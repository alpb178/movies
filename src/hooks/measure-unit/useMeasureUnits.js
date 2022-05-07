import { API_MEASURE_UNITS_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { deleteData, getData, safeData } from '..';

export const saveMeasureUnits = async ({ args = {}, options = {} } = {}) => {
  switch (options?.method) {
    case POST:
      await safeData({ path: API_MEASURE_UNITS_URL, data: args, method: POST });
      break;
    case DELETE:
      await deleteData({ path: API_MEASURE_UNITS_URL + `/${args.id}`, method: DELETE });
      break;
    case PUT:
      await safeData({ path: API_MEASURE_UNITS_URL + `/${args.id}`, data: args, method: PUT });
      break;
  }
};

export default function useMeasureUnits({ args = {}, options = {} } = {}) {
  return useQuery([API_MEASURE_UNITS_URL, { ...args }], getData, {
    ...options
  });
}
