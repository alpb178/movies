import { Dialog, Transition } from '@headlessui/react';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import React, { Fragment, useEffect, useState } from 'react';
import SimpleBar from 'simplebar-react';
import 'simplebar/dist/simplebar.min.css';

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
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-40 h-screen" onClose={() => onOpen(false)}>
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
            <Dialog.Panel className="relative flex flex-col flex-1 w-full max-w-lg bg-white">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="space-y-6 overflow-y-auto">
                    <SimpleBar style={{ maxHeight: '100%' }} className="h-full">
                      <p className="px-8 pt-8 form-header">{t(title)}</p>
                      <div className="px-8 pb-24">
                        {React.Children.map(children, (child) => {
                          if (React.isValidElement(child)) {
                            setErrorsForm(errors);
                            setTouchedForm(touched);
                            return React.cloneElement(child, { onOpen, errors, touched });
                          }
                          return child;
                        })}
                      </div>
                    </SimpleBar>

                    <div className="absolute bottom-0 right-0 z-30 flex items-center justify-end w-full p-4 px-8 space-x-8 bg-white border-t">
                      <button type="button" className="btn-outlined" onClick={() => onOpen(false)}>
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
  );
}
