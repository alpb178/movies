import React from 'react';
import dynamic from 'next/dynamic';
import { ADMIN_ROLE } from 'lib/constants';
import ShipmentItemsForm from '@/containers/shipment-items/ShipmentItemsForm';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

function CreateShipmentItemPage() {
  return <ShipmentItemsForm />;
}

CreateShipmentItemPage.layout = Admin;
CreateShipmentItemPage.roles = [ADMIN_ROLE];

export default CreateShipmentItemPage;
