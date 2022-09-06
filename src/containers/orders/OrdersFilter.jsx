import DateForm from '@/components/date';
import { Menu, Transition } from '@headlessui/react';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';

const OrdersFilter = ({ data, onSubmit, open }) => {
  const { t } = useTranslation('common');

  const initialValues = {
    'createdAt.equals': ''
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
              <Form className="flex items-end justify-end w-full space-x-4">
                <DateForm fieldValue={['createdAt.equals']} />

                <button
                  type="submit"
                  className="px-8 py-3 font-medium text-white rounded-md bg-primary-500"
                >
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

export default OrdersFilter;
