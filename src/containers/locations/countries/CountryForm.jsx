/* eslint-disable react/display-name */
import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import useCountries from '@/hooks/location/country/useCountries';
import { POST, PUT } from '@/lib/constants';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React from 'react';
import { useQueryClient } from 'react-query';
import * as Yup from 'yup';

const CountryForm = ({ data, errors, onOpen, open, touched }) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const initialValues = {
    name: data?.name || '',
    code: data?.code || ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    code: Yup.string()
  });

  const onSubmit = (values) => {
    let method = POST;
    if (data) {
      method = PUT;
      values.id = data.id;
    }

    useCountries({
      args: values,
      options: {
        method: method
      }
    });
    onOpen(false);
    queryClient.invalidateQueries();
  };

  return (
    <FormDialogWrapper
      formName="country"
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
    </FormDialogWrapper>
  );
};

CountryForm.propTypes = {
  data: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  code: PropTypes.object.isRequired,
  name: PropTypes.object.isRequired,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default CountryForm;
