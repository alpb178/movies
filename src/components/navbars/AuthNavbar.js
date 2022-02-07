import { Menu, Transition } from '@headlessui/react';
import setLanguage from 'next-translate/setLanguage';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { HiOutlineTranslate as TranslateIcon } from 'react-icons/hi';
import { lang } from 'utils';

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const { lang: language } = useTranslation('common');

  const handleLanguageChanged = (value) => {
    setLanguage(value);
  };

  return (
    <>
      <nav className="absolute top-0 z-50 flex flex-wrap items-center justify-between w-full px-2 py-3 navbar-expand-lg">
        <div className="container flex flex-wrap items-center justify-between px-4 mx-auto">
          <div className="relative flex justify-between w-full lg:w-auto lg:static lg:block lg:justify-start">
            <button
              type="button"
              className="block px-3 py-1 text-xl leading-none bg-transparent border border-transparent border-solid rounded outline-none cursor-pointer lg:hidden focus:outline-none"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i className="text-white fas fa-bars"></i>
            </button>
          </div>
          <div
            className={
              'lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none' +
              (navbarOpen ? ' block rounded shadow-lg' : ' hidden')
            }
            id="example-navbar-warning"
          >
            <ul className="flex flex-col list-none lg:flex-row lg:ml-auto">
              <li className="flex items-center">
                <Menu>
                  {({ open }) => (
                    <>
                      <Menu.Button className="inline-flex justify-center w-full px-8 py-3 font-medium text-gray-500 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50">
                        <div className="inline-flex items-center font-medium text-center text-gray-800 transition duration-300 ease-in-out hover:text-primary-500 focus:outline-none focus:ring-0">
                          <TranslateIcon className="mr-2 text-gray-800" size={22} />
                          {lang[language]}
                        </div>
                      </Menu.Button>

                      <Transition
                        show={open}
                        enter="transition duration-300 ease-out"
                        enterFrom="transform translate-y-5 opacity-0"
                        enterTo="transform translate-y-0 opacity-100"
                        leave="transition duration-300 ease-out"
                        leaveFrom="transform translate-y-0 opacity-100"
                        leaveTo="transform translate-y-5 opacity-0"
                        className="absolute z-50 max-w-md py-2 overflow-hidden bg-white rounded-md top-16 lg:max-w-2xl lg:ml-0 lg:shadow-lg focus:outline-none focus:ring focus:border-blue-300"
                      >
                        <Menu.Items static className="flex flex-col justify-center w-max">
                          <Menu.Item>
                            <button
                              type="button"
                              className={`${
                                language === 'ca' ? 'text-primary-500' : ''
                              } px-8 py-4 duration-300 hover:text-primary-500 hover:bg-green-50`}
                              onClick={() => handleLanguageChanged('ca')}
                            >
                              Catalán
                            </button>
                          </Menu.Item>
                          <Menu.Item>
                            <button
                              type="button"
                              className={`${
                                language === 'es' ? 'text-primary-500' : ''
                              } px-8 py-4 duration-300 hover:text-primary-500 hover:bg-green-50`}
                              onClick={() => handleLanguageChanged('es')}
                            >
                              Español
                            </button>
                          </Menu.Item>
                          <Menu.Item>
                            <button
                              type="button"
                              className={`${
                                language === 'en' ? 'text-primary-500' : ''
                              } px-8 py-4 duration-300 hover:text-primary-500 hover:bg-green-50`}
                              onClick={() => handleLanguageChanged('en')}
                            >
                              English
                            </button>
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </>
                  )}
                </Menu>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
