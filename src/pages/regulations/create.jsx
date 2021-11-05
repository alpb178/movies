import React from 'react';
import dynamic from 'next/dynamic';
import { ADMIN_ROLE } from 'lib/constants';
import RegulationsForm from '@/containers/regulations/RegulationsForm';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

function CreateRegulationPage() {
  return <RegulationsForm />;
}

CreateRegulationPage.layout = Admin;
CreateRegulationPage.roles = [ADMIN_ROLE];

export default CreateRegulationPage;
