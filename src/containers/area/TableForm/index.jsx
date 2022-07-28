/* eslint-disable react/react-in-jsx-scope */
import { PlusCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';

const TableForm = ({ data, setTable }) => {
  const { t } = useTranslation('common');

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [dataTables] = useState([]);

  const handleRemoveItem = (item) => {
    setSelectedOptions(
      selectedOptions.filter((c) => c !== item),
      setSelectedOptions((oldArray) => [...oldArray, item])
    );
    setTable(selectedOptions);
  };

  const handleSelection = () => {
    const item = document.getElementById('name_table').value;
    if (item) {
      const selectedItem = { code: item };
      var index = dataTables.findIndex((e) => e.code === selectedItem.code);
      dataTables.splice(index, 1);

      if (!selectedOptions?.find((e) => e.code === selectedItem.code)) {
        setSelectedOptions(
          (oldArray) => [...oldArray, selectedItem],
          dataTables.filter((c) => c.shipmentItem.name !== selectedItem.name)
        );
      }
    }
    setTable(selectedOptions);
  };

  useEffect(() => {
    setTable(selectedOptions);
  }, [selectedOptions]);

  useMemo(async () => {
    data?.length > 0 ? setSelectedOptions(data) : setSelectedOptions([]);
  }, [data]);

  return (
    <div className="relative flex flex-col w-full space-y-4">
      <label htmlFor="name">{t('form.common.label.table')}</label>
      <div className="flex items-center w-full p-4 pt-0 space-x-8">
        <input type="text" id="name_table" className="text-field  border-gray-300" />

        <button
          type="button"
          className="text-gray-600 rounded-full hover:text-green-600 hover:bg-green-50"
          onClick={() => handleSelection()}
        >
          <PlusCircleIcon className="w-8 h-8 " />
        </button>
      </div>

      {selectedOptions?.length > 0 ? (
        <div>
          {selectedOptions.map((option) => (
            <div key={option?.code} className="flex items-center w-full p-4 pt-0 space-x-8">
              <p className="text-md">{option.code}:</p>
              <button
                type="button"
                className="text-gray-600 rounded-full hover:text-red-500 hover:bg-red-100"
                onClick={() => handleRemoveItem(option)}
              >
                <XCircleIcon className="w-8 h-8 " />
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

TableForm.propTypes = {
  setTable: PropTypes.func,
  data: PropTypes.objects
};

export default TableForm;
