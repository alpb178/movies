import React from 'react';
import dynamic from 'next/dynamic';
import { ADMIN_ROLE } from '@/lib/constants';
import MeasureUnitsList from '@/containers/measure-units/MeasureUnitsList';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const MeasureUnitsPage = () => {
  return <MeasureUnitsList />;
};

MeasureUnitsPage.layout = Admin;
MeasureUnitsPage.roles = [ADMIN_ROLE];

export default MeasureUnitsPage;
