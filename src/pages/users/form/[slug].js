import UsersForm from '@/containers/users/UserForm';
import { ROLE_ADMIN } from 'lib/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const UsersFormCreatePage = () => {
  const router = useRouter();
  const userId = router.query.slug;

  return <UsersForm userId={userId} />;
};

UsersFormCreatePage.layout = Admin;
UsersFormCreatePage.roles = [ROLE_ADMIN];

export default UsersFormCreatePage;
