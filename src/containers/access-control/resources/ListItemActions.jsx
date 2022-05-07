import { Menu, Transition } from '@headlessui/react';
import { DotsVerticalIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

export default function ListItemActions({ actions }) {
  const { t } = useTranslation('common');

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="inline-flex justify-center w-full p-2 text-sm font-medium rounded-full hover:bg-gray-200">
          <DotsVerticalIcon className="w-6 h-6" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-56 mt-2 origin-top-right bg-white rounded-md shadow-lg shadow-gray-200 ring-1 ring-gray-800 ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            {actions && actions.length > 0 ? (
              actions.map((action) => (
                <Menu.Item key={action.name}>
                  {({ active }) => (
                    <button
                      className={`${
                        active ? 'bg-secondary-100 text-secondary-600' : 'text-gray-800'
                      } group flex w-full items-center rounded-md px-2 py-4 space-x-4`}
                    >
                      <action.icon className="w-6 h-6" />
                      <p>{action.name}</p>
                    </button>
                  )}
                </Menu.Item>
              ))
            ) : (
              <p className="m-4 italic text-gray-500">{t('actions', { count: 0 })}</p>
            )}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}

ListItemActions.propTypes = {
  actions: PropTypes.array.isRequired
};
