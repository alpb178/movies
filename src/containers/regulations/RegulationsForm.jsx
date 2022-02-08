/* eslint-disable react/display-name */
import AutocompleteField from '@/components/form/AutocompleteField';
import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import useCountries from '@/hooks/location/country/useCountries';
import useRegulations from '@/hooks/regulation/useRegulations';
import useShipmentItems from '@/hooks/shipment-item/useShipmentItems';
import { POST, PUT } from '@/lib/constants';
import { Switch, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import 'rc-slider/assets/index.css';
import React, { useEffect, useMemo, useState } from 'react';
import * as Yup from 'yup';

const RegulationsForm = ({ data, open, onOpen, errors, touched }) => {
  const { t } = useTranslation('common');
  const [regulatePriceRange, setRegulatePriceRange] = useState(false);

  useEffect(() => {
    setRegulatePriceRange(data?.minPrice > 0 || data?.maxPrice > 0);
  }, [data]);

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

  const initialValues = {
    maxAmount: data?.maxAmount || 0,
    minPrice: data?.minPrice || 0,
    maxPrice: data?.maxPrice || 0,
    shipmentItem: data?.shipmentItem || {},
    country: data?.country || {}
  };

  const validationSchema = Yup.object().shape({
    maxAmount: Yup.string(),
    shipmentItem: Yup.object().shape({ name: Yup.string() }),
    country: Yup.object().shape({ name: Yup.string() })
  });

  const onSubmit = async (values) => {
    values.shipmentItem = values.shipmentItem.id;
    values.country = values.country.id;
    let method = POST;

    if (data) {
      method = PUT;
      values.id = data.id;
    }

    await useRegulations({
      args: values,
      options: { method }
    });
    onOpen(false);
  };

  return (
    <FormDialogWrapper
      formName="regulation"
      open={open}
      onOpen={onOpen}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      <div className="space-y-2">
        <label htmlFor="country">{t('form.regulation.label.country')}</label>
        <div className="relative w-full mx-auto">
          <AutocompleteField
            name="country"
            options={countries ? countries.rows : []}
            optionLabels={['name', 'code']}
            keysToMatch={['name', 'code']}
            className="autocomplete-field"
            defaultValue={data?.country}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="country">{t('form.regulation.label.shipment-item')}</label>
        <div className="relative w-full mx-auto">
          <AutocompleteField
            name="shipmentItem"
            options={shipmentItems ? shipmentItems.rows : []}
            className="autocomplete-field"
            defaultValue={data?.shipmentItem}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="maxAmount">{t('form.regulation.label.permited-amount')}</label>
        <Field
          type="text"
          name="maxAmount"
          id="maxAmount"
          className={`text-field ${
            errors && errors?.maxAmount && touched?.maxAmount ? 'border-red-400' : 'border-gray-300'
          }`}
          aria-describedby="maxAmount"
        />
        {errors && errors?.maxAmount && touched?.maxAmount ? (
          <p className="mt-2 text-sm text-red-600">{errors?.maxAmount}</p>
        ) : null}
      </div>

      <div className="flex items-center space-x-6">
        <Switch
          checked={regulatePriceRange}
          onChange={setRegulatePriceRange}
          className={clsx(
            regulatePriceRange ? 'bg-primary-600' : 'bg-gray-200',
            'relative inline-flex flex-shrink-0 h-6 w-10 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'
          )}
        >
          <span
            aria-hidden="true"
            className={clsx(
              regulatePriceRange ? 'translate-x-5' : 'translate-x-0',
              'pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
            )}
          />
        </Switch>
        <p>{t('form.regulation.label.regulate-price')}</p>
      </div>

      <Transition
        show={regulatePriceRange}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-150"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className="space-y-2">
          <label htmlFor="maxAmount">{t('form.regulation.label.price-range')}</label>
          <div className="flex space-x-6">
            <Field
              type="text"
              name="minPrice"
              id="minPrice"
              className={`text-field ${
                errors && errors?.minPrice && touched?.minPrice
                  ? 'border-red-400'
                  : 'border-gray-300'
              }`}
              aria-describedby="minPrice"
            />
            {errors && errors?.minPrice && touched?.minPrice ? (
              <p className="mt-2 text-sm text-red-600">{errors?.minPrice}</p>
            ) : null}

            <Field
              type="text"
              name="maxPrice"
              id="maxPrice"
              className={`text-field ${
                errors && errors?.maxPrice && touched?.maxPrice
                  ? 'border-red-400'
                  : 'border-gray-300'
              }`}
              aria-describedby="maxPrice"
            />
            {errors && errors?.maxPrice && touched?.maxPrice ? (
              <p className="mt-2 text-sm text-red-600">{errors?.maxPrice}</p>
            ) : null}
          </div>
        </div>
      </Transition>
    </FormDialogWrapper>
  );
};

RegulationsForm.defaultProps = {
  data: null,
  errors: null
};

RegulationsForm.propTypes = {
  data: PropTypes.object,
  errors: PropTypes.object,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  touched: PropTypes.object
};

export default RegulationsForm;
