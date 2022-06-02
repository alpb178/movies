import { APP_NAME } from 'lib/constants';
import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import NavigationMenu from './NavigationMenu';

const Sidebar = () => (
  <div className="hidden md:flex md:flex-shrink-0">
    <div className="flex flex-col w-64 xl:w-72">
      <div className="flex items-center flex-shrink-0 h-16 px-4 space-x-4 bg-gray-900">
        <img className="h-10 w-max" src="/images/logo.svg" alt={APP_NAME} />
        <span className="text-xl font-medium text-white">{APP_NAME}</span>
      </div>
      <div className="flex flex-col flex-1 overflow-y-auto bg-gray-800">
        <SimpleBar style={{ maxHeight: '100%' }}>
          <nav className="px-2 py-4 space-y-1">
            <NavigationMenu />
          </nav>
        </SimpleBar>
      </div>
    </div>
  </div>
);

export default Sidebar;
