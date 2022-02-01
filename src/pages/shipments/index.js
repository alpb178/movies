import ShipmentsList from '@/containers/shipments/ShipmentsList';
import { ADMIN_ROLE } from '@/lib/constants';
import dynamic from 'next/dynamic';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const ShipmentsPage = () => {
  return <ShipmentsList />;
};

ShipmentsPage.layout = Admin;
ShipmentsPage.roles = [ADMIN_ROLE];

export default ShipmentsPage;
