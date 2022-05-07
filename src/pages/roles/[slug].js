import RolesForm from '@/containers/access-control/roles/RolesForm';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const RolePage = () => {
  const router = useRouter();
  const roleId = router.query.slug;

  return <RolesForm roleId={roleId} />;
};

RolePage.propTypes = {
  user: PropTypes.object.isRequired
};

RolePage.layout = Admin;
RolePage.roles = [ROLE_ADMIN];

export default RolePage;
