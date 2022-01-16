import React from 'react';
import dynamic from 'next/dynamic';
import { ADMIN_ROLE } from 'lib/constants';
import TravelForm from '@/containers/travels/TravelForm';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

function CreateTravelPage() {
  return (
    <div className="bg-white">
      <TravelForm />
    </div>
  );
}

CreateTravelPage.layout = Admin;
CreateTravelPage.roles = [ADMIN_ROLE];

export default CreateTravelPage;
