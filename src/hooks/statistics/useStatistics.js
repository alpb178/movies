import { API_STATISTICS_URL_PRODUCTS, API_STATISTICS_URL_SALES } from '@/lib/constants';
import { useQuery } from 'react-query';
import { getData } from '..';

export default function useStatics({ args = {}, options = {} } = {}) {
  return useQuery([API_STATISTICS_URL_SALES, { ...args }], getData, {
    ...options
  });
}

export function useStaticsProducts({ args = {}, options = {} } = {}) {
  return useQuery([API_STATISTICS_URL_PRODUCTS, { ...args }], getData, {
    ...options
  });
}
