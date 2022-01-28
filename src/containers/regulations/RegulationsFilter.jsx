import React from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import { Field } from 'formik';
import useShipmentItems from '@/hooks/shipment-item/useShipmentItems';
import useCountries from '@/hooks/location/country/useCountries';
import AutocompleteField from '@/components/form/AutocompleteField';
import DataFilter from '@/components/filter/DataFilter';
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
    <DataFilter initialValues={initialValues} onSubmit={onSubmit} open={open}>
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
   
    </DataFilter>
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
