import useTokenUser from 'hooks/auth/useTokenUser';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';
import {
  HOME_PAGE,
  ADMIN_ROLE,
  DASHBOARD_PAGE,
  BASIC_CLIENT_ROLE,
  LOGIN_PAGE,
  USERS_PAGE
} from 'lib/constants';
import useLogin from './useLogin';
import useLogout from './useLogout';

export default function useAuth({
  redirectIfFound = false,
  roles = [],
  redirectIfNotAccess = HOME_PAGE
} = {}) {
  const router = useRouter();

  const { data: user, error, isLoading } = useTokenUser();
  const loginUser = useLogin();
  const logoutUser = useLogout();

  const canAccess = useMemo(() => {
    let flag = false;

    if (roles.length > 0 && user?.isLoggedIn) {
      flag = user?.auth.split(',').some((role) => roles.includes(role));
    }
    return flag;
  }, [user, roles]);

  const redirectTo = useMemo(() => {
    let to = false;

    if (user?.isLoggedIn === false) {
      to = LOGIN_PAGE;
    } else if (user?.auth.split(',')[0] === BASIC_CLIENT_ROLE) {
      to = DASHBOARD_PAGE;
    } else if (user?.auth.split(',')[0] === ADMIN_ROLE) {
      to = USERS_PAGE;
    } else {
      to = DASHBOARD_PAGE;
    }

    return to;
  }, [user]);

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet
    if (!redirectTo || !user) return;

    if (roles.length > 0 && !roles.some((role) => user?.auth.split(',')?.includes(role))) {
      router.replace(redirectIfNotAccess);
    }

    if (
      // If redirectTo is set, redirect if the user was not found.
      (redirectTo && !redirectIfFound && !user?.isLoggedIn) ||
      // If redirectIfFound is also set, redirect if the user was found
      (redirectIfFound && user?.isLoggedIn)
    ) {
      router.push(redirectTo);
    }
  }, [user, redirectIfFound, redirectTo]);

  return { user, error, loginUser, logoutUser, isLoading, canAccess };
}
