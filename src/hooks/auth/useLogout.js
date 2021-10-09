import { logout } from 'lib/auth';
import { GET_USER_KEY } from 'lib/constants';
import { useMutation, useQueryClient } from 'react-query';

export default function useLogout() {
  const queryClient = useQueryClient();

  return useMutation(logout, {
    onSuccess: (data) => {
      queryClient.setQueryData(GET_USER_KEY, data);
    }
  });
}
