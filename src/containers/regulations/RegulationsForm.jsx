/* eslint-disable react/display-name */
import AutocompleteField from '@/components/form/AutocompleteField';
import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import useCountries from '@/hooks/location/country/useCountries';
import { saveRegulations } from '@/hooks/regulation/useRegulations';
import useShipmentItems from '@/hooks/shipment-item/useShipmentItems';
import { API_REGULATIONS_URL, POST, PUT } from '@/lib/constants';
import { Switch, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import 'rc-slider/assets/index.css';
import React, { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const RegulationsForm = ({ data, open, onOpen, setLoading }) => {
  const { t } = useTranslation('common');
  const [regulatePriceRange, setRegulatePriceRange] = useState(false);
  const queryClient = useQueryClient();
  const [isNewData, setIsNewData] = useState(true);
  const [errors, setErrorsForm] = useState({});
  const [touched, setTouchedForm] = useState({});

  useEffect(() => {
    setRegulatePriceRange(data?.minPrice > 0 || data?.maxPrice > 0);
  }, [data]);

  useEffect(() => {
    data?.id ? setIsNewData(false) : setIsNewData(true);
  }, [data?.id]);

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
    shipmentItem: data?.shipmentItem || '',
    country: data?.country || ''
  };

  const validationSchema = Yup.object().shape(
    {
      maxAmount: Yup.number()
        .positive(t('form.common.amount.maxAmount'))
        .integer('Must be more than 0')
        .required(t('form.common.required.maxAmount')),
      shipmentItem: Yup.object().nullable().required(t('form.common.required.shipmentItems')),
      country: Yup.object().nullable().required(t('form.region.required.country')),
      maxPrice: Yup.number().when('minPrice', {
        is: (minPrice) => minPrice > 0,
        then: Yup.number()
          .required(t('form.common.required.maxPrice'))
          .moreThan(Yup.ref('minPrice'), t('form.common.amount.maxPrice')),
        otherwise: Yup.number()
      }),
      minPrice: Yup.number().when('maxPrice', {
        is: (maxPrice) => maxPrice > 0,
        then: Yup.number().required(t('form.common.required.minPrice')),
        otherwise: Yup.number()
      })
    },
    [['maxPrice', 'minPrice']]
  );

  const onSubmit = async (values) => {
    values.shipmentItem = values.shipmentItem.id;
    values.country = values.country.id;
    let method = POST;
    let message = t('inserted.female', { entity: t('regulations', { count: 1 }) });
    if (data) {
      method = PUT;
      values.id = data.id;
      message = t('updated.female', { entity: t('regulations', { count: 1 }) });
    }
    try {
      setLoading(true);
      await saveRegulations({
        args: values,
        options: {
          method: method
        }
      });
      await queryClient.invalidateQueries([API_REGULATIONS_URL]);
      toast(message);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
    onOpen(false);
  };

  return (
    <FormDialogWrapper
      formName="regulation"
      open={open}
      onOpen={onOpen}
      initialValues={initialValues}
      onSubmit={onSubmit}
      isNewData={isNewData}
      setErrorsForm={setErrorsForm}
      setTouchedForm={setTouchedForm}
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
          type="number"
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
              type="number"
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
              type="number"
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
  touched: PropTypes.object,
  setLoading: PropTypes.func.isRequired
};

export default RegulationsForm;
