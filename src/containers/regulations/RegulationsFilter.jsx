import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Menu, Transition } from '@headlessui/react';
import useTranslation from 'next-translate/useTranslation';
import { getRoles } from 'redux/actions';
import { Formik, Field, Form } from 'formik';

const RegulationsFilter = ({ data, onSubmit, open }) => {
  const { t } = useTranslation('common');

  const initialValues = {
    shipmentItem: '',
    country: '',
    maxAmount: ''
  };

  useEffect(() => {}, []);

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
                    <label htmlFor="username" className="block font-medium text-gray-700">
                      {t('username')}
                    </label>
                    <Field
                      type="text"
                      className="w-full mt-1 border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      name="username"
                      id="username"
                      aria-describedby="username"
                    />
                  </div>
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
                  <div className="w-full">
                    <label htmlFor="surname" className="block font-medium text-gray-700">
                      {t('surname')}
                    </label>
                    <Field
                      type="text"
                      className="w-full mt-1 border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      name="surname"
                      id="surname"
                      aria-describedby="surname"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2 font-medium text-white rounded-md bg-primary-500"
                  >
                    {t('filter')}
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

const rolReducer = 'rol';

const mapStateToProps = (state) => ({
  loading: state.getIn([rolReducer, 'loading']),
  data: state.getIn([rolReducer, 'data']),
  filters: state.getIn([rolReducer, 'filters']),
  total: state.getIn([rolReducer, 'total'])
});

const mapDispatchToProps = (dispatch) => ({
  onGetRoles: () => dispatch(getRoles())
});

export default connect(mapStateToProps, mapDispatchToProps)(RegulationsFilter);
