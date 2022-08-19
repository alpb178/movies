import { API_CATEGORY_RECIPES_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';
import { deleteData, getData, saveData } from '..';

export default function useCategoryRecipes({ args = {}, options = {} } = {}) {
  return useQuery([API_CATEGORY_RECIPES_URL, { ...args }], getData, {
    ...options
  });
}

export const saveCategoryRecipes = async ({ args = {}, options = {} } = {}) => {
  switch (options?.method) {
    case POST:
      await saveData({ path: API_CATEGORY_RECIPES_URL, data: args, method: POST });
      break;
    case DELETE:
      await deleteData({ path: API_CATEGORY_RECIPES_URL + `/${args.id}`, method: DELETE });
      break;
    case PUT:
      await saveData({ path: API_CATEGORY_RECIPES_URL + `/${args.id}`, data: args, method: PUT });
      break;
  }
};
