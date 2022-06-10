import { Dialog, Transition } from '@headlessui/react';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { Fragment, useMemo } from 'react';

const DialogWrapper = ({ children, open, onOpen, title }) => {
  const { t } = useTranslation('common');

  const dialogTitle = useMemo(() => (title ? `form.${title}.title.details` : null), [title]);

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
                {dialogTitle ? (
                  <Dialog.Title as="h3" className="form-header">
                    {t(dialogTitle)}
                  </Dialog.Title>
                ) : null}

                {React.Children.map(children, (child) => {
                  if (React.isValidElement(child)) {
                    return React.cloneElement(child, { onOpen });
                  }
                  return child;
                })}
                <div className="flex space-x-6">
                  <button
                    type="button"
                    className="justify-center w-full px-4 py-3 mt-6 font-medium leading-5 text-gray-700 transition duration-300 ease-in-out bg-white border rounded-md hover:bg-gray-100"
                    onClick={() => onOpen(false)}
                  >
                    {t('close')}
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

DialogWrapper.defaultProps = {
  formName: 'common'
};

DialogWrapper.propTypes = {
  children: PropTypes.array.isRequired,
  title: PropTypes.string,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool
};

export default DialogWrapper;
