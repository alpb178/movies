import ShipmentsForm from '@/containers/shipments/ShipmentsForm';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const CreateShipmentPage = () => {
  return (
    <div className="bg-white">
      <ShipmentsForm />
    </div>
  );
};

CreateShipmentPage.layout = Admin;
CreateShipmentPage.roles = [ROLE_ADMIN];

export default CreateShipmentPage;
