import { Menu, Transition } from '@headlessui/react';
import { Field, Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';

const Filter = ({ onSubmit, open }) => {
  const { t } = useTranslation('common');

  const initialValues = {
    name: ''
  };

  return (
    <Menu as="div">
      {() => (
        <>
          <Transition
            show={open}
            enter="transition duration-300 ease-out"
            enterFrom="transform -translate-y-5 opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition duration-300 ease-out"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform -translate-y-5 opacity-0"
          >
            <Menu.Items className="">
              <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <Form className="flex items-end w-full space-x-4">
                  <div className="w-full">
                    <label htmlFor="name" className="block font-medium text-gray-700">
                      {t('name')}
                    </label>
                    <Field
                      type="text"
                      className="w-full mt-1 border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      name="name"
                      id="name"
                      aria-describedby="name"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2 font-medium text-white rounded-md bg-primary-500"
                  >
                    {t('search')}
                  </button>
                </Form>
              </Formik>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

export default Filter;
