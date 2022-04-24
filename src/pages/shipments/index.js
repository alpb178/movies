import ShipmentsList from '@/containers/shipments/ShipmentsList';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const ShipmentsPage = () => {
  return <ShipmentsList />;
};

ShipmentsPage.layout = Admin;
ShipmentsPage.roles = [ROLE_ADMIN];

export default ShipmentsPage;
