import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import useTranslation from 'next-translate/useTranslation';

const Filter = ({ fields, onclickForm }) => {
  const { t } = useTranslation('common');

  const [fieldSelect, setField] = useState({ Nombre: '', Apellidos: '' });

  const handleChange = (event) => {
    setField({ [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    onclickForm();
    event.preventDefault();
  };

  return (
    <Menu as="div">
      <div>
        <Menu.Button className="absolute text-sm font-medium bg-white rounded-md right-12 w-max text-green">
          {t('filters')}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute py-5 mt-8 bg-white rounded-md shadow-lg right-8 w-max ring-1 ring-black ring-opacity-5">
          <form onSubmit={handleSubmit}>
            {fields?.map((field) => (
              <>
                <dt className="m-2 text-sm font-medium text-gray-500">{field.name}</dt>
                <div>
                  <input
                    id={field.name}
                    name={field.name}
                    type="text"
                    className="relative px-4 py-2 m-2 placeholder-gray-500 border border-gray-300 rounded-none appearance-none sm:text-sm"
                    onChange={handleChange}
                  />
                </div>
              </>
            ))}
            <Menu.Item>
              <div>
                <button
                  type="submit"
                  className="px-4 py-2 m-2 text-sm text-black bg-green-600 border border-transparent rounded-md float-center "
                >
                  {t('filter')}
                </button>
              </div>
            </Menu.Item>
          </form>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

Filter.defaultProps = {};

Filter.propTypes = {
  fields: PropTypes.array.isRequired
};

export default Filter;
