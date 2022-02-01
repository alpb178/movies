/* eslint-disable react/display-name */
import AutocompleteField from '@/components/form/AutocompleteField';
import useRegions from '@/hooks/location/region/useRegions';
import useShipments from '@/hooks/shipment/useShipments';
import useUsers from '@/hooks/user/useUsers';
import { POST } from '@/lib/constants';
import { UserIcon } from '@heroicons/react/outline';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import * as Yup from 'yup';
import BaggageCapacityForm from '../travels/TravelForm/BaggageCapacityForm';
import DepartureDateForm from '../travels/TravelForm/DepartureDateForm';

const ShipmentsForm = ({ onOpen }) => {
  const { t } = useTranslation('common');
  const [destination, setDestination] = useState();
  const [baggageCapacity, setBaggageCapacity] = useState();

  const initialValues = {
    sender: '',
    travel: {},
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

  const validationSchema = Yup.object().shape({
    sender: Yup.string().required()
  });

  const onSubmit = (values) => {
    values.measureUnit = values.measureUnit.id;
    useShipments({
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
          <Form className="p-6 space-y-6">
            <p className="form-header">{t('form.shipment.title.create')}</p>
            <div className="w-full">
              <AutocompleteField
                name="sender"
                placeholder={t('form.shipment.placeholder.sender')}
                options={users ? users : []}
                className="autocomplete-field"
                optionLabels={['firstName', 'lastName']}
                keysToMatch={['firstName', 'lastName', 'username']}
                icon={UserIcon}
                // defaultValue={travel?.sender}
              />
            </div>

            <div className="pt-6 space-y-6">
              <p className="text-xl font-medium text-gray-700">{t('Buscar viajero')}</p>

              <div className="flex flex-col items-center w-full space-y-6">
                <div className="w-full">
                  <AutocompleteField
                    name="origin"
                    placeholder={t('form.travel.placeholder.origin')}
                    options={regions ? regions.rows : []}
                    optionLabels={['name', 'country.name']}
                    keysToMatch={['name', 'code', 'country.name']}
                    className="autocomplete-field"
                    // defaultValue={travel?.origin}
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
                    // defaultValue={travel?.destination}
                  />
                </div>
              </div>
              <DepartureDateForm />
              <BaggageCapacityForm
                destination={destination}
                errors={errors}
                onShipmentItemsChange={setBaggageCapacity}
                touched={touched}
                isSender
              />
            </div>

            <button type="submit"></button>
          </Form>
        )}
      </Formik>
    </>
  );
};

ShipmentsForm.propTypes = {
  onOpen: PropTypes.func.isRequired
};

export default ShipmentsForm;
