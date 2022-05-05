import DataSearch from '@/components/search/DataSearch';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React from 'react';

const CountriesSearch = ({ onSubmit, open }) => {
  const initialValues = {
    textSearch: ''
  };

  const { t } = useTranslation('common');

  return (
    <DataSearch initialValues={initialValues} onSubmit={onSubmit} open={open}>
      <div className="w-full">
        <Field
          type="text"
          className="w-full mt-1 border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
          name="textSearch"
          id="textSearch"
          placeholder={t('search-entity', { entity: t('countries', { count: 1 }) })}
          aria-describedby="textSearch"
        />
      </div>
    </DataSearch>
  );
};

CountriesSearch.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  open: PropTypes.bool
};

export default CountriesSearch;
