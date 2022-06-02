import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import Loader from '../common/Loader';

export default function AuthWrapper({ children }) {
  const { data: session, status } = useSession();
  const isLoggedIn = !!session?.user;
  const router = useRouter();

  console.log(children);

  useEffect(() => {
    if (status === 'loading') return; // Do nothing while loading
    // if (!isUser) signIn('keycloak'); // If not authenticated, force log in
  }, [isLoggedIn, status]);

  if (status === 'loading') return <Loader />;

  if (router.asPath.match(/auth/gi) && !isLoggedIn) {
    return children;
  }

  if (isLoggedIn) {
    return children;
  }

  signIn();
}

AuthWrapper.propTypes = {
  children: PropTypes.object.isRequired
};
