/* eslint-disable react/react-in-jsx-scope */
import Loading from '@/components/common/Loader';
import { NAVBAR_HEIGHT } from '@/lib/constants';
import { Menu, Transition } from '@headlessui/react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { HiOutlineBell as BellIcon, HiOutlineMenuAlt2 as MenuAlt2Icon } from 'react-icons/hi';

const Navbar = ({ onSidebarOpen }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <div
      className={`relative z-10 flex flex-shrink-0 bg-white border-b  h-${
        (NAVBAR_HEIGHT - 28) / 4
      }`}
    >
      {loading && <Loading />}
      <button
        type="button"
        className="px-4 text-gray-500 border-r border-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 xl:hidden"
        onClick={() => onSidebarOpen(true)}
      >
        <span className="sr-only">Open sidebar</span>
        <MenuAlt2Icon className="w-6 h-6" aria-hidden="true" />
      </button>
      <div className="flex justify-between flex-1 px-6">
        <div className="flex flex-1"></div>
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

                    <img
                      className=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
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
                ></Transition>
              </>
            )}
          </Menu>
        </div>
      </div>
    </div>
  );
};

Navbar.propTypes = {
  onSidebarOpen: PropTypes.func.isRequired
};

export default Navbar;
