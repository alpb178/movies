import { useAppContext } from '@/components/context/AppContext';
import FormikAsyncAutocompleteField from '@/components/form/async-autocomplete/formik';
import useUsers from '@/hooks/user/useUsers';
import { API_USERS_URL } from '@/lib/constants';
import { lottieOptions } from '@/lib/utils';
import { Menu, Transition } from '@headlessui/react';
import { getDaysInMonth } from 'date-fns';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { useMemo, useState } from 'react';
import Lottie from 'react-lottie';

const CashRegisterFilter = ({ data, onSubmit, open }) => {
  const { t } = useTranslation('common');

  const { user } = useAppContext();
  const [selectedYear, setSelectedYear] = useState();
  const [selectedMonth, setSelectedMonth] = useState();

  const { data: users } = useUsers();
  const months = [
    { id: 1, name: 'January' },
    { id: 2, name: 'February' },
    { id: 3, name: 'March' },
    { id: 4, name: 'April' },
    { id: 5, name: 'May' },
    { id: 6, name: 'June' },
    { id: 7, name: 'July' },
    { id: 8, name: 'August' },
    { id: 9, name: 'September' },
    { id: 10, name: 'October' },
    { id: 11, name: 'November' },
    { id: 12, name: 'December' }
  ];

  const daysInCurrentMonth = getDaysInMonth(2020, 9);

  const initialValues = {
    month: '',
    day: '',
    year: '',
    user: ''
  };

  const years = useMemo(() => {
    const years = [];
    const yearsBusiness = new Date(user.data.business[0].createdAt).getFullYear();
    const yearsCurrent = new Date().getFullYear();
    if (yearsCurrent - yearsBusiness == 0) years.push({ id: 0, year: yearsBusiness });
    else
      for (let i = 0; i < yearsCurrent - yearsBusiness; i++) {
        years.push({ id: i, year: yearsBusiness++ });
      }

    return years;
  }, []);

  const days = useMemo(() => {
    const days = [];
    const length = new Date(selectedYear?.year, selectedMonth?.id, 0).getDate();
    for (let i = 1; i <= length; i++) {
      days.push({ id: i });
    }
    return days;
  }, [selectedMonth?.id > 0]);

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
          <Menu.Items>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              <Form className="flex items-center justify-end w-full space-x-4">
                <div className="w-96">
                  <FormikAsyncAutocompleteField
                    id="day"
                    name="day"
                    placheholder="ale"
                    options={days ? days : []}
                    className="autocomplete-field"
                    optionLabels={['id']}
                    keysToMatch={['id']}
                    disabled={!selectedMonth}
                    baseEndpoint={API_USERS_URL}
                    loader={
                      <Lottie options={lottieOptions('simple')} style={{ width: 64, height: 64 }} />
                    }
                    emptyOptionsLabel={t('users', { count: 0 })}
                  />
                </div>
                <div className="w-96">
                  <FormikAsyncAutocompleteField
                    id="month"
                    name="month"
                    placheholder={t('month')}
                    options={months ? months : []}
                    className="autocomplete-field"
                    optionLabels={['name']}
                    keysToMatch={['name']}
                    onSelectionChange={setSelectedMonth}
                    disabled={!selectedYear}
                  />
                </div>
                <div className="w-96">
                  <FormikAsyncAutocompleteField
                    id="year"
                    name="year"
                    placheholder={t('day')}
                    options={years ? years : []}
                    className="autocomplete-field"
                    optionLabels={['year']}
                    keysToMatch={['year']}
                    onSelectionChange={setSelectedYear}
                  />
                </div>
                <div className="w-96">
                  <FormikAsyncAutocompleteField
                    id="users"
                    name="users"
                    placheholder={t('users')}
                    options={users ? users?.rows : []}
                    className="autocomplete-field"
                    optionLabels={['firstName', 'lastName']}
                    keysToMatch={['firstName', 'lastName']}
                    baseEndpoint={API_USERS_URL}
                    loader={
                      <Lottie options={lottieOptions('simple')} style={{ width: 64, height: 64 }} />
                    }
                    emptyOptionsLabel={t('users', { count: 0 })}
                  />
                </div>

                <button type="submit" className="btn-contained">
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

export default CashRegisterFilter;
