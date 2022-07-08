/* eslint-disable react/react-in-jsx-scope */
import Dashboard from '@/containers/dashboard/index';
import dynamic from 'next/dynamic';
import { ROLE_ADMIN } from '../../lib/constants';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const DashboardPage = () => {
  return <Dashboard />;
};

DashboardPage.layout = Admin;
DashboardPage.roles = [ROLE_ADMIN];

export default DashboardPage;
