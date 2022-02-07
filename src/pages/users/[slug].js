import UserDetails from '@/containers/users/UserDetails';
import { ADMIN_ROLE } from '@/lib/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const UserDetailPage = () => {
  const router = useRouter();
  const userId = router.query.slug;

  return <UserDetails userId={userId} />;
};

UserDetailPage.propTypes = {
  user: PropTypes.object.isRequired
};

UserDetailPage.layout = Admin;
UserDetailPage.roles = [ADMIN_ROLE];

export default UserDetailPage;
