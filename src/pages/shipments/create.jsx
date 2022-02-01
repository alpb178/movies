import ShipmentsForm from '@/containers/shipments/ShipmentsForm';
import { ADMIN_ROLE } from '@/lib/constants';
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
CreateShipmentPage.roles = [ADMIN_ROLE];

export default CreateShipmentPage;
