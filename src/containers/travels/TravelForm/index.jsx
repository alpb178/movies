/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import { Field, Form, Formik } from 'formik';
import router from 'next/router';
import * as Yup from 'yup';
import useAirlines from '@/hooks/airline/useAirlines';
import useRegions from '@/hooks/location/region/useRegions';
import { API_FLIGHTS_URL, POST } from '@/lib/constants';
// import InputMask from 'react-input-mask';
// import useMediaContext from '@/hooks/useMediaContext';
import useUsers from '@/hooks/user/useUsers';
import useTravels from '@/hooks/travel/useTravels';
import BaggageCapacityForm from './BaggageCapacityForm';
import DepartureDateForm from './DepartureDateForm';
import AutocompleteField from '@/components/form/AutocompleteField';
import { apiFetcher } from '@/lib/apiFetcher';
import { UserIcon } from '@heroicons/react/outline';

const TravelForm = ({ isNewData, onOpen }) => {
  const { t } = useTranslation('common');
  // const { isSmall } = useMediaContext();
  const [destination, setDestination] = useState();
  const [airline, setAirline] = useState();
  const [flights, setFlights] = useState();
  const [baggageCapacity, setBaggageCapacity] = useState();

  const initialValues = {
    traveler: '',
    origin: '',
    destination: '',
    departureAt: '',
    airline: '',
    shipmentItems: []
  };

  const { data: users } = useUsers({
    args: {},
    options: {
      keepPreviousData: true
    }
  });

  const { data: regions } = useRegions({
    args: {},
    options: {
      keepPreviousData: true
    }
  });

  const { data: airlines } = useAirlines({
    args: {},
    options: {
      keepPreviousData: true
    }
  });

  useEffect(() => {
    if (airline) {
      const filters = {};
      filters.airline = airline.name;

      const { data } = apiFetcher(API_FLIGHTS_URL, {
        params: filters,
        keepPreviousData: true
      });
      setFlights(data);
    }
  }, [airline]);

  const validationSchema = Yup.object().shape({
    traveler: Yup.object().shape({ id: Yup.number().required() }),
    origin: Yup.object().required(t('required.origin')).nullable(),
    destination: Yup.object().required(t('required.destination')).nullable(),
    departureAt: Yup.string()
  });

  const onSubmit = (values) => {
    values.shipmentItems = baggageCapacity;
    values.traveler = values.traveler.id;
    values.origin = values.origin.id;
    values.destination = values.destination.id;

    useTravels({
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
        <Form className="p-6 space-y-6 text-lg">
          <p className="mb-8 form-header">
            {isNewData ? t('form.travel.title.create') : t('form.travel.title.update')}
          </p>

          <div className="flex flex-col space-y-8 lg:space-y-0 lg:space-x-12 lg:flex-row">
            <div className="flex flex-col w-full space-y-6">
              <div className="relative w-full mx-auto">
                <AutocompleteField
                  name="traveler"
                  placeholder={t('form.travel.placeholder.traveler')}
                  options={users ? users : []}
                  className="autocomplete-field"
                  optionLabels={['firstName', 'lastName']}
                  keysToMatch={['firstName', 'lastName', 'username']}
                  icon={UserIcon}
                />
              </div>

              <div className="flex flex-col items-center w-full space-y-6">
                <div className="relative w-full mx-auto">
                  <AutocompleteField
                    name="origin"
                    placeholder={t('form.travel.placeholder.origin')}
                    options={regions ? regions.rows : []}
                    optionLabels={['name', 'country.name']}
                    keysToMatch={['name', 'code', 'country.name']}
                    className="autocomplete-field"
                  />
                </div>

                {/* <button
                  type="button"
                  onClick={() => {
                    setValues({ origin: values.destination, destination: values.origin });
                  }}
                  className="h-full p-3 mb-1 transition duration-200 ease-in-out border border-gray-300 rounded-full w-max hover:bg-gray-100"
                >
                  <SwitchHorizontalIcon
                    className={`w-6 h-6 text-gray-700 ${isSmall && 'rotate-90'}`}
                  />
                </button> */}

                <div className="relative w-full mx-auto">
                  <AutocompleteField
                    name="destination"
                    placeholder={t('form.travel.placeholder.destination')}
                    options={regions ? regions.rows : []}
                    optionLabels={['name', 'country.name']}
                    keysToMatch={['name', 'code', 'country.name']}
                    className="autocomplete-field"
                    onSelectionChange={setDestination}
                  />
                </div>
              </div>

              <DepartureDateForm />

              <div className="flex">
                <div className="w-full">
                  <AutocompleteField
                    name="airline"
                    placeholder={t('form.travel.placeholder.airline')}
                    options={airlines ? airlines.rows : []}
                    onSelectionChange={setAirline}
                    className="w-full p-4 py-3 border rounded-l-md"
                  />
                </div>
                <div className="w-full">
                  <AutocompleteField
                    name="flight"
                    placeholder={t('form.travel.placeholder.flight')}
                    options={flights ? flights.rows : []}
                    className="w-full p-4 py-3 border border-l-0 rounded-r-md"
                    aria-describedby="flight"
                    disabled={!airline}
                    onSelectionChange={setDestination}
                  />
                </div>
              </div>
            </div>

            <BaggageCapacityForm
              destination={destination}
              errors={errors}
              onShipmentItemsChange={setBaggageCapacity}
              touched={touched}
            />
          </div>

          <div className="w-full">
            <Field
              as="textarea"
              name="comments"
              id="comments"
              rows={3}
              placeholder={t('form.travel.placeholder.comments')}
              className="text-lg text-field"
              aria-describedby="comments"
            />
          </div>

          <div className="flex justify-end space-x-8">
            <button
              className="px-8 py-3 mt-6 font-medium leading-5 transition duration-300 ease-in-out border border-gray-300 rounded-md hover:bg-red-100 hover:text-red-500 hover:border-red-500"
              type="button"
              onClick={() => router.back()}
            >
              {t('cancel')}
            </button>
            <button
              className="px-8 py-3 mt-6 font-medium leading-5 text-white transition duration-300 ease-in-out rounded-md bg-primary-500 hover:bg-primary-400"
              type="submit"
            >
              {t('save')}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

TravelForm.defaultProps = {
  isNewData: true
};

TravelForm.propTypes = {
  isNewData: PropTypes.bool,
  onOpen: PropTypes.func.isRequired
};

export default TravelForm;
