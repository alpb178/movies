/* eslint-disable react/display-name */
import AutocompleteField from '@/components/form/AutocompleteField';
import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import useMeasureUnits from '@/hooks/measure-unit/useMeasureUnits';
import useShipmentItems from '@/hooks/shipment-item/useShipmentItems';
import { POST, PUT } from '@/lib/constants';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { useMemo } from 'react';
import * as Yup from 'yup';

const ShipmentItemsForm = ({ data, open, onOpen, errors, touched }) => {
  const { t } = useTranslation('common');

  const initialValues = {
    name: data?.name || '',
    measureUnit: {}
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

    if (data) {
      method = PUT;
      values.id = data.id;
    }

    await useShipmentItems({
      args: values,
      options: { method }
    });
    onOpen(false);
  };

  return (
    <FormDialogWrapper
      formName="shipment-item"
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
            placeholder={t('form.publish.departure.placeholder')}
            options={measureUnits ? measureUnits.rows : []}
            className="autocomplete-field"
          />
        </div>
      </div>
    </FormDialogWrapper>
  );
};

ShipmentItemsForm.propTypes = {
  data: PropTypes.object,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default ShipmentItemsForm;
