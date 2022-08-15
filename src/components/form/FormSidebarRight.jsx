import { Dialog, Transition } from '@headlessui/react';
import { AdjustmentsIcon } from '@heroicons/react/outline';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import React, { Fragment, useEffect, useState } from 'react';

export default function FormSidebarRight({
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
}) {
  const { t } = useTranslation('common');
  const [title, setTitle] = useState();

  useEffect(() => {
    setTitle(isNewData ? `form.${formName}.title.create` : `form.${formName}.title.update`);
  }, [isNewData]);

  return (
    <div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40" onClose={() => onOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-50" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex justify-end">
            <div className="flex-shrink-0 w-14" aria-hidden="true">
              {/* Dummy element to force sidebar to shrink to fit close icon */}
            </div>
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full opacity-0"
            >
              <Dialog.Panel className="relative flex flex-col flex-1 w-full max-w-lg py-4 bg-white">
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

                      <div className="flex items-center justify-end w-full pt-6 space-x-8">
                        <button
                          type="button"
                          className="btn-outlined"
                          onClick={() => onOpen(false)}
                        >
                          {t('cancel')}
                        </button>
                        <button type="submit" className="btn-contained">
                          {t('save')}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <div className="flex flex-col flex-1">
        <div className="sticky top-0 z-10 flex flex-shrink-0 h-16">
          <button type="button" className="px-4 text-gray-500" onClick={() => setSidebarOpen(true)}>
            <span className="sr-only">Open sidebar</span>
            <AdjustmentsIcon className="text-gray-700 rotate-90 w-7 h-7" />
          </button>
        </div>
      </div>
    </div>
  );
}
