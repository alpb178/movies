/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import { saveMeasureUnits } from '@/hooks/measure-unit/useMeasureUnits';
import { API_MEASURE_UNITS_URL, POST, PUT } from '@/lib/constants';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const MeasureUnitsForm = ({ data, onOpen, open, setLoading }) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const [isNewData, setIsNewData] = useState(true);
  const [errors, setErrorsForm] = useState({});
  const [touched, setTouchedForm] = useState({});
  const initialValues = {
    name: data?.name || '',
    symbol: data?.symbol || ''
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(t('form.common.required.name')),
    symbol: Yup.string().required(t('form.common.required.symbol'))
  });

  const onSubmit = async (values) => {
    let method = POST;
    let message = t('inserted.female', { entity: t('measure-units', { count: 1 }) });
    if (data) {
      method = PUT;
      values.id = data.id;
      message = t('updated.female', { entity: t('measure-units', { count: 1 }) });
    }

    try {
      setLoading(true);
      await saveMeasureUnits({
        args: values,
        options: {
          method: method
        }
      });
      await queryClient.refetchQueries([API_MEASURE_UNITS_URL]);
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

  useEffect(() => {
    onOpen(true);
  });

  return (
    <FormDialogWrapper
      formName="measure-unit"
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
  data: PropTypes.object,
  touched: PropTypes.object,
  errors: PropTypes.object,
  symbol: PropTypes.object,
  name: PropTypes.object,
  onOpen: PropTypes.func,
  setLoading: PropTypes.func,
  open: PropTypes.bool
};

export default MeasureUnitsForm;
