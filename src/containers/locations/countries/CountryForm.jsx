import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import { saveCountry } from '@/hooks/location/country/useCountries';
import { API_COUNTRIES_URL, POST, PUT } from '@/lib/constants';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const CountryForm = ({ data, onOpen, open, setLoading }) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const [errors, setErrorsForm] = useState({});
  const [touched, setTouchedForm] = useState({});
  const [isNewData, setIsNewData] = useState(true);
  const initialValues = {
    name: data?.name || '',
    code: data?.code || ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('form.common.required.name')),
    code: Yup.string().required(t('form.common.required.code'))
  });

  const onSubmit = async (values) => {
    let method = POST;
    let message = t('inserted.male', { entity: t('countries', { count: 1 }) });
    if (data) {
      method = PUT;
      values.id = data.id;
      message = t('updated.male', { entity: t('countries', { count: 1 }) });
    }
    try {
      setLoading(true);
      await saveCountry({
        args: values,
        options: {
          method
        }
      });

      onOpen(false);
      queryClient.invalidateQueries([API_COUNTRIES_URL]);
      toast(message);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    data?.id ? setIsNewData(false) : setIsNewData(true);
  }, [data?.id]);

  return (
    <FormDialogWrapper
      formName="country"
      open={open}
      onOpen={onOpen}
      isNewData={isNewData}
      initialValues={initialValues}
      onSubmit={onSubmit}
      setErrorsForm={setErrorsForm}
      setTouchedForm={setTouchedForm}
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
  onOpen: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default CountryForm;
