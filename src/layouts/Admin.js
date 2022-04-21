import Navbar from '@/components/navbars/Navbar';
import NotFound from '@/containers/common/NotFound';
import useAuth from 'hooks/auth/useAuth';
import useMediaContext from 'hooks/useMediaContext';
import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const MobileSidebar = dynamic(() => import('components/sidebar/MobileSidebar'), {
  ssr: false
});
const Sidebar = dynamic(() => import('components/sidebar/Sidebar'), {
  ssr: false
});

const Admin = ({ children, roles }) => {
  const { canAccess } = useAuth({
    roles
  });
  const { isSmall } = useMediaContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {isSmall ? <MobileSidebar open={sidebarOpen} onOpen={setSidebarOpen} /> : <Sidebar />}

      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <Navbar onSidebarOpen={setSidebarOpen} />

        <main className="relative flex-1 overflow-y-auto bg-gray-50 focus:outline-none">
          <div className="h-full mx-auto">{canAccess ? children : <NotFound />}</div>
        </main>
      </div>
    </div>
  );
};

Admin.defaultProps = {
  roles: []
};

Admin.propTypes = {
  children: PropTypes.array.isRequired,
  roles: PropTypes.array
};

export default Admin;
