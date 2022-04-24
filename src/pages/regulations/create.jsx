import RegulationsForm from '@/containers/regulations/RegulationsForm';
import { ROLE_ADMIN } from 'lib/constants';
import dynamic from 'next/dynamic';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

function CreateRegulationPage() {
  return <RegulationsForm />;
}

CreateRegulationPage.layout = Admin;
CreateRegulationPage.roles = [ROLE_ADMIN];

export default CreateRegulationPage;
