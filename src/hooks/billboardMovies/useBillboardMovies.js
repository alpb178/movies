import { API_BILLBOARD_MOVIE_URL } from '@/lib/constants';
import { useQuery } from 'react-query';
import { getData } from '..';

export default function useBillboardMovies({ args = {}, options = {} } = {}) {
  const path = API_BILLBOARD_MOVIE_URL;
  return useQuery([path, { ...args }], getData, {
    ...options
  });
}
