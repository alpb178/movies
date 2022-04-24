import TravelDetails from '@/containers/travels/TravelDetails';
import { ROLE_ADMIN } from 'lib/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

function TravelDetailsPage() {
  const router = useRouter();

  return <TravelDetails travelId={router.query.slug} />;
}

TravelDetailsPage.layout = Admin;
TravelDetailsPage.roles = [ROLE_ADMIN];

export default TravelDetailsPage;
