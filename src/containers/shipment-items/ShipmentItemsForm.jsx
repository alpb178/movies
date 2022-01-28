/* eslint-disable react/display-name */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { LocationMarkerIcon } from '@heroicons/react/outline';
import AutosuggestField from '@/components/form/AutosuggestField';
import useShipmentItems from '@/hooks/shipment-item/useShipmentItems';
import { POST } from '@/lib/constants';
import useMeasureUnits from '@/hooks/measure-unit/useMeasureUnits';

const ShipmentItemsForm = ({ onOpen }) => {
  const { t } = useTranslation('common');

  const initialValues = {
    name: '',
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

  const onSubmit = (values) => {
    values.measureUnit = values.measureUnit.id;
    useShipmentItems({
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
            <p className="form-header">{t('form.shipment-item.title.create')}</p>
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
              <label htmlFor="measureUnit">{t('form.shipment-item.label.measure-unit')}</label>
              <div className="relative w-full mx-auto">
                <AutosuggestField
                  id="measureUnit"
                  name="measureUnit"
                  placeholder={t('form.publish.departure.placeholder')}
                  options={measureUnits ? measureUnits : []}
                  className={`text-field pl-none ${
                    errors.password && touched.password ? 'border-red-400' : 'border-gray-300'
                  }`}
                />
                {errors.origin && touched.origin ? (
                  <p className="mt-4 text-red-600">{errors.origin.name}</p>
                ) : null}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

ShipmentItemsForm.propTypes = {
  onOpen: PropTypes.func.isRequired
};

export default ShipmentItemsForm;
