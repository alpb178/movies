import { API_MENU_ITEMS_URL } from '@/lib/constants';
import { useQuery } from 'react-query';
import { getData } from '..';

export default function useMenuItems({ args = {}, options = {} } = {}) {
  return useQuery([API_MENU_ITEMS_URL, { ...args }], getData, {
    ...options
  });
}
