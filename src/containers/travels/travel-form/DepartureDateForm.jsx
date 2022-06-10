import DialogWrapper from '@/components/dialog/DialogWrapper';
import { locales } from '@/lib/utils';
import { Dialog } from '@headlessui/react';
import { CalendarIcon, XCircleIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import Calendar from 'react-calendar';

function DepartureDateForm({ travel }) {
  const { t, lang } = useTranslation('common');

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [openCalendar, setOpenCalendar] = useState(false);

  const locale = {
    ...locales[lang]
  };

  useMemo(() => {
    if (travel) {
      setSelectedDate(new Date(travel?.departureAt));
    }
  }, [travel]);

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

      <DialogWrapper open={openCalendar} onOpen={setOpenCalendar}>
        <>
          <div className="grid items-center justify-between w-full grid-cols-3 mb-8">
            <button
              type="button"
              className="rounded-full w-max hover:bg-gray-200"
              onClick={() => setOpenCalendar(false)}
            >
              <XCircleIcon className="w-8 h-8 text-gray-700" />
            </button>
            <Dialog.Title className="col-span-2 text-xl font-medium text-gray-800">
              {t('form.travel.placeholder.departure-date')}
            </Dialog.Title>
          </div>

          <Field name="departureAt" id="departureAt">
            {({ form: { setFieldValue } }) => (
              <>
                <Calendar
                  className="text-base lg:text-xl"
                  name="departureAt"
                  onChange={(newValue) => {
                    setSelectedDate(new Date(newValue));
                    setFieldValue('departureAt', newValue);
                    setOpenCalendar(false);
                  }}
                />
              </>
            )}
          </Field>
        </>
      </DialogWrapper>
    </div>
  );
}

DepartureDateForm.propTypes = {
  travel: PropTypes.object
};

export default DepartureDateForm;
