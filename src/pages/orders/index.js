import OrdersList from '@/containers/orders/OrdersList';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const OrdersPage = () => {
  return <OrdersList />;
};

OrdersPage.layout = Admin;
OrdersPage.roles = [ROLE_ADMIN];

export default OrdersPage;
