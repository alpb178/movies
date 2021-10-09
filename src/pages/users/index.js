import React from 'react';
import dynamic from 'next/dynamic';
import UsersList from 'containers/users/UsersList';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const UsersPage = () => {
  return <UsersList />;
};

UsersPage.layout = Admin;

export default UsersPage;
