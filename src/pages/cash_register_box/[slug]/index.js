import CashRegisterBoxList from '@/containers/cash-register-box/CashRegisterBoxList';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const SaleDetailsPage = () => {
  const router = useRouter();
  const saleId = router.query.slug;

  return <CashRegisterBoxList saleId={saleId} />;
};

SaleDetailsPage.propTypes = {
  user: PropTypes.object.isRequired
};

SaleDetailsPage.layout = Admin;
SaleDetailsPage.roles = [ROLE_ADMIN];

export default SaleDetailsPage;
