import NotFound from '@/containers/common/NotFound';
import dynamic from 'next/dynamic';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const NotFoundPage = () => {
  return <NotFound />;
};

NotFoundPage.layout = Admin;

export default NotFoundPage;
