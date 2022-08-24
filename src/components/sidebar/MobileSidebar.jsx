import { Dialog, Transition } from '@headlessui/react';
import { APP_NAME } from 'lib/constants';
import getConfig from 'next/config';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { Fragment } from 'react';
import { HiX as XIcon } from 'react-icons/hi';
import NavigationMenu from './NavigationMenu';

const { publicRuntimeConfig } = getConfig();

const MobileSidebar = ({ open, onOpen }) => (
  <Transition.Root show={open} as={Fragment}>
    <Dialog
      as="div"
      static
      className="fixed inset-0 z-40 flex xl:hidden"
      open={open}
      onClose={onOpen}
    >
      <Transition.Child
        as={Fragment}
        enter="transition-opacity ease-linear duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity ease-linear duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
      </Transition.Child>
      <Transition.Child
        as={Fragment}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className="relative flex flex-col flex-1 w-full max-w-xs bg-gray-800">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="absolute top-0 right-0 pt-2 -mr-12">
              <span className="sr-only">
                <button
                  type="button"
                  className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                  onClick={() => onOpen(false)}
                >
                  Close sidebar
                  <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                </button>
              </span>
            </div>
          </Transition.Child>
          <div className="flex items-center flex-shrink-0 h-16 px-4 space-x-4 bg-gray-900">
            <Image className="w-auto h-10" src="/logo.svg" width={40} height={40} alt={APP_NAME} />
            <div className="flex flex-col items-end justify-between">
              <h1 className="text-2xl font-medium text-white">{APP_NAME}</h1>
              <span className="text-xs font-medium text-gray-400">{`v ${publicRuntimeConfig?.version}`}</span>
            </div>
          </div>
          <div className="flex-1 h-0 mt-5 overflow-y-auto">
            <nav className="px-2 space-y-1">
              <NavigationMenu />
            </nav>
          </div>
        </div>
      </Transition.Child>
      <div className="flex-shrink-0 w-14" aria-hidden="true">
        {/* Dummy element to force sidebar to shrink to fit close icon */}
      </div>
    </Dialog>
  </Transition.Root>
);

MobileSidebar.propTypes = {
  open: PropTypes.bool.isRequired,
  onOpen: PropTypes.func.isRequired
};

export default MobileSidebar;
