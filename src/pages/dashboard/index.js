import React from 'react';
import dynamic from 'next/dynamic';
import CardBarChart from 'components/cards/CardBarChart.js';
import CardPageVisits from 'components/cards/CardPageVisits.js';
import CardSocialTraffic from 'components/cards/CardSocialTraffic.js';
import { ADMIN_ROLE, BASIC_CLIENT_ROLE } from '../../lib/constants';

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
DashboardPage.roles = [ADMIN_ROLE];

export default DashboardPage;
