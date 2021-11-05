import React from 'react';
import dynamic from 'next/dynamic';
import { ADMIN_ROLE } from '@/lib/constants';
import CountriesList from '@/containers/locations/countries/CountriesList';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const CountriesPage = () => {
  return <CountriesList />;
};

CountriesPage.layout = Admin;
CountriesPage.roles = [ADMIN_ROLE];

export default CountriesPage;
