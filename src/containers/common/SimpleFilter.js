import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Transition } from '@headlessui/react';
import { Formik, Form } from 'formik';
//import { TextInput } from 'components';
import useTranslation from 'next-translate/useTranslation';

const SimpleFilter = ({ onGetData }) => {
  const { t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const initialValues = {
    name: ''
  };

  const handleFilter = (values) => {
    onGetData({ filters: values });
    setIsOpen(false);
  };

  return (
    <>
      <div>
        <span className="rounded-full shadow-sm">
          <button
            type="button"
            className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800"
            id="options-menu"
            onClick={() => setIsOpen(!isOpen)}
            aria-haspopup="true"
            aria-expanded="true"
          >
            {t('filter')}
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </span>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div ref={ref} className="absolute w-56 mt-2 origin-top-right rounded-md shadow-lg">
            <div className="p-4 bg-white rounded-md shadow-xs">
              <div role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                <Formik initialValues={initialValues} onSubmit={handleFilter}>
                  <Form>
                    <TextInput label={t('name')} name="name" type="text" />
                    <span className="flex justify-end rounded-md shadow-sm">
                      <button
                        type="submit"
                        className="w-full px-4 py-2 mt-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out rounded-md bg-primary-500 hover:bg-primary-300 hover:text-grey-600 focus:outline-none focus:shadow-outline-indigo"
                      >
                        {t('filter')}
                      </button>
                    </span>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

SimpleFilter.propTypes = {
  onGetData: PropTypes.func.isRequired
};

export default SimpleFilter;
