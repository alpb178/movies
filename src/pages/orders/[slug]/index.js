import OrderDetails from '@/containers/orders/OrderDetails';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const OrderDetailsPage = () => {
  const router = useRouter();
  const orderId = router.query.slug;

  return <OrderDetails orderId={orderId} />;
};

OrderDetailsPage.propTypes = {
  user: PropTypes.object.isRequired
};

OrderDetailsPage.layout = Admin;
OrderDetailsPage.roles = [ROLE_ADMIN];

export default OrderDetailsPage;
