import CountriesList from '@/containers/locations/countries/CountriesList';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const CountriesPage = () => {
  return <CountriesList />;
};

CountriesPage.layout = Admin;
CountriesPage.roles = [ROLE_ADMIN];

export default CountriesPage;
