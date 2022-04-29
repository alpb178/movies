/* eslint-disable react/display-name */
import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import useMeasureUnits from '@/hooks/measure-unit/useMeasureUnits';
import { API_MEASURE_UNITS_URL, POST, PUT } from '@/lib/constants';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const MeasureUnitsForm = ({ data, errors, onOpen, open, touched, setLoading }) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const [isNewData, setIsNewData] = useState(true);
  const initialValues = {
    name: data?.name || '',
    symbol: data?.symbol || ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string(),
    symbol: Yup.string()
  });

  const onSubmit = (values) => {
    let method = POST;
    let message = t('inserted.male', { entity: t('measure-units', { count: 1 }) });
    if (data) {
      method = PUT;
      values.id = data.id;
      message = t('updated.male', { entity: t('measure-units', { count: 1 }) });
    }

    try {
      setLoading(true);
      useMeasureUnits({
        args: values,
        options: {
          method: method
        }
      });

      onOpen(false);
      queryClient.invalidateQueries([API_MEASURE_UNITS_URL]);
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
      formName="measure-unit"
      open={open}
      onOpen={onOpen}
      isNewData={isNewData}
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
        <label htmlFor="symbol">{t('symbol')}</label>
        <div className="relative w-full mx-auto">
          <Field
            id="symbol"
            name="symbol"
            className={`text-field ${
              errors?.symbol && touched?.symbol ? 'border-red-400' : 'border-gray-300'
            }`}
          />
          {errors?.symbol && touched?.symbol ? (
            <p className="mt-4 text-red-600">{errors?.symbol}</p>
          ) : null}
        </div>
      </div>
    </FormDialogWrapper>
  );
};

MeasureUnitsForm.propTypes = {
  data: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  symbol: PropTypes.object.isRequired,
  name: PropTypes.object.isRequired,
  onOpen: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default MeasureUnitsForm;
