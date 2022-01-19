import React from 'react';
import dynamic from 'next/dynamic';
import { ADMIN_ROLE } from 'lib/constants';
import TravelDetails from '@/containers/travels/TravelDetails';
import { useRouter } from 'next/router';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

function TravelDetailsPage() {
  const router = useRouter();

  return <TravelDetails travelId={router.query.slug} />;
}

TravelDetailsPage.layout = Admin;
TravelDetailsPage.roles = [ADMIN_ROLE];

export default TravelDetailsPage;
