import RolesList from 'containers/roles/RolesList';
import { ROLE_ADMIN } from 'lib/constants';
import dynamic from 'next/dynamic';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const RolesPage = () => {
  return <RolesList />;
};

RolesPage.layout = Admin;
RolesPage.roles = [ROLE_ADMIN];

export default RolesPage;
