import TravelsList from '@/containers/travels/TravelsList';
import { ROLE_ADMIN } from 'lib/constants';
import dynamic from 'next/dynamic';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const TravelsPage = () => {
  return <TravelsList />;
};

TravelsPage.layout = Admin;
TravelsPage.roles = [ROLE_ADMIN];

export default TravelsPage;
