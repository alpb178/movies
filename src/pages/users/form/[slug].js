import UsersForm from '@/containers/users/UserForm/UsersForm';
import { ROLE_ADMIN } from 'lib/constants';
import dynamic from 'next/dynamic';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const UsersFormCreatePage = () => {
  return <UsersForm />;
};

UsersFormCreatePage.layout = Admin;
UsersFormCreatePage.roles = [ROLE_ADMIN];

export default UsersFormCreatePage;
