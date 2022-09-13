import { useAppContext } from '@/components/context/AppContext';
import FormikAsyncAutocompleteField from '@/components/form/async-autocomplete/formik';
import useUsers from '@/hooks/user/useUsers';
import { API_USERS_URL } from '@/lib/constants';
import { lottieOptions } from '@/lib/utils';
import { Menu, Transition } from '@headlessui/react';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import { useMemo } from 'react';
import Lottie from 'react-lottie';

const CashRegisterFilter = ({ data, onSubmit, open }) => {
  const { t } = useTranslation('common');

  const { user } = useAppContext();

  const { data: users } = useUsers();
  const months = [
    { id: 'January' },
    { id: 'February' },
    { id: 'March' },
    { id: 'April' },
    { id: 'May' },
    { id: 'June' },
    { id: 'July' },
    { id: 'August' },
    { id: 'September' },
    { id: 'October' },
    { id: 'November' },
    { id: 'December' }
  ];

  const initialValues = {
    shift: ''
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
            {console.log(user)}
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              <Form className="flex items-center justify-end w-full space-x-4">
                <div className="w-96">
                  <FormikAsyncAutocompleteField
                    id="day"
                    name="day"
                    placheholder={t('day')}
                    options={users ? users?.rows : []}
                    className="autocomplete-field"
                    optionLabels={['user.firstName', 'user.lastName']}
                    keysToMatch={['user.firstName', 'user.lastName', 'status']}
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
                    optionLabels={[t('id')]}
                    keysToMatch={['id']}
                    loader={
                      <Lottie options={lottieOptions('simple')} style={{ width: 64, height: 64 }} />
                    }
                    emptyOptionsLabel={t('month', { count: 0 })}
                  />
                </div>
                <div className="w-96">
                  <FormikAsyncAutocompleteField
                    id="years"
                    name="years"
                    placheholder={t('day')}
                    options={years ? years : []}
                    className="autocomplete-field"
                    optionLabels={['year']}
                    keysToMatch={['year']}
                    // baseEndpoint={API_USERS_URL}
                    // requestParams={regulationsParams}
                    loader={
                      <Lottie options={lottieOptions('simple')} style={{ width: 64, height: 64 }} />
                    }
                    emptyOptionsLabel={t('day', { count: 0 })}
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
