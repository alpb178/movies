import React from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import { Field } from 'formik';
import * as Yup from 'yup';
import { POST } from '@/lib/constants';
import useAirlines from '@/hooks/airline/useAirlines';
import FormDialogWrapper from '@/components/form/FormDialogWrapper';

const AirlinesForm = ({ data, errors, onOpen, open, touched }) => {
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
    <FormDialogWrapper
      formName="airline"
      open={open}
      onOpen={onOpen}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <div className="space-y-2">
        <label htmlFor="name">{t('form.common.label.name')}</label>
        <Field
          type="text"
          name="name"
          id="name"
          className={`text-field ${
            errors?.name && touched?.name ? 'border-red-400' : 'border-gray-300'
          }`}
          aria-describedby="name"
        />
        {errors?.name && touched?.name ? (
          <p className="mt-2 text-sm text-red-600">{errors?.name}</p>
        ) : null}
      </div>
    </FormDialogWrapper>
  );
};

AirlinesForm.propTypes = {
  onOpen: PropTypes.func.isRequired
};

export default AirlinesForm;
