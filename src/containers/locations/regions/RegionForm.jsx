/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import { Field } from 'formik';
import * as Yup from 'yup';
import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import AutocompleteField from '@/components/form/AutocompleteField';
import useCountries from '@/hooks/location/country/useCountries';
import useRegions from '@/hooks/location/region/useRegions';
import { POST } from '@/lib/constants';

const RegionForm = ({ data, errors, onOpen, open, touched }) => {
  const { t } = useTranslation('common');

  const { data: countries } = useCountries({
    args: {},
    options: {
      keepPreviousData: true
    }
  });

  const initialValues = {
    name: '',
    code: ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    code: Yup.string()
  });

  const onSubmit = (values) => {
    values.country = values.country.id;
    useRegions({
      args: values,
      options: {
        method: POST
      }
    });
    onOpen(false);
  };

  return (
    <FormDialogWrapper
      formName="region"
      open={open}
      onOpen={onOpen}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <div className="space-y-2">
        <label htmlFor="name">{t('form.common.label.name')}</label>
        <div className="relative w-full mx-auto">
          <Field
            id="name"
            name="name"
            className={`text-field ${
              errors?.name && touched?.name ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {errors?.name && touched?.name ? (
            <p className="mt-4 text-red-600">{errors?.name}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="code">{t('form.common.label.code')}</label>
        <div className="relative w-full mx-auto">
          <Field
            id="code"
            name="code"
            className={`text-field ${
              errors?.code && touched?.code ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {errors?.code && touched?.code ? (
            <p className="mt-4 text-red-600">{errors?.code}</p>
          ) : null}
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="country">{t('form.regulation.label.country')}</label>
        <div className="relative w-full mx-auto">
          <AutocompleteField
            id="country"
            name="country"
            options={countries ? countries.rows : []}
            className="autocomplete-field"
          />
        </div>
      </div>

      <button
        className="justify-center w-full px-4 py-3 mt-6 font-medium leading-5 text-white transition duration-300 ease-in-out rounded-md bg-primary-500 hover:bg-primary-300"
        type="submit"
      >
        {t('save')}
      </button>
    </FormDialogWrapper>
  );
};

RegionForm.defaultProps = {
  data: null,
  errors: null
};

RegionForm.propTypes = {
  data: PropTypes.object,
  errors: PropTypes.object,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  touched: PropTypes.object
};

export default RegionForm;
