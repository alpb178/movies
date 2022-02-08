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
  formName
}) => {
  const { t } = useTranslation('common');
  const [title, setTitle] = useState();

  useEffect(() => {
    setTitle(isNewData ? `form.${formName}.title.create` : `form.${formName}.title.update`);
  }, [formName]);

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => onOpen(false)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black opacity-50" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="inline-block h-screen align-middle" aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-lg">
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
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
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
  validationSchema: PropTypes.object
};

export default FormDialogWrapper;
