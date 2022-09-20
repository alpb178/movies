import { API_SEARCH_MOVIES_URL } from '@/lib/constants';
import { useQuery } from 'react-query';
import { getData } from '..';

export default function usesearchMovies({ args = {}, options = {} } = {}) {
  return useQuery([API_SEARCH_MOVIES_URL, { ...args }], getData, {
    ...options
  });
}
