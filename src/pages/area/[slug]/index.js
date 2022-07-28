import BusinessDetails from '@/containers/business/BusinesDetails';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const BusinessDetailPage = () => {
  const router = useRouter();
  const bussinessId = router.query.slug;

  return <BusinessDetails business={bussinessId} />;
};

BusinessDetailPage.propTypes = {
  user: PropTypes.object.isRequired
};

BusinessDetailPage.layout = Admin;
BusinessDetailPage.roles = [ROLE_ADMIN];

export default BusinessDetailPage;
