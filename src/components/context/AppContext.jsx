import useUsers from '@/hooks/user/useUsers';
import jwtDecode from 'jwt-decode';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { createContext, useContext, useMemo } from 'react';

export const AppContext = createContext({});

function AppContextProvider({ children }) {
  const router = useRouter();
  const { data: session } = useSession();

  const { id, roles } = useMemo(() => {
    if (session?.accessToken) {
      return jwtDecode(session?.accessToken);
    }

    return {};
  }, [session]);

  const { data: user, error, isLoading } = useUsers(id, { enabled: !!id });

  const value = useMemo(
    () => ({
      session,
      user: { data: user, error, isLoading },
      roles
    }),
    [user, isLoading, roles]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    console.error('Error with App Context!!!');
  }
  return context;
}

export { AppContextProvider };
