import { Menu, Transition } from '@headlessui/react';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React from 'react';

const DataFilter = ({ children, initialValues, onSubmit, open }) => {
  const { t } = useTranslation('common');

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
          <Menu.Items className="mb-4">
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              <Form className="flex items-end w-full space-x-6">
                {children}

                <button type="submit" className="btn-contained" style={{ marginBottom: '0px' }}>
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

DataFilter.defaultProps = {
  open: false
};

DataFilter.propTypes = {
  children: PropTypes.object.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool
};

export default DataFilter;
