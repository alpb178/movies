import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/outline';
import { Transition } from 'react-transition-group';
import useAuth from 'hooks/auth/useAuth';
import navigation from './navigation';

const NavigationMenu = () => {
  const router = useRouter();
  const { t } = useTranslation('common');
  const { user } = useAuth();

  const roles = user?.auth.split(',');

  return navigation.map((item, idx) =>
    item?.roles.some((role) => roles?.includes(role)) ? (
      item.submenu ? (
        <Disclosure as="div" key={item.name} className="space-y-1">
          {({ open }) => (
            <>
              <Disclosure.Button
                className={`
                ${
                  router.pathname.includes(item.name)
                    ? 'bg-primary-600 text-primary-500'
                    : 'text-primary-100 hover:bg-primary-600'
                } w-full flex justify-between items-center pl-2 pr-1 py-3 text-left text-sm font-medium rounded-md hover:text-white
              `}
              >
                <div className="flex items-center">
                  <item.icon className="w-6 h-6 mr-4 text-gray-300" aria-hidden="true" />
                  <span className="text-gray-300">{t(item.name, { count: 2 })}</span>
                </div>
                <ChevronDownIcon
                  className={`${
                    open ? 'rotate-180' : ''
                  } ml-3 h-5 w-5 transform ease-in-out duration-200 text-gray-300`}
                />
              </Disclosure.Button>
              <Transition
                show={open}
                enter="transition duration-1000 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-250 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Disclosure.Panel className="space-y-1">
                  {item.submenu?.map((item, idx) => (
                    <Link key={idx} href={item.link} shallow>
                      <a
                        key={item.name}
                        className={`${
                          router.pathname.indexOf(item.link) !== -1 ||
                          (router.pathname === '/' && idx === 0)
                            ? 'bg-gray-900 text-primary-500'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                        } flex items-center px-2 py-3 text-sm font-medium rounded-md pl-12`}
                      >
                        {t(item.name, { count: 2 })}
                      </a>
                    </Link>
                  ))}
                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      ) : (
        <Link key={idx} href={item.link} shallow>
          <a
            key={item.name}
            className={`${
              router.pathname.indexOf(item.link) !== -1 || (router.pathname === '/' && idx === 0)
                ? 'bg-gray-900 text-primary-500'
                : 'text-gray-300 hover:bg-gray-700 hover:text-white'
            } group flex items-center px-2 py-3 text-sm font-medium rounded-md`}
          >
            <item.icon
              className={`${
                router.pathname.indexOf(item.link) !== -1 || (router.pathname === '/' && idx === 0)
                  ? 'text-primary-500'
                  : 'text-gray-400 group-hover:text-gray-300'
              } mr-3 flex-shrink-0 h-6 w-6`}
              aria-hidden="true"
            />

            {t(item.name, { count: 2 })}
          </a>
        </Link>
      )
    ) : null
  );
};

export default NavigationMenu;
