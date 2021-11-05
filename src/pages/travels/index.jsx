import React from 'react';
import dynamic from 'next/dynamic';
import { ADMIN_ROLE } from 'lib/constants';
import TravelsList from '@/containers/travels/TravelsList';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const TravelsPage = () => {
  return <TravelsList />;
};

TravelsPage.layout = Admin;
TravelsPage.roles = [ADMIN_ROLE];

export default TravelsPage;
