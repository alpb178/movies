/* eslint-disable react/display-name */
import AutocompleteField from '@/components/form/AutocompleteField';
import useAirlines from '@/hooks/airline/useAirlines';
import useRegions from '@/hooks/location/region/useRegions';
import { saveTravels } from '@/hooks/travel/useTravels';
// import InputMask from 'react-input-mask';
// import useMediaContext from '@/hooks/useMediaContext';
import useUsers from '@/hooks/user/useUsers';
import { apiFetcher } from '@/lib/apiFetcher';
import { API_FLIGHTS_URL, API_TRAVELS_URL, POST } from '@/lib/constants';
import { UserIcon } from '@heroicons/react/outline';
import { Field, Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import router from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import BaggageCapacityForm from './BaggageCapacityForm';
import DepartureDateForm from './DepartureDateForm';

const TravelForm = ({ travelId }) => {
  const { t } = useTranslation('common');

  const [travel, setTravel] = useState();

  const [destination, setDestination] = useState();
  const [airline, setAirline] = useState();
  const [flights, setFlights] = useState();
  const [baggageCapacity, setBaggageCapacity] = useState();

  const initialValues = {
    traveler: travel?.traveler || '',
    origin: travel?.origin || '',
    destination: travel?.destination || '',
    departureAt: travel?.departureAt || new Date(),
    airline: travel?.airline || '',
    flight: travel?.flight || '',
    shipmentItems: travel?.shipments || []
  };

  useEffect(async () => {
    if (!isNaN(travelId)) {
      const { data } = await apiFetcher(`${API_TRAVELS_URL}/${travelId}`, {
        params: {},
        keepPreviousData: true
      });
      setTravel(data);
    }
  }, [travelId]);

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

  useEffect(async () => {
    if (airline) {
      const filters = {};
      filters.airline = airline.name;

      const { data } = await apiFetcher(API_FLIGHTS_URL, {
        params: filters,
        keepPreviousData: true
      });
      setFlights(data);
    }
  }, [airline]);

  const validationSchema = Yup.object().shape({
    traveler: Yup.object().shape({ id: Yup.number().required(t('form.travel.required.traveler')) }),
    origin: Yup.object().required(t('form.travel.required.origin')).nullable(),
    destination: Yup.object().required(t('form.travel.required.destination')).nullable(),
    departureAt: Yup.string()
  });

  const onSubmit = async (values) => {
    try {
      delete values.shipmentItem;
      values.shipmentItems = baggageCapacity;
      values.traveler = values.traveler.id;
      values.origin = values.origin.id;
      values.destination = values.destination.id;
      delete values.airline;
      values.flight = values.flight.id;

      await saveTravels({
        args: values,
        options: {
          method: POST
        }
      });
    } catch (error) {
      let _messageErrors = '';
      if (error.response) {
        const { status } = error.response;
        switch (status) {
          case 400:
            _messageErrors = t('error.400');
            break;
          case 401:
            _messageErrors = t('error.401');
            break;
          case 500:
            _messageErrors = t('error.500');
            break;
          default:
            _messageErrors = error.toString();
            break;
        }
      }

      toast.error(_messageErrors, { variant: 'error' });
    } finally {
      router.back();
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      {({ errors, touched }) => (
        <Form className="p-6 space-y-6 text-lg">
          <p className="mb-8 form-header">
            {isNaN(travelId) ? t('form.travel.title.create') : t('form.travel.title.update')}
          </p>

          <div className="flex flex-col space-y-8 lg:space-y-0 lg:space-x-12 lg:flex-row">
            <div className="flex flex-col w-full space-y-6">
              <div className="w-full">
                <AutocompleteField
                  name="traveler"
                  placeholder={t('form.travel.placeholder.traveler')}
                  options={users ? users.rows : []}
                  className="autocomplete-field"
                  optionLabels={['firstName', 'lastName']}
                  keysToMatch={['firstName', 'lastName', 'username']}
                  icon={UserIcon}
                  defaultValue={travel?.traveler}
                />
              </div>

              <div className="flex flex-col items-center w-full space-y-6">
                <div className="w-full">
                  <AutocompleteField
                    name="origin"
                    placeholder={t('form.travel.placeholder.origin')}
                    options={regions ? regions.rows : []}
                    optionLabels={['name', 'country.name']}
                    keysToMatch={['name', 'code', 'country.name']}
                    className="autocomplete-field"
                    defaultValue={travel?.origin}
                  />
                </div>

                <div className="w-full">
                  <AutocompleteField
                    name="destination"
                    placeholder={t('form.travel.placeholder.destination')}
                    options={regions ? regions.rows : []}
                    optionLabels={['name', 'country.name']}
                    keysToMatch={['name', 'code', 'country.name']}
                    className="autocomplete-field"
                    onSelectionChange={setDestination}
                    defaultValue={travel?.destination}
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
                    optionLabels={['number']}
                    keysToMatch={['number']}
                    className="w-full p-4 py-3 border border-l-0 rounded-r-md"
                    aria-describedby="flight"
                    disabled={!airline}
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
              type="button"
              className="px-8 py-3 mt-6 font-medium leading-5 transition duration-300 ease-in-out border border-gray-300 rounded-md hover:bg-red-100 hover:text-red-500 hover:border-red-500"
              onClick={() => router.back()}
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="px-8 py-3 mt-6 font-medium leading-5 text-white transition duration-300 ease-in-out rounded-md bg-primary-500 hover:bg-primary-400"
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
  travelId: null
};

TravelForm.propTypes = {
  travelId: PropTypes.number,
  onOpen: PropTypes.func.isRequired
};

export default TravelForm;
