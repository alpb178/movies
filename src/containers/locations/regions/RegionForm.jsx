/* eslint-disable react/display-name */
import AutocompleteField from '@/components/form/AutocompleteField';
import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import useCountries from '@/hooks/location/country/useCountries';
import { saveRegions } from '@/hooks/location/region/useRegions';
import { API_REGIONS_URL, POST, PUT } from '@/lib/constants';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const RegionForm = ({ data, onOpen, open, setLoading }) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const [isNewData, setIsNewData] = useState(true);
  const [errors, setErrorsForm] = useState({});
  const [touched, setTouchedForm] = useState({});

  const { data: countries } = useCountries({
    args: {},
    options: {
      keepPreviousData: true
    }
  });

  const initialValues = {
    name: data?.name || '',
    code: data?.code || '',
    country: data?.country || ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('form.common.required.name')),
    code: Yup.string().required(t('form.common.required.code')),
    country: Yup.object().nullable().required(t('form.region.required.country'))
  });

  const onSubmit = async (values) => {
    values.country = values.country.id;
    let method = POST;
    let message = t('inserted.female', { entity: t('regions', { count: 1 }) });
    if (data) {
      method = PUT;
      values.id = data.id;
      message = t('updated.female', { entity: t('regions', { count: 1 }) });
    }

    try {
      setLoading(true);
      await saveRegions({
        args: values,
        options: {
          method
        }
      });
      await queryClient.refetchQueries([API_REGIONS_URL]);
      toast(message);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
      onOpen(false);
    }
  };

  useEffect(() => {
    data?.id ? setIsNewData(false) : setIsNewData(true);
  }, [data?.id]);

  return (
    <FormDialogWrapper
      formName="region"
      open={open}
      onOpen={onOpen}
      isNewData={isNewData}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      setErrorsForm={setErrorsForm}
      setTouchedForm={setTouchedForm}
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
  touched: PropTypes.object,
  setLoading: PropTypes.func.isRequired
};

export default RegionForm;
