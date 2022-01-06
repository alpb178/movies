/* eslint-disable react/display-name */
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { LocationMarkerIcon } from '@heroicons/react/outline';
import useCountries from '@/hooks/location/country/useCountries';
import AutosuggestField from '@/components/form/AutosuggestField';
import useShipmentItems from '@/hooks/shipment-item/useShipmentItems';
import { POST } from '@/lib/constants';
import FormDialogWrapper from '@/components/form/FormDialogWrapper';

const RegulationsForm = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const initialValues = {
    maxAmount: 0,
    shipmentItem: {},
    country: {}
  };

  const params = useMemo(() => {
    return {};
  }, []);

  const { data: countries } = useCountries({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  const { data: shipmentItems } = useShipmentItems({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  const validationSchema = Yup.object().shape({
    maxAmount: Yup.string(),
    shipmentItem: Yup.object().shape({ name: Yup.string() }),
    country: Yup.object().shape({ name: Yup.string() })
  });

  const onSubmit = (values) => {
    values.shipmentItem = values.shipmentItem.id;

    useShipmentItems({
      args: values,
      options: {
        method: POST
      }
    });
  };

  return (
    <FormDialogWrapper>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched }) => (
          <Form className="m-10 space-y-6">
            <p className="form-header">{t('form.regulation.title.create')}</p>
            <div className="space-y-2">
              <label htmlFor="country">{t('form.regulation.label.country')}</label>
              <div className="relative w-full mx-auto">
                <div className="absolute z-10 text-center text-gray-500">
                  <LocationMarkerIcon className="w-6 h-6 m-4" />
                </div>
                <AutosuggestField
                  id="country"
                  name="country"
                  options={countries ? countries : []}
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
              <label htmlFor="country">{t('form.regulation.label.shipment-item')}</label>
              <div className="relative w-full mx-auto">
                <div className="absolute z-10 text-center text-gray-500">
                  <LocationMarkerIcon className="w-6 h-6 m-4" />
                </div>
                <AutosuggestField
                  id="shipmentItem"
                  name="shipmentItem"
                  placeholder={t('form.publish.departure.placeholder')}
                  options={shipmentItems ? shipmentItems : []}
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
              <label htmlFor="maxAmount">{t('form.regulation.label.permited-amount')}</label>
              <Field
                type="text"
                name="maxAmount"
                id="maxAmount"
                className={`text-field ${
                  errors.maxAmount && touched.maxAmount ? 'border-red-400' : 'border-gray-300'
                }`}
                aria-describedby="maxAmount"
              />
              {errors.maxAmount && touched.maxAmount ? (
                <p className="mt-2 text-sm text-red-600">{errors.maxAmount}</p>
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
    </FormDialogWrapper>
  );
};

RegulationsForm.propTypes = {};

export default RegulationsForm;
