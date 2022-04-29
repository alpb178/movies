import { deleteData, getData, safeData } from '@/hooks/hooks';
import { API_ROLES_URL, DELETE, POST, PUT } from '@/lib/constants';
import { useQuery } from 'react-query';

/*const getRoles = async ({ queryKey }) => {
  const [path, params] = queryKey;
  const { id, ...rest } = params;
  const url = id ? path.concat('/', id) : path;

  const { data } = await apiFetcher(url, { params: rest });
  return data;
};

const createRole = async (args) => {
  const { path, data: values, method } = args;
  const { data } = await apiFetcher(path, { data: values, method });
  return data;
};

export default function useRoles({ args = {}, options = {} } = {}) {
  if (options?.method === POST) {
    createRole({ path: API_ROLES_URL, data: args, method: POST });
  } else {
    return useQuery([API_ROLES_URL, { ...args }], getRoles, {
      ...options
    });
  }
}
*/
export default function useRoles({ args = {}, options = {} } = {}) {
  switch (options?.method) {
    case POST:
      safeData({ path: API_ROLES_URL, data: args, method: POST });
      break;
    case DELETE:
      deleteData({ path: API_ROLES_URL + `/${args.id}`, method: DELETE });
      break;
    case PUT:
      safeData({ path: API_ROLES_URL + `/${args.id}`, data: args, method: PUT });
      break;
    default:
      return useQuery([API_ROLES_URL, { ...args }], getData, {
        ...options
      });
  }
}
