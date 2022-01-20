import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Transition } from '@headlessui/react';
import useTranslation from 'next-translate/useTranslation';
import { Formik, Field, Form } from 'formik';
import useShipmentItems from '@/hooks/shipment-item/useShipmentItems';
import useCountries from '@/hooks/location/country/useCountries';
import AutocompleteField from '@/components/form/AutocompleteField';
// import useMeasureUnits from '@/hooks/measure-unit/useMeasureUnits';

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

  // const { data: measureUnits } = useMeasureUnits({
  //   options: {
  //     keepPreviousData: true
  //   }
  // });

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
            <Menu.Items className="mb-4">
              <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <Form className="flex items-end w-full space-x-6">
                  <div className="relative w-full space-y-2">
                    <label htmlFor="country" className="block font-medium text-gray-700">
                      {t('countries', { count: 1 })}
                    </label>
                    <AutocompleteField
                      className="autocomplete-field"
                      name="country"
                      options={countries ? countries.rows : []}
                      aria-describedby="country"
                    />
                  </div>
                  <div className="relative w-full space-y-2">
                    <label htmlFor="shipmentItem" className="block font-medium text-gray-700">
                      {t('shipment-items', { count: 1 })}
                    </label>
                    <AutocompleteField
                      className="autocomplete-field"
                      name="shipmentItem"
                      options={shipmentItems ? shipmentItems.rows : []}
                      aria-describedby="shipmentItem"
                    />
                  </div>
                  <div className="w-full space-y-2">
                    <label htmlFor="maxAmount" className="block font-medium text-gray-700">
                      {t('max-amount')}
                    </label>
                    <Field
                      type="text"
                      className="text-field"
                      name="maxAmount"
                      id="maxAmount"
                      aria-describedby="maxAmount"
                    />
                  </div>
                  {/* <div className="relative w-full">
                    <label htmlFor="shipmentItem" className="block font-medium text-gray-700">
                      {t('measure-units', { count: 1 })}
                    </label>
                    <AutocompleteField
                      className="autocomplete-field"
                      name="measureUnit"
                      options={measureUnits ? measureUnits.rows : []}
                      aria-describedby="measureUnit"
                    />
                  </div> */}
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
