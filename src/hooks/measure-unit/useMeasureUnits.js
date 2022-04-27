import { apiFetcher } from '@/lib/apiFetcher';
import { API_MEASURE_UNITS_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';

const getMeasureUnits = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { data } = await apiFetcher(path, { params });
  return data;
};

const safeMeasureUnit = async (args) => {
  const { path, data: values, method } = args;
  const { data } = await apiFetcher(path, { data: values, method });
  return data;
};

const deleteMeasureUnit = async (args) => {
  const { path, method } = args;
  const data = await apiFetcher(path, { method });
  return data;
};

export default function useMeasureUnits({ args = {}, options = {} } = {}) {
  switch (options?.method) {
    case POST:
      safeMeasureUnit({ path: API_MEASURE_UNITS_URL, data: args, method: POST });
      break;
    case DELETE:
      deleteMeasureUnit({ path: API_MEASURE_UNITS_URL + `/${args.id}`, method: DELETE });
      break;
    case PUT:
      safeMeasureUnit({ path: API_MEASURE_UNITS_URL + `/${args.id}`, data: args, method: PUT });
      break;
    default:
      return useQuery([API_MEASURE_UNITS_URL, { ...args }], getMeasureUnits, {
        ...options
      });
  }
}
