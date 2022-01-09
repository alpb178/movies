/* eslint-disable react/display-name */
import React from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import useCountries from '@/hooks/location/country/useCountries';
import { POST } from '@/lib/constants';

const CountryForm = ({ onOpen }) => {
  const { t } = useTranslation('common');

  const initialValues = {
    name: '',
    code: ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    code: Yup.string()
  });

  const onSubmit = (values) => {
    useCountries({
      args: values,
      options: {
        method: POST
      }
    });
    onOpen(false);
  };

  return (
    <>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form className="m-10 space-y-6">
            <p className="form-header">{t('form.country.title.create')}</p>
            <div className="space-y-2">
              <label htmlFor="name">{t('form.common.label.name')}</label>
              <div className="relative w-full mx-auto">
                <Field
                  id="name"
                  name="name"
                  className={`text-field ${
                    errors.password && touched.password ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {errors.origin && touched.origin ? (
                  <p className="mt-4 text-red-600">{errors.origin.name}</p>
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
                    errors.password && touched.password ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {errors.origin && touched.origin ? (
                  <p className="mt-4 text-red-600">{errors.origin.name}</p>
                ) : null}
              </div>
            </div>

            <button
              className="justify-center w-full px-4 py-3 mt-6 font-medium leading-5 text-white transition duration-300 ease-in-out rounded-md bg-primary-500 hover:bg-primary-300"
              type="submit"
            >
              {t('save')}
            </button>
          </Form>
        )}
      </Formik>
    </>
  );
};

CountryForm.propTypes = {
  onOpen: PropTypes.func.isRequired
};

export default CountryForm;
