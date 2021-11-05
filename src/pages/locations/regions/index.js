import React from 'react';
import dynamic from 'next/dynamic';
import { ADMIN_ROLE } from '@/lib/constants';
import RegionsList from '@/containers/locations/regions/RegionsList';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const RegionsPage = () => {
  return <RegionsList />;
};

RegionsPage.layout = Admin;
RegionsPage.roles = [ADMIN_ROLE];

export default RegionsPage;
