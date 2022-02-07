import { Menu, Transition } from '@headlessui/react';
import { Field, Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import { connect } from 'react-redux';
import { getRoles } from 'redux/actions';

const TravelsFilter = ({ data, onSubmit, open }) => {
  const { t } = useTranslation('common');

  const initialValues = {
    traveler: '',
    flight: '',
    origin: '',
    destination: ''
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
                    <label htmlFor="traveler" className="block font-medium text-gray-700">
                      {t('traveler')}
                    </label>
                    <Field
                      type="text"
                      className="w-full mt-1 border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      name="traveler"
                      id="traveler"
                      aria-describedby="traveler"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="flight" className="block font-medium text-gray-700">
                      {t('flight')}
                    </label>
                    <Field
                      type="text"
                      className="w-full mt-1 border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      name="flight"
                      id="flight"
                      aria-describedby="flight"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="origin" className="block font-medium text-gray-700">
                      {t('origin')}
                    </label>
                    <Field
                      type="text"
                      className="w-full mt-1 border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      name="origin"
                      id="origin"
                      aria-describedby="origin"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="destination" className="block font-medium text-gray-700">
                      {t('destination')}
                    </label>
                    <Field
                      type="text"
                      className="w-full mt-1 border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      name="destination"
                      id="destination"
                      aria-describedby="destination"
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

export default connect(mapStateToProps, mapDispatchToProps)(TravelsFilter);
