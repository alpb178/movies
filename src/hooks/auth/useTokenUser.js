import { getTokenUser } from 'lib/auth';
import { GET_USER_KEY } from 'lib/constants';
import { useQuery } from 'react-query';

export default function useTokenUser() {
  return useQuery(GET_USER_KEY, getTokenUser);
}
