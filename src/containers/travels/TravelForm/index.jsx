/* eslint-disable react/display-name */
import Loading from '@/components/common/Loader';
import AutocompleteField from '@/components/form/AutocompleteField';
import useAirlines from '@/hooks/airline/useAirlines';
import useFlights from '@/hooks/flight/useFlights';
import useRegions from '@/hooks/location/region/useRegions';
import useTravels, { saveTravels } from '@/hooks/travel/useTravels';
import useUsers from '@/hooks/user/useUsers';
import { POST, PUT } from '@/lib/constants';
import { Field, Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import router from 'next/router';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import BaggageCapacityForm from './BaggageCapacityForm';
import DepartureDateForm from './DepartureDateForm';

const TravelForm = ({ travelId }) => {
  const { t } = useTranslation('common');

  const [destination, setDestination] = useState();
  const [airline, setAirline] = useState();
  const [baggageCapacity, setBaggageCapacity] = useState();
  const [loading, setLoading] = useState(isLoadingTravels);

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

  const flightParams = useMemo(() => {
    const filters = {};
    filters.airline = airline?.name;
    return filters;
  }, [airline]);

  const { data: flights } = useFlights({
    args: flightParams,
    options: { keepPreviousData: true, enabled: !!airline }
  });

  const { data: travel, isLoading: isLoadingTravels } = useTravels({
    args: { id: travelId },
    options: { keepPreviousData: true, enabled: !isNaN(travelId) && !!users && !!travelId }
  });

  const validationSchema = Yup.object().shape({
    traveler: Yup.object().nullable().required(t('form.common.required.traveler')),
    origin: Yup.object().required(t('form.common.required.origin')).nullable(),
    destination: Yup.object().required(t('form.common.required.destination')).nullable(),
    airline: Yup.object().required(t('form.common.required.airline')).nullable(),
    flight: Yup.object().required(t('form.common.required.flight')).nullable(),
    departureAt: Yup.date().required()
  });

  const onSubmit = async (values) => {
    let method = POST;

    let message = t('inserted.male', { entity: t('travels', { count: 1 }) });

    if (travel) {
      method = PUT;
      values.id = travel.id;
      /* values.shipmentItems.map((option) => {
        option.id = option.ShipmentItemId || option.id;
        option.maxAmount = 2;
        option.createdAt = '2022-05-17T02:07:58.348Z';
        option.updatedAt = '2022-05-17T02:07:58.348Z';
      });*/

      message = t('updated.male', { entity: t('travels', { count: 1 }) });
    }
    try {
      setLoading(true);
      values.shipmentItems = baggageCapacity;
      values.traveler = values.traveler.id
        ? values.traveler.id
        : users.rows.find((element) => element?.email === values.traveler.email)?.id;
      values.origin = values.origin.id;
      values.destination = values.destination.id;
      delete values.airline;
      values.flight = values.flight.id;
      console.log(values);
      await saveTravels({
        args: values,
        options: {
          method
        }
      });

      await toast(message);
      await router.back();
    } catch (error) {
      toast.error(error.toString());
    } finally {
      setLoading(false);
    }
  };

  const initialValues = {
    traveler: travel?.traveler || '',
    origin: travel?.origin || '',
    destination: travel?.destination || '',
    departureAt: travel?.departureAt || new Date(),
    airline: travel?.flight?.airline || '',
    flight: travel?.flight || '',
    shipmentItems: travel?.shipments || '',
    observations: travel?.observations || ''
  };

  useMemo(() => {
    if (!isNaN(travelId) && travel) {
      setDestination(travel?.destination);
    }
  }, [travel]);

  return (
    <>
      {isLoadingTravels ? (
        <Loading />
      ) : (
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
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
                      optionLabels={['firstName', 'lastName']}
                      keysToMatch={['firstName', 'lastName', 'username']}
                      className="autocomplete-field"
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

                  <DepartureDateForm travel={travel} />

                  <div className="flex">
                    <div className="w-full">
                      <AutocompleteField
                        name="airline"
                        placeholder={t('form.travel.placeholder.airline')}
                        options={airlines ? airlines.rows : []}
                        onSelectionChange={setAirline}
                        className="w-full p-4 py-3 border rounded-l-md"
                        defaultValue={travel?.flight?.airline}
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
                        defaultValue={travel?.flight}
                        disabled={!airline}
                      />
                    </div>
                  </div>
                </div>

                <BaggageCapacityForm
                  destination={destination}
                  travel={travel}
                  errors={errors}
                  onShipmentItemsChange={setBaggageCapacity}
                  touched={touched}
                />
              </div>

              <div className="w-full">
                <Field
                  as="textarea"
                  name="observations"
                  id="observations"
                  rows={3}
                  defaultValue={travel?.observations}
                  placeholder={t('form.travel.placeholder.comments')}
                  className="text-lg text-field"
                  aria-describedby="observations"
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
      )}
    </>
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
