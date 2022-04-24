import ShipmentItemsList from 'containers/shipment-items/ShipmentItemsList';
import { ROLE_ADMIN } from 'lib/constants';
import dynamic from 'next/dynamic';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const ShipmentItemsPage = () => {
  return <ShipmentItemsList />;
};

ShipmentItemsPage.layout = Admin;
ShipmentItemsPage.roles = [ROLE_ADMIN];

export default ShipmentItemsPage;
