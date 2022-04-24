import RegulationsList from 'containers/regulations/RegulationsList';
import { ROLE_ADMIN } from 'lib/constants';
import dynamic from 'next/dynamic';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const RegulationsPage = () => {
  return <RegulationsList />;
};

RegulationsPage.layout = Admin;
RegulationsPage.roles = [ROLE_ADMIN];

export default RegulationsPage;
