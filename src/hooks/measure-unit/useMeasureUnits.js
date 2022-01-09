import { useQuery } from 'react-query';
import { apiFetcher } from '@/lib/apiFetcher';
import { API_MEASURE_UNITS_URL, POST } from '@/lib/constants';

const getMeasureUnits = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { data } = await apiFetcher(path, { params });
  return data;
};

const createMeasureUnit = async (args) => {
  const { path, data: values, method } = args;
  const { data } = await apiFetcher(path, { data: values, method });
  return data;
};

export default function useMeasureUnits({ args = {}, options = {} } = {}) {
  if (options?.method === POST) {
    createMeasureUnit({ path: API_MEASURE_UNITS_URL, data: args, method: POST });
  } else {
    return useQuery([API_MEASURE_UNITS_URL, { ...args }], getMeasureUnits, {
      ...options
    });
  }
}
