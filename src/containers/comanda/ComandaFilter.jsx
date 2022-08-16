import AutocompleteField from '@/components/form/AutocompleteField';
import { Menu, Transition } from '@headlessui/react';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

const RegionsFilter = ({ data, onSubmit, open }) => {
  const { t } = useTranslation('common');

  const initialValues = {
    country: ''
  };

  return (
    <Menu as="div">
      {() => (
        <Transition
          show={open}
          enter="transition duration-300 ease-out"
          enterFrom="transform -translate-y-5 opacity-0"
          enterTo="transform translate-y-0 opacity-100"
          leave="transition duration-300 ease-out"
          leaveFrom="transform translate-y-0 opacity-100"
          leaveTo="transform -translate-y-5 opacity-0"
        >
          <Menu.Items>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              <Form className="flex items-end justify-end w-full space-x-4">
                <div className="w-96">
                  <label htmlFor="rol" className="block font-medium text-gray-700">
                    {t('countries', { count: 1 })}
                  </label>
                  <AutocompleteField className="autocomplete-field" name="country" options={[]} />
                </div>

                <button
                  type="submit"
                  className="px-8 py-3 font-medium text-white rounded-md bg-primary-500"
                >
                  {t('filter')}
                </button>
              </Form>
            </Formik>
          </Menu.Items>
        </Transition>
      )}
    </Menu>
  );
};

export default RegionsFilter;
