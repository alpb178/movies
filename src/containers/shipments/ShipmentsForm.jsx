/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import BaggageCapacityForm from '@/components/baggageCapacityForm';
import Loading from '@/components/common/Loader';
import DateForm from '@/components/date';
import AutocompleteField from '@/components/form/AutocompleteField';
import useRegions from '@/hooks/location/region/useRegions';
import { saveShipments } from '@/hooks/shipment/useShipments';
import useUsers from '@/hooks/user/useUsers';
import { apiFetcher } from '@/lib/apiFetcher';
import { POST, TRAVELS_PAGE } from '@/lib/constants';
import { formatPrice, locales } from '@/lib/utils';
import { Disclosure, Transition } from '@headlessui/react';
import { ChevronDownIcon, PaperAirplaneIcon, UserIcon } from '@heroicons/react/outline';
import { StarIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';
import { Form, Formik } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import router from 'next/router';
import PropTypes from 'prop-types';
import { Fragment, useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const ShipmentsForm = ({ onOpen }) => {
  const { t, lang } = useTranslation('common');
  const [destination, setDestination] = useState();
  const [baggageCapacity, setBaggageCapacity] = useState();
  const [availablePayload, setAvailablePayload] = useState();
  const [usersData, setUsersData] = useState({});
  const [loading, setLoading] = useState(false);

  const initialValues = {
    sender: '',
    travel: {},
    origin: '',
    destination: '',
    amount: '',
    shipmentItems: [],
    departureAt: new Date()
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
    sender: Yup.object().nullable().required(t('form.common.required.traveler')),
    origin: Yup.object().required(t('form.common.required.origin')).nullable(),
    destination: Yup.object().required(t('form.common.required.destination')).nullable()
  });

  const onSearch = async (values) => {
    const paramToSend = {
      origin: values.origin.id,
      destination: values.destination.id,
      date: values.departureAt,
      shipping_items: `${baggageCapacity[0].id},${baggageCapacity[0].amount}`
    };

    try {
      setLoading(true);
      const { data } = await apiFetcher(`${TRAVELS_PAGE}/search`, {
        params: paramToSend,
        keepPreviousData: true
      });

      setAvailablePayload(data);
      setUsersData(values);
      onOpen(false);
      setLoading(false);
    } catch (error) {
      toast.message(error.toString());
    }
  };

  const onSubmit = async (values) => {
    let shipment = {
      sender: usersData.sender.id,
      payload: {
        travel: values?.travel.id,
        shipmentItem: usersData.shipmentItems.ShipmentItemId
      },
      status: 'PENDING',
      amount: values.amount
    };
    let method = POST;
    let message = t('inserted.male', { entity: t('shipments', { count: 1 }) });

    try {
      setLoading(true);
      await saveShipments({
        args: shipment,
        options: {
          method
        }
      });

      toast(message);
      setLoading(false);
      router.back();
    } catch (error) {
      toast.error(error.toString());
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalPrice = (amount, price) => {
    const basePrice = amount * price;
    return basePrice + basePrice * 0.21 + basePrice * 0.12;
  };

  return (
    <>
      {loading && <Loading />}
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSearch}>
        {({ errors, touched }) => (
          <Form className="p-6 space-y-6">
            <p className="form-header">{t('form.shipment.title.create')}</p>
            <div className="flex flex-col w-full lg:space-x-8 lg:flex-row">
              <div className="w-full">
                <AutocompleteField
                  name="sender"
                  placeholder={t('form.shipment.placeholder.sender')}
                  options={users ? users.rows : []}
                  className="autocomplete-field"
                  optionLabels={['firstName', 'lastName']}
                  keysToMatch={['firstName', 'lastName', 'username']}
                  icon={UserIcon}
                />
              </div>

              <div className="flex flex-col w-full space-y-6">
                <div className="flex flex-col w-full pt-6 space-y-6 lg:pt-0">
                  <div className="flex items-center w-full space-x-4">
                    <div className="w-full">
                      <AutocompleteField
                        name="origin"
                        placeholder={t('form.travel.placeholder.origin')}
                        options={regions ? regions.rows : []}
                        optionLabels={['name', 'country.name']}
                        keysToMatch={['name', 'code', 'country.name']}
                        className="autocomplete-field"
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
                      />
                    </div>
                  </div>
                  <DateForm fieldValue="departureAt" />
                  <BaggageCapacityForm
                    destination={destination}
                    errors={errors}
                    onShipmentItemsChange={setBaggageCapacity}
                    touched={touched}
                    isSender
                  />
                </div>

                <button type="submit" className="btn-contained">
                  {t('search')}
                </button>

                {availablePayload && availablePayload?.count !== 0
                  ? availablePayload?.rows.map((payload) => (
                      <Disclosure key={payload.id} as="div" className="bg-white rounded-b-md">
                        {({ open }) => (
                          <>
                            <Disclosure.Button
                              className={`${
                                open ? 'border-b-0 rounded-t-md' : 'rounded-md hover:rounded-b-md'
                              } flex items-center border justify-between w-full p-4 space-x-8 hover:bg-secondary-50 `}
                            >
                              <div className="flex justify-between w-full text-left">
                                <div className="flex space-x-6">
                                  {payload?.traveler?.profileImage ? (
                                    <Image
                                      layout="intrinsic"
                                      width={56}
                                      height={56}
                                      src={payload?.traveler?.profileImage}
                                      className="bg-gray-300 rounded-full"
                                    />
                                  ) : (
                                    <UserIcon className="p-2 text-gray-400 bg-gray-200 rounded-full w-14 h-14" />
                                  )}
                                  <div className="flex flex-col justify-between">
                                    <p>{`${payload?.travel?.traveler?.firstName} ${payload?.travel?.traveler?.lastName}`}</p>
                                    <div className="flex items-center space-x-2">
                                      <p>{`4,8`}</p>
                                      <StarIcon className="w-5 h-5 text-gray-500" />
                                    </div>
                                  </div>
                                </div>

                                <div className="flex flex-col justify-between">
                                  <p>{`${format(new Date(payload?.travel?.departureAt), 'PPP', {
                                    locale: { ...locales[lang] }
                                  })}`}</p>
                                  <p className="text-gray-500">{`${payload?.travel?.origin?.code} - ${payload?.travel?.destination?.code}`}</p>
                                </div>
                              </div>
                              <ChevronDownIcon
                                className={`${
                                  open ? 'rotate-180' : ''
                                } w-6 h-6 transition duration-150`}
                              />
                            </Disclosure.Button>

                            <Transition
                              as={Fragment}
                              enter="transition duration-150 ease-out"
                              enterFrom="transform scale-95 opacity-0"
                              enterTo="transform scale-100 opacity-100"
                              leave="transition duration-75 ease-out"
                              leaveFrom="transform scale-100 opacity-100"
                              leaveTo="transform scale-95 opacity-0"
                            >
                              <Disclosure.Panel className="space-y-2">
                                <div className="flex flex-col items-end p-4 space-y-4 border rounded-b-md">
                                  <div className="flex justify-between w-full space-x-4">
                                    <div className="flex space-x-4">
                                      {payload?.airline?.logo ? (
                                        <Image
                                          layout="intrinsic"
                                          width={56}
                                          height={56}
                                          src={
                                            payload?.airline?.logo ||
                                            '/images/image-placeholder.svg'
                                          }
                                        />
                                      ) : (
                                        <PaperAirplaneIcon className="p-2 text-gray-400 bg-gray-200 rounded-full w-14 h-14" />
                                      )}
                                      <div className="">
                                        <p className="font-medium">Precio</p>
                                        <p className="text-gray-500">
                                          {formatPrice(
                                            baggageCapacity
                                              ? calculateTotalPrice(
                                                  baggageCapacity[0]?.amount,
                                                  payload.price
                                                )
                                              : 0,
                                            0
                                          )}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="">
                                      <p>{`${format(
                                        new Date(payload?.travel?.departureAt),
                                        'PP'
                                      )}`}</p>
                                      <p className="text-gray-500">{`${payload?.travel?.origin.code} - ${payload?.travel?.destination?.code}`}</p>
                                    </div>
                                  </div>

                                  <button
                                    type="button"
                                    className="btn-contained"
                                    onClick={() => onSubmit(payload)}
                                  >
                                    Reservar
                                  </button>
                                </div>
                              </Disclosure.Panel>
                            </Transition>
                          </>
                        )}
                      </Disclosure>
                    ))
                  : null}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

ShipmentsForm.propTypes = {
  onOpen: PropTypes.func.isRequired,
  shipmentId: PropTypes.number,
  setLoading: PropTypes.func.isRequired
};

export default ShipmentsForm;
