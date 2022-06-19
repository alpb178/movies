import { APP_NAME } from '@/lib/constants';
import { languages } from '@/lib/utils';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';
import getConfig from 'next/config';
import React from 'react';

const { publicRuntimeConfig } = getConfig();

const Footer = () => {
  const { lang } = useTranslation('common');

  const handleLanguageChanged = (value) => {
    setLanguage(value);
  };

  return (
    <footer className="border-t bg-gray-50" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="container p-4 mx-auto max-w-7xl">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <div className="md:flex md:items-center md:justify-between">
              <p className="font-medium text-gray-500 md:mt-0 md:order-1">
                {APP_NAME} &copy; {new Date().getFullYear()}
              </p>
            </div>
            <span className="text-xs font-medium text-gray-500">{`v ${publicRuntimeConfig?.version}`}</span>
          </div>

          <Menu className="w-max">
            {({ open }) => (
              <>
                <Menu.Button className="relative flex items-center justify-between p-3 bg-gray-100 rounded-md w-max">
                  {languages.find((lg) => lg.code === lang).name}
                  <ChevronDownIcon
                    className={`${
                      open ? 'rotate-180' : ''
                    } w-6 h-6 transition duration-150 text-gray-500`}
                  />
                </Menu.Button>

                <Transition
                  show={open}
                  enter="transition duration-300 ease-out"
                  enterFrom="transform translate-y-5 opacity-0"
                  enterTo="transform translate-y-0 opacity-100"
                  leave="transition duration-300 ease-out"
                  leaveFrom="transform translate-y-0 opacity-100"
                  leaveTo="transform translate-y-5 opacity-0"
                  className="absolute z-50 bg-white focus:outline-none focus:ring"
                >
                  <Menu.Items
                    static
                    className="flex flex-col w-full py-2 border rounded-md shadow-lg"
                  >
                    {languages.map((lg) => (
                      <Menu.Item key={lg.name}>
                        <button
                          type="button"
                          className="p-4 text-left hover:text-primary hover:bg-gray-100"
                          onClick={() => handleLanguageChanged(lg.code)}
                        >
                          {lg.name}
                        </button>
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </Transition>
              </>
            )}
          </Menu>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
