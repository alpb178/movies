import PermissionsList from '@/containers/access-control/permissions/PermissionsList';
import { ROLE_ADMIN } from 'lib/constants';
import dynamic from 'next/dynamic';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const PermissionsPage = () => {
  return <PermissionsList />;
};

PermissionsPage.layout = Admin;
PermissionsPage.roles = [ROLE_ADMIN];

export default PermissionsPage;
