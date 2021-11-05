import React from 'react';
import dynamic from 'next/dynamic';
import { ADMIN_ROLE } from 'lib/constants';
import AirlinesList from '@/containers/airlines/AirlinesList';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const AirlinesPage = () => {
  return <AirlinesList />;
};

AirlinesPage.layout = Admin;
AirlinesPage.roles = [ADMIN_ROLE];

export default AirlinesPage;
