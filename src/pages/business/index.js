import BusinessList from '@/containers/business/BusinessList';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const BusinessPage = () => {
  return <BusinessList />;
};

BusinessPage.layout = Admin;
BusinessPage.roles = [ROLE_ADMIN];

export default BusinessPage;
