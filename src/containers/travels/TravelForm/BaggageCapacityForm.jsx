import AutocompleteField from '@/components/form/AutocompleteField';
import useRegulations from '@/hooks/regulation/useRegulations';
import { formatPrice } from '@/lib/utils';
import { Disclosure, Transition } from '@headlessui/react';
import {
  ChevronDownIcon,
  MinusCircleIcon,
  PlusCircleIcon,
  XCircleIcon
} from '@heroicons/react/outline';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { Fragment, useEffect, useMemo, useState } from 'react';

const BaggageCapacityForm = ({
  destination,
  onShipmentItemsChange,
  isSender,
  errors,
  touched,
  travel
}) => {
  const { t } = useTranslation('common');

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [shipmentPrice, setShipmentPrice] = useState(0);

  const administrationFee = shipmentPrice * 0.12;
  const iva = shipmentPrice * 0.21;

  useEffect(() => {
    if (selectedOptions.length > 0) {
      calculateShipmentPrice();
    }
    onShipmentItemsChange(selectedOptions);
  }, [selectedOptions]);

  const regulationsParams = useMemo(() => {
    const filters = {};

    if (destination) {
      filters.country = destination?.country.name;
    }

    return filters;
  }, [destination]);

  const { data: regulations } = useRegulations({
    args: regulationsParams,
    options: {
      keepPreviousData: true
    }
  });

  const handleRemoveItem = (item) => {
    setSelectedOptions(
      selectedOptions.filter((c) => c.name !== item.name),
      setSelectedOptions((oldArray) => [...oldArray, item])
    );
  };

  const handleSelection = (item) => {
    if (item) {
      const selectedItem = item.shipmentItem;
      selectedItem.maxAmount = item.maxAmount;
      selectedItem.amount = 1;
      selectedItem.price = 1;

      if (!selectedOptions.includes(selectedItem)) {
        setSelectedOptions(
          (oldArray) => [...oldArray, selectedItem],
          regulations.rows.filter((c) => c.shipmentItem.name !== selectedItem.name)
        );
      }
    }
  };

  const decrementAmount = (item) => {
    if (item.amount > 1) {
      setSelectedOptions(
        selectedOptions.map((option) => {
          if (option.id === item.id) return { ...option, amount: option.amount - 1 };
          return option;
        })
      );
    }
  };

  const incrementAmount = (item) => {
    if (item.amount < item.maxAmount) {
      setSelectedOptions(
        selectedOptions.map((option) => {
          if (option.id === item.id) return { ...option, amount: option.amount + 1 };
          return option;
        })
      );
    }
  };

  const onPriceChange = (e, item) => {
    setSelectedOptions(
      selectedOptions.map((option) => {
        if (option.id === item.id) return { ...option, price: e.target.value };
        return option;
      })
    );
  };

  const calculateShipmentPrice = () => {
    let total = 0;
    if (selectedOptions.length > 1) {
      total = selectedOptions.reduce(
        (prev, curr) => prev.amount * prev.price + curr.amount * curr.price
      );
    } else {
      total = selectedOptions[0].amount * selectedOptions[0].price;
    }

    setShipmentPrice(total);
  };

  useMemo(() => {
    if (travel) {
      setSelectedOptions(travel?.payload);
    }
  }, [travel]);

  return (
    <div className="relative flex flex-col w-full space-y-4">
      {console.log(selectedOptions, 'Articulo')}
      <AutocompleteField
        name="shipmentItems"
        placeholder={
          isSender
            ? t('form.shipment.placeholder.payload')
            : t('form.travel.placeholder.baggage-capacity')
        }
        options={regulations ? regulations.rows : []}
        className="autocomplete-field"
        optionLabels={['shipmentItem.name']}
        keysToMatch={['shipmentItem.name']}
        onSelectionChange={handleSelection}
        disabled={!destination}
        noOptionsLabel={t('form.common.empty-options')}
        defaultValue={regulations?.rows.find(
          (element) => element?.shipmentItem.id === travel?.payload[0]?.id
        )}
      />
      <div>
        {errors?.shipmentItems && touched?.shipmentItems ? (
          <p className="mt-4 text-red-600">{errors?.name}</p>
        ) : null}
      </div>

      {selectedOptions.length > 0 ? (
        <div className="w-full border border-gray-300 divide-y rounded-md bg-gray-50">
          {selectedOptions.map((option, idx) => (
            <div key={option.name} className="flex flex-col">
              <p className="w-full px-4 pt-4 space-x-2 text-sm text-gray-400">
                <span>{option?.amount}</span>
                <span>{option?.measureUnit.name}</span>
                {!isSender ? (
                  <span>{`· ${formatPrice(option?.price)} / ${option?.measureUnit.symbol}`}</span>
                ) : null}
              </p>
              <div className="flex items-center w-full p-4 pt-0 space-x-8">
                <p className="w-full text-lg">{option.name}</p>
                <div className="flex items-center space-x-2 text-field max-w-max">
                  <button
                    type="button"
                    className="text-gray-600 rounded-full hover:text-red-500 hover:bg-red-100"
                    onClick={() => decrementAmount(option)}
                  >
                    <MinusCircleIcon className="w-8 h-8" />
                  </button>
                  <Field
                    name={`amount-${idx}`}
                    id={`amount-${idx}`}
                    value={option.amount}
                    className="w-20 px-2 text-lg"
                    aria-describedby={`amount-${idx}`}
                  />

                  <button
                    type="button"
                    className="text-gray-600 rounded-full hover:text-green-600 hover:bg-green-50"
                    onClick={() => incrementAmount(option)}
                  >
                    <PlusCircleIcon className="w-8 h-8 " />
                  </button>
                </div>

                {!isSender ? (
                  <div className="w-48">
                    <Field
                      name={`price-${idx}`}
                      id={`price-${idx}`}
                      value={option.price}
                      onChange={(e) => onPriceChange(e, option)}
                      className="px-2 text-lg text-field"
                      aria-describedby={`price-${idx}`}
                    />
                  </div>
                ) : null}

                <button
                  type="button"
                  className="text-gray-600 rounded-full hover:text-red-500 hover:bg-red-100"
                  onClick={() => handleRemoveItem(option)}
                >
                  <XCircleIcon className="w-8 h-8 " />
                </button>
              </div>
            </div>
          ))}

          {!isSender ? (
            <Disclosure as="div" className="bg-white rounded-b-md">
              {({ open }) => (
                <>
                  <Disclosure.Button className="flex items-center justify-between w-full p-4 hover:bg-secondary-50 hover:rounded-b-md">
                    <ChevronDownIcon
                      className={`${open ? 'rotate-180' : ''} w-6 h-6 transition duration-150`}
                    />
                    <div className="flex justify-between space-x-2 font-medium">
                      <p className="text-xl">{t('total')}:</p>
                      <p className="text-xl">
                        {formatPrice(shipmentPrice + Math.ceil(administrationFee) + Math.ceil(iva))}
                      </p>
                    </div>
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
                    <Disclosure.Panel className="p-4 space-y-2 text-xl border-t">
                      <div className="flex justify-between">
                        <p>{t('fees.administration')}:</p>
                        <p>{formatPrice(administrationFee)}</p>
                      </div>

                      <div className="flex justify-between">
                        <p>{t('fees.iva')}:</p>
                        <p>{formatPrice(iva)}</p>
                      </div>

                      <div className="flex justify-between">
                        <p>{t('fees.shipment')}:</p>
                        <p className="font-medium">{formatPrice(shipmentPrice)}</p>
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

BaggageCapacityForm.defaultProps = {
  destination: null
};

BaggageCapacityForm.propTypes = {
  destination: PropTypes.object.isRequired,
  onShipmentItemsChange: PropTypes.func.isRequired,
  isSender: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  travel: PropTypes.object
};

export default BaggageCapacityForm;
