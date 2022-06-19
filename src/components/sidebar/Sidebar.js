import { APP_NAME } from 'lib/constants';
import getConfig from 'next/config';
import Image from 'next/image';
import React from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';
import NavigationMenu from './NavigationMenu';

const { publicRuntimeConfig } = getConfig();

const Sidebar = () => (
  <div className="hidden md:flex md:flex-shrink-0">
    <div className="flex flex-col w-64 xl:w-72">
      <div className="flex items-center flex-shrink-0 h-16 px-4 space-x-4 bg-gray-900">
        <Image className="w-auto h-10" src="/logo.svg" width={40} height={40} alt={APP_NAME} />
        <div className="flex flex-col items-end justify-between">
          <h1 className="text-2xl font-medium text-white">{APP_NAME}</h1>
          <span className="text-xs font-medium text-gray-400">{`v ${publicRuntimeConfig?.version}`}</span>
        </div>
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
