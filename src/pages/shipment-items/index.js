import React from 'react';
import dynamic from 'next/dynamic';
import { ADMIN_ROLE } from 'lib/constants';
import ShipmentItemsList from 'containers/shipment-items/ShipmentItemsList';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const ShipmentItemsPage = () => {
  return <ShipmentItemsList />;
};

ShipmentItemsPage.layout = Admin;
ShipmentItemsPage.roles = [ADMIN_ROLE];

export default ShipmentItemsPage;
