import { login } from 'lib/auth';
import { GET_USER_KEY } from 'lib/constants';
import { useMutation, useQueryClient } from 'react-query';

export default function useLogin() {
  const queryClient = useQueryClient();

  return useMutation(
    ({ username, password, rememberMe }) => login(username, password, rememberMe),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(GET_USER_KEY, data);
      }
    }
  );
}
