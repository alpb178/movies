/* eslint-disable react/react-in-jsx-scope */
import FormikAsyncAutocompleteField from '@/components/form/async-autocomplete/formik';
import useProducts from '@/hooks/product/useProducts';
import { API_PRODUCTS_CATALOG_URL } from '@/lib/constants';
import { formatPrice, lottieOptions } from '@/lib/utils';
import { MinusCircleIcon, PlusCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import { Field } from 'formik';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import Lottie from 'react-lottie';

const IngredientsForm = ({ onShipmentItemsChange, errors, touched, recipe }) => {
  const { t } = useTranslation('common');

  const [selectedOptions, setSelectedOptions] = useState([]);

  const [products, setProducts] = useState([]);

  useEffect(() => {
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
      // selectedItem.measureUnit = selectedItem.measureUnit?.id;
      var index = products.findIndex((e) => e.id === item.id);
      products.splice(index, 1);
      if (!selectedOptions.includes(selectedItem)) {
        setSelectedOptions(
          (oldArray) => [...oldArray, selectedItem],
          products.filter((c) => c.name !== selectedItem.name)
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

  const onAmountChange = (item, e) => {
    const { value } = e.target;
    setSelectedOptions(
      selectedOptions.map((option) => {
        if (option.id === item.id) return { ...option, amount: value };
        return option;
      })
    );
  };

  const incrementAmount = (item) => {
    setSelectedOptions(
      selectedOptions.map((option) => {
        if (option.id === item.id) return { ...option, amount: option.amount + 1 };
        return option;
      })
    );
  };

  useMemo(async () => {
    const ingredients = [];
    if (productsApi && !recipe?.ingredients) {
      setProducts(productsApi?.rows);
    }
    if (productsApi && recipe?.ingredients) {
      recipe?.ingredients?.map((item) => {
        const itemSelect = item.product;
        itemSelect.amount = item.amount;
        itemSelect.measureUnit = item.measureUnit;
        ingredients.push(itemSelect);
      });

      setSelectedOptions(ingredients);
      productsApi?.rows.map((item) => {
        var index = ingredients.find((e) => e.id === item.id);
        !index && products.push(item);
      });
    }
  }, [productsApi]);

  return (
    <div className="relative flex flex-col w-full space-y-4">
      <FormikAsyncAutocompleteField
        id="ingredient"
        name="ingredient"
        placeholder={`${t('select')} ${t('ingredients', { count: 1 }).toLowerCase()}`}
        options={products ? products?.rows : []}
        className="bg-gray-100 border-transparent autocomplete-field"
        optionLabels={['name']}
        keysToMatch={['name']}
        onSelectionChange={handleSelection}
        baseEndpoint={API_PRODUCTS_CATALOG_URL}
        loader={<Lottie options={lottieOptions('simple')} style={{ width: 64, height: 64 }} />}
        emptyOptionsLabel={t('ingredients', { count: 0 })}
      />

      <div>
        {errors?.shipmentItems && touched?.shipmentItems ? (
          <p className="mt-4 text-red-600">{errors?.name}</p>
        ) : null}
      </div>

      {selectedOptions?.length > 0 ? (
        <div className="w-full border border-gray-300 divide-y rounded-md bg-gray-50">
          {selectedOptions.map((option, idx) => (
            <div key={option?.id} className="flex flex-col p-4">
              <p className="w-full space-x-1 text-sm text-gray-400">
                <span>{`${formatPrice(option?.cost)} / ${option?.measureUnit?.symbol}`}</span>
              </p>
              <div className="flex items-center w-full pt-0 space-x-6">
                <p className="w-full">{option?.name}</p>

                <div className="flex items-center justify-between w-full max-w-[160px] px-1 border rounded-full">
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
                    onChange={(e) => onAmountChange(option, e)}
                    className="w-full p-2 mx-0 text-center border-none md:mx-4 focus-within:outline-none active:bg-white"
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
  recipes: PropTypes.objects,
  touched: PropTypes.objects,
  onShipmentItemsChange: PropTypes.objects,
  isSender: PropTypes.func
};

export default IngredientsForm;
