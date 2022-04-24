import ShipmentItemsForm from '@/containers/shipment-items/ShipmentItemsForm';
import { ROLE_ADMIN } from 'lib/constants';
import dynamic from 'next/dynamic';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

function CreateShipmentItemPage() {
  return <ShipmentItemsForm />;
}

CreateShipmentItemPage.layout = Admin;
CreateShipmentItemPage.roles = [ROLE_ADMIN];

export default CreateShipmentItemPage;
