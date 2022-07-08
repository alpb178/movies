import { API_STATISTICS_URL_USERS, API_STATISTICS_URL_USERS_COUNT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { getData } from '..';

export default function useStaticsUsers({ args = {}, options = {} } = {}) {
  return useQuery([API_STATISTICS_URL_USERS, { ...args }], getData, {
    ...options
  });
}

export function useStaticsUsersCount({ args = {}, options = {} } = {}) {
  return useQuery([API_STATISTICS_URL_USERS_COUNT, { ...args }], getData, {
    ...options
  });
}
