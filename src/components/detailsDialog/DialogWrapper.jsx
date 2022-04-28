import { Dialog, Transition } from '@headlessui/react';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useState } from 'react';

const DetailsDialogWrapper = ({ children, open, onOpen, formName }) => {
  const { t } = useTranslation('common');
  const [title, setTitle] = useState();

  useEffect(() => {
    setTitle(`form.${formName}.title.details`);
  }, []);

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
                <p className="form-header">{t(title)}</p>
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
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

DetailsDialogWrapper.defaultProps = {
  formName: 'common'
};

DetailsDialogWrapper.propTypes = {
  children: PropTypes.array.isRequired,
  formName: PropTypes.string,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool
};

export default DetailsDialogWrapper;
