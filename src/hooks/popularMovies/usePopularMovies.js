import { API_MOVIES_URL } from '@/lib/constants';
import { useQuery } from 'react-query';
import { getData } from '..';

export default function usePopularMovies({ args = {}, options = {} } = {}) {
  return useQuery([API_MOVIES_URL, { ...args }], getData, {
    ...options
  });
}
