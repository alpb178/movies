/* eslint-disable react/display-name */
import AutocompleteField from '@/components/form/AutocompleteField';
import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import useCountries from '@/hooks/location/country/useCountries';
import useRegions from '@/hooks/location/region/useRegions';
import { API_REGIONS_URL, POST, PUT } from '@/lib/constants';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const RegionForm = ({ data, errors, onOpen, open, touched }) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();

  const { data: countries } = useCountries({
    args: {},
    options: {
      keepPreviousData: true
    }
  });

  const initialValues = {
    name: data?.name || '',
    code: data?.code || '',
    country: data?.country || {}
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('form.common.required.name')),
    code: Yup.string().required(t('form.common.required.code')),
    country: Yup.object().required(t('form.region.required.country')).nullable()
  });

  const onSubmit = (values) => {
    try {
      values.country = values.country.id;
      let method = POST;

      if (data) {
        method = PUT;
        values.id = data.id;
      }

      useRegions({
        args: values,
        options: {
          method
        }
      });

      onOpen(false);
      queryClient.refetchQueries([API_REGIONS_URL]);
    } catch (error) {
      toast.error(error);
    }
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
            defaultValue={data?.country}
          />
        </div>
      </div>
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
