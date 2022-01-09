import React from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { POST } from '@/lib/constants';
import useAirlines from '@/hooks/airline/useAirlines';

const AirlinesForm = ({ onOpen }) => {
  const { t } = useTranslation('common');

  const initialValues = {
    name: ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('required.name'))
  });

  const onSubmit = (values) => {
    useAirlines({
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
            <p className="form-header">{t('form.airline.title.create')}</p>
            <div className="space-y-2">
              <label htmlFor="name">{t('form.common.label.name')}</label>
              <Field
                type="text"
                name="name"
                id="name"
                className={`text-field ${
                  errors.name && touched.name ? 'border-red-400' : 'border-gray-300'
                }`}
                aria-describedby="name"
              />
              {errors.name && touched.name ? (
                <p className="mt-2 text-sm text-red-600">{errors.name}</p>
              ) : null}
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

AirlinesForm.propTypes = {
  onOpen: PropTypes.func.isRequired
};

export default AirlinesForm;
