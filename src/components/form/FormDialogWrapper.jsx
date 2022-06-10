import { Dialog, Transition } from '@headlessui/react';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';

const FormDialogWrapper = ({
  children,
  initialValues,
  open,
  onOpen,
  onSubmit,
  validationSchema,
  isNewData,
  formName,
  setErrorsForm,
  setTouchedForm
}) => {
  const { t } = useTranslation('common');
  const [title, setTitle] = useState();

  useEffect(() => {
    setTitle(isNewData ? `form.${formName}.title.create` : `form.${formName}.title.update`);
  }, [isNewData]);

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => onOpen(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-lg p-6 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-lg">
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onSubmit}
                >
                  {({ errors, touched }) => (
                    <Form className="m-10 space-y-6">
                      <p className="form-header">{t(title)}</p>
                      {React.Children.map(children, (child) => {
                        if (React.isValidElement(child)) {
                          setErrorsForm(errors);
                          setTouchedForm(touched);
                          return React.cloneElement(child, { onOpen, errors, touched });
                        }
                        return child;
                      })}

                      <div className="flex space-x-6">
                        <button
                          type="button"
                          className="justify-center w-full px-4 py-3 mt-6 font-medium leading-5 text-gray-700 transition duration-300 ease-in-out bg-white border rounded-md hover:bg-gray-100"
                          onClick={() => onOpen(false)}
                        >
                          {t('cancel')}
                        </button>
                        <button
                          type="submit"
                          className="justify-center w-full px-4 py-3 mt-6 font-medium leading-5 text-white transition duration-300 ease-in-out rounded-md bg-primary-500 hover:bg-primary-400"
                        >
                          {t('save')}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

FormDialogWrapper.defaultProps = {
  formName: 'common',
  isNewData: true
};

FormDialogWrapper.propTypes = {
  children: PropTypes.array.isRequired,
  formName: PropTypes.string,
  initialValues: PropTypes.object.isRequired,
  isNewData: PropTypes.bool,
  onOpen: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool,
  setErrorsForm: PropTypes.func,
  setTouchedForm: PropTypes.func,
  validationSchema: PropTypes.object
};

export default FormDialogWrapper;
