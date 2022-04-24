import RegionsList from '@/containers/locations/regions/RegionsList';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const RegionsPage = () => {
  return <RegionsList />;
};

RegionsPage.layout = Admin;
RegionsPage.roles = [ROLE_ADMIN];

export default RegionsPage;
