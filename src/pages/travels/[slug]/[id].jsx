import React from 'react';
import dynamic from 'next/dynamic';
import { ADMIN_ROLE } from 'lib/constants';
import TravelForm from '@/containers/travels/TravelForm';
import { useRouter } from 'next/router';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const TravelFormPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="bg-white">
      <TravelForm travelId={id} />
    </div>
  );
};

TravelFormPage.layout = Admin;
TravelFormPage.roles = [ADMIN_ROLE];

export default TravelFormPage;
