import React from 'react';
import dynamic from 'next/dynamic';
import UsersList from 'containers/users/UsersList';
import { ADMIN_ROLE } from 'lib/constants';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const UsersPage = () => {
  return <UsersList />;
};

UsersPage.layout = Admin;
UsersPage.roles = [ADMIN_ROLE];

export default UsersPage;
