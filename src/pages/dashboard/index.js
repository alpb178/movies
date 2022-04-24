import CardBarChart from 'components/cards/CardBarChart.js';
import CardPageVisits from 'components/cards/CardPageVisits.js';
import CardSocialTraffic from 'components/cards/CardSocialTraffic.js';
import dynamic from 'next/dynamic';
import React from 'react';
import { ROLE_ADMIN } from '../../lib/constants';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const DashboardPage = () => {
  return (
    <>
      <div className="flex space-y-4">
        <CardPageVisits />
      </div>
      <div className="flex space-x-4">
        <div className="w-full xl:w-1/2">
          <CardSocialTraffic />
        </div>
        <div className="w-full h-full xl:w-1/2">
          <CardBarChart />
        </div>
      </div>
    </>
  );
};

DashboardPage.layout = Admin;
DashboardPage.roles = [ROLE_ADMIN];

export default DashboardPage;
