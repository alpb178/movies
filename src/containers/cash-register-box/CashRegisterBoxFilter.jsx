import FormikAsyncAutocompleteField from '@/components/form/async-autocomplete/formik';
import useShifts from '@/hooks/shift/useShift';
import { API_SHIFTS_URL } from '@/lib/constants';
import { lottieOptions } from '@/lib/utils';
import { Menu, Transition } from '@headlessui/react';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import Lottie from 'react-lottie';

const CashRegisterFilter = ({ data, onSubmit, open }) => {
  const { t } = useTranslation('common');

  const { data: shifts } = useShifts();

  const initialValues = {
    shift: ''
  };

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
                    id="shift"
                    name="shift"
                    placheholder={t('shifts')}
                    options={shifts ? shifts?.rows : []}
                    className="autocomplete-field"
                    optionLabels={[
                      'createdAt',
                      'updatedAt',
                      'user.firstName',
                      'user.lastName',
                      'status'
                    ]}
                    keysToMatch={['user.firstName', 'user.lastName', 'status']}
                    baseEndpoint={API_SHIFTS_URL}
                    // requestParams={regulationsParams}
                    loader={
                      <Lottie options={lottieOptions('simple')} style={{ width: 64, height: 64 }} />
                    }
                    emptyOptionsLabel={t('shipping-items', { count: 0 })}
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
