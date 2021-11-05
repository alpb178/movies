import React from 'react';
import dynamic from 'next/dynamic';
import { ADMIN_ROLE } from 'lib/constants';
import RegulationsList from 'containers/regulations/RegulationsList';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const RegulationsPage = () => {
  return <RegulationsList />;
};

RegulationsPage.layout = Admin;
RegulationsPage.roles = [ADMIN_ROLE];

export default RegulationsPage;
