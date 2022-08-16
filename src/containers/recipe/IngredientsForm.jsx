/* eslint-disable react/react-in-jsx-scope */
import AutocompleteField from '@/components/form/AutocompleteField';
import useProducts from '@/hooks/product/useProducts';
import { formatPrice } from '@/lib/utils';
import { MinusCircleIcon, PlusCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

const IngredientsForm = ({ onShipmentItemsChange, isSender, errors, touched, travel }) => {
  const { t } = useTranslation('common');

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [shipmentPrice, setShipmentPrice] = useState(0);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (selectedOptions?.length > 0) {
      calculateShipmentPrice();
    }
    onShipmentItemsChange(selectedOptions);
  }, [selectedOptions]);

  const { data: productsApi } = useProducts({
    args: {},
    options: {
      keepPreviousData: true
    }
  });

  const handleRemoveItem = (item) => {
    products.push(item);
    setSelectedOptions(
      selectedOptions.filter((c) => c.name !== item.name),
      setSelectedOptions((oldArray) => [...oldArray, item])
    );
  };

  const handleSelection = (item) => {
    if (item) {
      const selectedItem = item;
      selectedItem.amount = 1;
      var index = products.findIndex((e) => e.id === item.id);
      products.splice(index, 1);
      if (!selectedOptions.includes(selectedItem)) {
        setSelectedOptions(
          (oldArray) => [...oldArray, selectedItem],
          products.filter((c) => c.shipmentItem.name !== selectedItem.name)
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
    setSelectedOptions(
      selectedOptions.map((option) => {
        if (option.id === item.id) return { ...option, amount: option.amount + 1 };
        return option;
      })
    );
  };

  function getSumPrice(total, num) {
    return (total += num?.amount * num?.price);
  }

  const calculateShipmentPrice = () => {
    let total = 0;
    if (selectedOptions.length > 1) {
      total = selectedOptions.reduce(getSumPrice, 0);
    } else {
      total = selectedOptions[0]?.amount * selectedOptions[0]?.price;
    }

    setShipmentPrice(total);
  };

  useMemo(async () => {
    if (productsApi && !travel?.payload) setProducts(productsApi.rows);
    if (productsApi && travel?.payload) {
      travel?.payload?.map((item) => {
        const productselected = productsApi?.rows.find(
          (element) => element?.shipmentItem.id === item.shipmentItems.id
        );
        console.log(productselected, 'Ale');
        item.id = item.ShipmentItemId;
        item.measureUnit = productselected?.shipmentItem?.measureUnit;
        item.name = productselected?.shipmentItem?.name;
        item.maxAmount = productselected?.maxAmount;
        item.maxPrice = productselected?.maxPrice;
        item.minPrice = productselected?.maxPrice;
      });
      setSelectedOptions(travel?.payload);
      productsApi?.rows?.map((item) => {
        var index = travel.payload.find((e) => e.id === item.shipmentItem.id);
        !index && products.push(item);
      });
    }
  }, [productsApi]);

  return (
    <div className="relative flex flex-col w-full space-y-4">
      <AutocompleteField
        name="shipmentItems"
        placeholder={
          products.length > 0
            ? t('form.common.label.ingredients')
            : t('form.common.label.no-ingredients')
        }
        options={products ? products : []}
        className="text-field filled"
        optionLabels={['name']}
        keysToMatch={['name']}
        onSelectionChange={handleSelection}
        shipmentItems={true}
        noOptionsLabel={t('form.common.empty-options')}
      />
      <div>
        {errors?.shipmentItems && touched?.shipmentItems ? (
          <p className="mt-4 text-red-600">{errors?.name}</p>
        ) : null}
      </div>

      {selectedOptions?.length > 0 ? (
        <div className="w-full border border-gray-300 divide-y rounded-md bg-gray-50">
          {selectedOptions.map((option, idx) => (
            <div key={option?.name} className="flex flex-col">
              <p className="w-full px-4 pt-4 space-x-1 text-sm text-gray-400">
                <span>{option?.amount}</span>
                <span>{option?.measureUnit?.name}</span>
                {!isSender ? <span>{`· ${formatPrice(option?.price)} / unidad`}</span> : null}
              </p>
              <div className="flex items-center w-full p-2 pt-0 space-x-6">
                <p className="w-full text-lg">{option?.name}</p>
                <div className="flex items-center space-x-1 text-field max-w-max">
                  <button
                    type="button"
                    className="text-gray-600 rounded-full hover:text-red-500 hover:bg-red-100"
                    onClick={() => decrementAmount(option)}
                  >
                    <MinusCircleIcon className="w-6 h-6" />
                  </button>
                  <Field
                    name="amount"
                    id={`amount-${idx}`}
                    type="number"
                    value={option?.amount}
                    className="w-10 h-8 px-2 text-lg"
                    aria-describedby={`amount-${idx}`}
                  />

                  <button
                    type="button"
                    className="text-gray-600 rounded-full hover:text-green-600 hover:bg-green-50"
                    onClick={() => incrementAmount(option)}
                  >
                    <PlusCircleIcon className="w-6 h-6 " />
                  </button>
                </div>

                <p className="text-sm">{t('total')}:</p>
                <p className="text-sm">{formatPrice(shipmentPrice)}</p>

                <button
                  type="button"
                  className="text-gray-600 rounded-full hover:text-red-500 hover:bg-red-100"
                  onClick={() => handleRemoveItem(option)}
                >
                  <XCircleIcon className="w-6 h-6 " />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

IngredientsForm.propTypes = {
  errors: PropTypes.objects,
  travel: PropTypes.objects,
  touched: PropTypes.objects,
  onShipmentItemsChange: PropTypes.objects,
  isSender: PropTypes.func
};

export default IngredientsForm;
