/* eslint-disable react/display-name */
import AutocompleteField from '@/components/form/AutocompleteField';
import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import useMeasureUnits from '@/hooks/measure-unit/useMeasureUnits';
import useShipmentItems from '@/hooks/shipment-item/useShipmentItems';
import { API_SHIPMENT_ITEMS_URL, POST, PUT } from '@/lib/constants';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const ShipmentItemsForm = ({ data, open, onOpen, errors, touched, setLoading }) => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const [isNewData, setIsNewData] = useState(true);

  const initialValues = {
    name: data?.name || '',
    measureUnit: data?.measureUnit || {}
  };

  const params = useMemo(() => {
    return {};
  }, []);

  const { data: measureUnits } = useMeasureUnits({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  const validationSchema = Yup.object().shape({
    name: Yup.string().required(),
    measureUnit: Yup.object().shape({ name: Yup.string() })
  });

  const onSubmit = async (values) => {
    values.measureUnit = values.measureUnit.id;
    let method = POST;
    let message = t('inserted.male', { entity: t('shipment-items', { count: 1 }) });
    if (data) {
      method = PUT;
      values.id = data.id;
      message = t('updated.male', { entity: t('shipment-items', { count: 1 }) });
    }
    try {
      setLoading(true);
      useShipmentItems({
        args: values,
        options: {
          method: method
        }
      });
      onOpen(false);
      queryClient.invalidateQueries([API_SHIPMENT_ITEMS_URL]);
      toast(message);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
    onOpen(false);
  };

  useEffect(() => {
    data?.id ? setIsNewData(false) : setIsNewData(true);
  }, [data?.id]);

  return (
    <FormDialogWrapper
      formName="shipment-item"
      open={open}
      onOpen={onOpen}
      initialValues={initialValues}
      onSubmit={onSubmit}
      isNewData={isNewData}
      validationSchema={validationSchema}
    >
      <div className="space-y-2">
        <label htmlFor="name">{t('form.common.label.name')}</label>
        <div className="relative w-full mx-auto">
          <Field
            id="name"
            name="name"
            className={`text-field ${
              errors && errors?.name && touched?.name ? 'border-red-400' : 'border-gray-300'
            }`}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="measureUnit">{t('form.shipment-item.label.measure-unit')}</label>
        <div className="relative w-full mx-auto">
          <AutocompleteField
            id="measureUnit"
            name="measureUnit"
            placeholder={t('form.shipment-item.placeholder.payload')}
            options={measureUnits ? measureUnits.rows : []}
            defaultValue={data?.measureUnit}
            className="autocomplete-field"
          />
        </div>
      </div>
    </FormDialogWrapper>
  );
};

ShipmentItemsForm.propTypes = {
  data: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  name: PropTypes.object.isRequired,
  onOpen: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default ShipmentItemsForm;
