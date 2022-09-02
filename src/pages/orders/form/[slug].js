import OrderForm from '@/containers/orders/OrderForm';
import { ROLE_ADMIN } from 'lib/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const OrdersFormCreatePage = () => {
  const router = useRouter();
  const ordersId = router.query.slug;

  return <OrderForm ordersId={ordersId} />;
};

OrdersFormCreatePage.layout = Admin;
OrdersFormCreatePage.roles = [ROLE_ADMIN];

export default OrdersFormCreatePage;
