import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Transition } from '@headlessui/react';
import useTranslation from 'next-translate/useTranslation';
import { Formik, Field, Form } from 'formik';
import AutosuggestField from '@/components/form/AutosuggestField';
import useShipmentItems from '@/hooks/shipment-item/useShipmentItems';
import useCountries from '@/hooks/location/country/useCountries';

const RegulationsFilter = ({ filters, onSubmit, open }) => {
  const { t } = useTranslation('common');

  const initialValues = {
    shipmentItem: filters?.shipmentItem,
    country: filters?.country,
    maxAmount: filters?.maxAmount
  };

  const { data: shipmentItems } = useShipmentItems({
    options: {
      keepPreviousData: true
    }
  });

  const { data: countries } = useCountries({
    options: {
      keepPreviousData: true
    }
  });

  return (
    <Menu as="div">
      {() => (
        <>
          <Transition
            show={open}
            enter="transition duration-300 ease-out"
            enterFrom="transform -translate-y-5 opacity-0"
            enterTo="transform translate-y-0 opacity-100"
            leave="transition duration-300 ease-out"
            leaveFrom="transform translate-y-0 opacity-100"
            leaveTo="transform -translate-y-5 opacity-0"
          >
            <Menu.Items className="">
              <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <Form className="flex items-end w-full space-x-4">
                  <div className="relative w-full">
                    <label htmlFor="country" className="block font-medium text-gray-700">
                      {t('countries', { count: 1 })}
                    </label>
                    <AutosuggestField
                      className="text-field"
                      name="country"
                      id="country"
                      options={countries ? countries.rows : []}
                      aria-describedby="country"
                    />
                  </div>
                  <div className="relative w-full">
                    <label htmlFor="shipmentItem" className="block font-medium text-gray-700">
                      {t('shipment-items', { count: 1 })}
                    </label>
                    <AutosuggestField
                      className="w-full"
                      name="shipmentItem"
                      id="shipmentItem"
                      options={shipmentItems ? shipmentItems.rows : []}
                      aria-describedby="shipmentItem"
                    />
                  </div>
                  <div className="w-full">
                    <label htmlFor="maxAmount" className="block font-medium text-gray-700">
                      {t('max-amount')}
                    </label>
                    <Field
                      type="text"
                      className="w-full mt-1 border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
                      name="maxAmount"
                      id="maxAmount"
                      aria-describedby="maxAmount"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2 font-medium text-white rounded-md bg-primary-500"
                  >
                    {t('filter')}
                  </button>
                </Form>
              </Formik>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};

RegulationsFilter.defaultProps = {
  filters: null
};

RegulationsFilter.propTypes = {
  filters: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default RegulationsFilter;
