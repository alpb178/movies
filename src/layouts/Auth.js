import Footer from '@/components/footer';
import AuthNavbar from '@/components/navbars/AuthNavbar';
import { FOOTER_HEIGHT, NAVBAR_HEIGHT } from '@/lib/constants';
import PropTypes from 'prop-types';
import React from 'react';

const Auth = ({ children }) => (
  <div className="h-full">
    <AuthNavbar />

    <div className="flex flex-col w-full py-8 mx-auto max-w-7xl">
      <main
        className="z-0 flex items-center w-full max-w-lg max-h-full mx-auto overflow-y-hidden bg-white"
        style={{ minHeight: `calc(100vh - ${FOOTER_HEIGHT * 2}px - ${NAVBAR_HEIGHT - 11}px)` }}
      >
        {children}
      </main>
    </div>
    <Footer />
  </div>
);

Auth.propTypes = {
  children: PropTypes.node.isRequired
};

export default Auth;
