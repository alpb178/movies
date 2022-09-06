import MeasureUnitsList from '@/containers/measure-units/MeasureUnitsList';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const MeasureUnitsPage = () => {
  return <MeasureUnitsList />;
};

MeasureUnitsPage.layout = Admin;
MeasureUnitsPage.roles = [ROLE_ADMIN];

export default MeasureUnitsPage;
