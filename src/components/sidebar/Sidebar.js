import React from 'react';
import SimpleBar from 'simplebar-react';
import NavigationMenu from './NavigationMenu';

import 'simplebar/dist/simplebar.min.css';

const Sidebar = () => (
  <div className="hidden md:flex md:flex-shrink-0">
    <div className="flex flex-col w-72">
      <div className="flex items-center flex-shrink-0 h-16 px-4 bg-gray-900">
        <img className="w-56 h-10" src="/logo/backpackpool-min.svg" alt="Backpackpool" />
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
