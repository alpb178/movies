import AirlinesList from '@/containers/airlines/AirlinesList';
import { ROLE_ADMIN } from 'lib/constants';
import dynamic from 'next/dynamic';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const AirlinesPage = () => {
  return <AirlinesList />;
};

AirlinesPage.layout = Admin;
AirlinesPage.roles = [ROLE_ADMIN];

export default AirlinesPage;
