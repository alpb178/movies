import { APP_NAME } from '@/lib/constants';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
// import MainNavbar from '@/components/Navbar/MainNavbar';

const Auth = ({ children }) => (
  <div className="min-h-screen">
    {/* <MainNavbar /> */}

    <div className="flex-1 w-full overflow-auto focus:outline-none">
      <main className="z-0 w-full h-full mb-auto overflow-y-auto bg-white">
        <div className="relative flex-1 w-full h-full px-4 py-8 bg-white sm:rounded-lg lg:px-8">
          <Link href="/">
            <a className="flex items-center justify-center mb-6">
              <span className="sr-only">{APP_NAME}</span>
              <img
                className="w-auto h-10 text-primary-500 sm:h-14"
                src="/images/logo.svg"
                alt={APP_NAME}
              />
            </a>
          </Link>
        </div>
        {children}
      </main>
    </div>
  </div>
);

Auth.propTypes = {
  children: PropTypes.node.isRequired
};

export default Auth;
