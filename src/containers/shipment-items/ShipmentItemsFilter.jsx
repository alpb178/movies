import DataFilter from '@/components/filter/DataFilter';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React from 'react';

const ShipmentItemsFilter = ({ data, onSubmit, open }) => {
  const { t } = useTranslation('common');

  const initialValues = {
    measureUnit: ''
  };

  return (
    <DataFilter initialValues={initialValues} onSubmit={onSubmit} open={open}>
      <div className="w-full">
        <label htmlFor="measureUnit" className="block font-medium text-gray-700">
          {t('measure-units', { count: 2 })}
        </label>
        <Field
          type="text"
          className="text-field"
          name="measureUnit"
          id="measureUnit"
          aria-describedby="measureUnit"
        />
      </div>
    </DataFilter>
  );
};

ShipmentItemsFilter.propTypes = {
  data: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool
};

export default ShipmentItemsFilter;
