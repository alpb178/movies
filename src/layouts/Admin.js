import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import { Menu, Transition } from '@headlessui/react';
import {
  HiOutlineBell as BellIcon,
  HiOutlineMenuAlt2 as MenuAlt2Icon,
  HiSearch as SearchIcon
} from 'react-icons/hi';
import useAuth from 'hooks/auth/useAuth';
import useTranslation from 'next-translate/useTranslation';
import router from 'next/router';
import useMediaContext from 'hooks/useMediaContext';

const MobileSidebar = dynamic(() => import('components/sidebar/MobileSidebar'), {
  ssr: false
});
const Sidebar = dynamic(() => import('components/sidebar/Sidebar'), {
  ssr: false
});

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Admin = ({ children, roles }) => {
  const { user, canAccess, logoutUser } = useAuth({
    roles
  });
  const { isSmall } = useMediaContext();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { t } = useTranslation('common');
  const userNavigation = [
    { name: t('profile'), action: () => router.push('/profile') },
    { name: t('settings'), action: () => router.push('/settings') },
    {
      name: t('account.logout'),
      action: async () => {
        await logoutUser.mutateAsync();
      }
    }
  ];

  return canAccess ? (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      {isSmall ? <MobileSidebar open={sidebarOpen} onOpen={setSidebarOpen} /> : <Sidebar />}

      <div className="flex flex-col flex-1 w-0 overflow-hidden">
        <div className="relative z-10 flex flex-shrink-0 h-16 bg-white border-b">
          <button
            type="button"
            className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 xl:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuAlt2Icon className="w-6 h-6" aria-hidden="true" />
          </button>
          <div className="flex justify-between flex-1 px-6">
            <div className="flex flex-1">
              <form className="flex w-full md:ml-0" action="#" method="GET">
                <label htmlFor="search_field" className="text-lg sr-only">
                  {t('search')}
                </label>
                <div className="relative w-full text-gray-400 focus-within:text-gray-600">
                  <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <SearchIcon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <input
                    id="search_field"
                    className="block w-full h-full py-2 pl-8 pr-3 text-sm text-gray-900 placeholder-gray-500 border-transparent lg:text-lg focus:outline-none focus:placeholder-gray-400 focus:ring-0 focus:border-transparent"
                    placeholder={t('search')}
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center ml-4 mr-2 md:ml-6">
              <button
                type="button"
                className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="sr-only">View notifications</span>
                <BellIcon className="w-6 h-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                {({ open }) => (
                  <>
                    <div>
                      <Menu.Button className="flex items-center w-10 h-10 max-w-xs text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <span className="sr-only">Open user menu</span>
                        {user?.imageUrl ? (
                          <img
                            className=""
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt=""
                          />
                        ) : (
                          <span className="flex items-center justify-center w-10 h-10 text-xl font-medium bg-gray-200 rounded-full">
                            {user.email[0].toUpperCase()}
                          </span>
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      show={open}
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        static
                        className="absolute right-0 py-2 mt-2 origin-top-right bg-white rounded-md shadow-lg w-max ring-1 ring-black ring-opacity-5 focus:outline-none"
                      >
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <button
                                type="button"
                                onClick={item.action}
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'w-full block px-6 py-3 text-gray-700 text-left'
                                )}
                              >
                                {item?.icon}
                                {item.name}
                              </button>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
          </div>
        </div>

        <main className="relative flex-1 overflow-y-auto bg-gray-50 focus:outline-none">
          <div className="h-full mx-auto">{children}</div>
        </main>
      </div>
    </div>
  ) : null;
};

Admin.defaultProps = {
  roles: []
};

Admin.propTypes = {
  children: PropTypes.array.isRequired,
  roles: PropTypes.array
};

export default Admin;
