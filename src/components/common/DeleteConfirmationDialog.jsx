import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import useTranslation from 'next-translate/useTranslation';

function DeleteConfirmationDialog({ content, onOpen, open, title, onDeleteConfirmation }) {
  const { t } = useTranslation('common');

  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => onOpen({ open: false })}
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
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-75" />
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
            <div className="inline-block w-full max-w-md p-6 my-8 space-y-4 overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl">
              <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                {title}
              </Dialog.Title>

              <p className="py-4 text-gray-500">{content}</p>

              <div className="flex justify-end mt-4 space-x-4">
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 font-medium border rounded-md hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                  onClick={() => onOpen({ open: false })}
                >
                  {t('cancel')}
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center px-4 py-2 font-medium text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-red-500"
                  onClick={() => {
                    onDeleteConfirmation();
                    onOpen({ open: false });
                  }}
                >
                  {t('delete')}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

export default DeleteConfirmationDialog;
