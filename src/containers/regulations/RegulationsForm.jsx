/* eslint-disable react/display-name */
import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import AutosuggestField from '@/components/form/AutosuggestField';
import useCountries from '@/hooks/location/country/useCountries';
import useRegulations from '@/hooks/regulation/useRegulations';
import useShipmentItems from '@/hooks/shipment-item/useShipmentItems';
import { POST } from '@/lib/constants';

const RegulationsForm = ({ onOpen }) => {
  const { t } = useTranslation('common');

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
    values.country = values.country.id;
    useRegulations({
      args: values,
      options: {
        method: POST
      }
    });
    onOpen(false);
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, touched }) => (
        <Form className="m-10 space-y-6">
          <p className="form-header">{t('form.regulation.title.create')}</p>
          <div className="space-y-2">
            <label htmlFor="country">{t('form.regulation.label.country')}</label>
            <div className="relative w-full mx-auto">
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
              <AutosuggestField
                id="shipmentItem"
                name="shipmentItem"
                placeholder={t('form.publish.departure.placeholder')}
                options={shipmentItems ? shipmentItems.rows : []}
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
  );
};

RegulationsForm.propTypes = {
  onOpen: PropTypes.func.isRequired
};

export default RegulationsForm;
