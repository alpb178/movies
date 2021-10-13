import React from 'react';
import SimpleBar from 'simplebar-react';
import NavigationMenu from './NavigationMenu';

import 'simplebar/dist/simplebar.min.css';
import { APP_NAME } from '../../lib/constants';

const Sidebar = () => (
  <div className="hidden md:flex md:flex-shrink-0">
    <div className="flex flex-col w-64 xl:w-72">
      <div className="flex items-center flex-shrink-0 h-16 px-4 space-x-4 bg-gray-900">
        <img
          className="h-10 w-max"
          src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
          alt="Backpackpool"
        />
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
