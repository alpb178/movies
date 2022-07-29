import SalesList from '@/containers/sale/SalesList';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const SalesPage = () => {
  return <SalesList />;
};

SalesPage.layout = Admin;
SalesPage.roles = [ROLE_ADMIN];

export default SalesPage;
