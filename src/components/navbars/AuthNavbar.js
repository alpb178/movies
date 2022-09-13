import { APP_NAME, DASHBOARD_PAGE, NAVBAR_HEIGHT } from '@/lib/constants';
import getConfig from 'next/config';
import Image from 'next/image';
import Link from 'next/link';

const { publicRuntimeConfig } = getConfig();

export default function AuthNavbar() {
  return (
    <header className="inset-x-0 top-0 z-30 lg:relative">
      <div id="main-navbar" className="w-full transition duration-300 ease-in-out bg-white">
        <div
          className="flex items-center justify-between w-full h-full px-4 py-4 mx-auto max-w-7xl sm:px-6 lg:justify-start md:space-x-10 lg:px-8"
          style={{ height: NAVBAR_HEIGHT }}
        >
          <div className="flex justify-center w-full h-full">
            <Link href={DASHBOARD_PAGE}>
              <a className="flex items-center space-x-4 w-max">
                <Image
                  className="w-auto h-14"
                  src="/logo.svg"
                  width={56}
                  height={56}
                  alt={APP_NAME}
                />
                <div className="flex flex-col items-end justify-between">
                  <h1 className="block text-3xl font-semibold text-gray-700">{APP_NAME}</h1>
                  <span className="text-sm font-medium text-gray-500">{`v ${publicRuntimeConfig?.version}`}</span>
                </div>
              </a>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
