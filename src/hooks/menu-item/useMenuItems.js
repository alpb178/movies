import { API_MENU_ITEMS_URL, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { getData, saveData } from '..';

export const changeMenuItemStatus = async ({ args = {} } = {}) => {
  await saveData({ path: `${API_MENU_ITEMS_URL}/${args.id}`, data: args, method: PUT });
};

export default function useMenuItems({ args = {}, options = {} } = {}) {
  return useQuery([API_MENU_ITEMS_URL, { ...args }], getData, {
    ...options
  });
}
