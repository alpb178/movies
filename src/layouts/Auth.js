import React from 'react';
import PropTypes from 'prop-types';
import Navbar from 'components/navbars/AuthNavbar.js';
// import FooterSmall from 'components/Footers/FooterSmall.js';

const Auth = ({ children }) => {
  return (
    <>
      <Navbar transparent />
      <main className="relative w-full h-screen bg-white sm:bg-gray-100">
        <section>
          <div
            className="absolute top-0 w-full h-full bg-no-repeat bg-full"
            // style={{
            //   backgroundImage: 'url(' + require('/images/register_bg_2.png') + ')'
            // }}
          ></div>
          {children}
          {/* <FooterSmall absolute /> */}
        </section>
      </main>
    </>
  );
};

Auth.propTypes = {
  children: PropTypes.object
};

export default Auth;
