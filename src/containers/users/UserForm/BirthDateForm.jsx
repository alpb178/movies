import { locales } from '@/lib/utils';
import { Dialog, Transition } from '@headlessui/react';
import { CalendarIcon, XCircleIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { Fragment, useMemo, useState } from 'react';
import Calendar from 'react-calendar';

function BirthDateForm({ user }) {
  const { t, lang } = useTranslation('common');

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);

  const locale = {
    ...locales[lang]
  };

  useMemo(() => {
    if (user) {
      setSelectedDate(new Date(user?.birthdate));
    }
  }, [user]);

  return (
    <div className="space-y-2">
      <button
        type="button"
        className="flex items-center text-left text-field"
        onClick={() => setOpenCalendar(true)}
      >
        <CalendarIcon className="w-6 h-6 mr-4 text-gray-500" />
        {format(selectedDate, 'PPPP', {
          locale
        })}
      </button>
      <Transition appear show={openCalendar} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={() => setOpenCalendar(false)}
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
              <div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white rounded-md shadow-lg">
                <div className="grid items-center justify-between w-full grid-cols-3 mb-8">
                  <button
                    type="button"
                    className="rounded-full w-max hover:bg-gray-200"
                    onClick={() => setOpenCalendar(false)}
                  >
                    <XCircleIcon className="w-8 h-8 text-gray-700" />
                  </button>
                  <Dialog.Title className="col-span-2 text-xl font-medium text-gray-800">
                    {t('birthdate')}
                  </Dialog.Title>
                </div>

                <Field name="birthdate" id="birthdate">
                  {({ form: { setFieldValue } }) => (
                    <>
                      <Calendar
                        className="text-base lg:text-xl"
                        name="birthdate"
                        onChange={(newValue) => {
                          console.log(newValue);
                          setSelectedDate(new Date(newValue));
                          setFieldValue('birthdate', newValue);
                          setOpenCalendar(false);
                        }}
                      />
                    </>
                  )}
                </Field>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

BirthDateForm.propTypes = {
  user: PropTypes.object
};

export default BirthDateForm;
