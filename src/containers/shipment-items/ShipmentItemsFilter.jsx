import React, { useEffect } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { Field } from 'formik';
import DataFilter from '@/components/filter/DataFilter';

const ShipmentItemsFilter = ({ data, onSubmit, open }) => {
  const { t } = useTranslation('common');

  const initialValues = {
    username: '',
    surname: '',
    name: '',
    phone: '',
    email: '',
    roles: ''
  };

  return (
    <DataFilter initialValues={initialValues} onSubmit={onSubmit} open={open}>
      <div className="w-full">
        <label htmlFor="username" className="block font-medium text-gray-700">
          {t('username')}
        </label>
        <Field
          type="text"
          className="w-full mt-1 border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
          name="username"
          id="username"
          aria-describedby="username"
        />
      </div>
      <div className="w-full">
        <label htmlFor="name" className="block font-medium text-gray-700">
          {t('name')}
        </label>
        <Field
          type="text"
          className="w-full mt-1 border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
          name="name"
          id="name"
          aria-describedby="name"
        />
      </div>
      <div className="w-full">
        <label htmlFor="surname" className="block font-medium text-gray-700">
          {t('surname')}
        </label>
        <Field
          type="text"
          className="w-full mt-1 border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
          name="surname"
          id="surname"
          aria-describedby="surname"
        />
      </div>
      <div className="w-full">
        <label htmlFor="phone" className="block font-medium text-gray-700">
          {t('phone')}
        </label>
        <Field
          type="text"
          className="w-full mt-1 border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
          name="phone"
          id="phone"
          aria-describedby="phone"
        />
      </div>
      <div className="w-full">
        <label htmlFor="email" className="block font-medium text-gray-700">
          {t('email')}
        </label>
        <Field
          type="text"
          className="w-full mt-1 border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
          name="email"
          id="email"
          aria-describedby="email"
        />
      </div>
      <div className="w-full">
        <label htmlFor="rol" className="block font-medium text-gray-700">
          {t('role')}
        </label>
        <Field
          as="select"
          className="w-full mt-1 border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500 sm:text-sm"
          name="roles"
        >
          <option value="first"></option>
          {/* {data?.toJS().map((rol) => (
                        <option key={rol.name} value={rol.name}>
                          {rol.name}
                        </option>
                      ))} */}
        </Field>
      </div>
    </DataFilter>
  );
};

export default ShipmentItemsFilter;
