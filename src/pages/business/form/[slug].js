import BusinessForm from '@/containers/business/BusinesForm';
import { ROLE_ADMIN } from 'lib/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const BusinessFormCreatePage = () => {
  const router = useRouter();
  const bussinessId = router.query.slug;

  return <BusinessForm business={bussinessId} />;
};

BusinessFormCreatePage.layout = Admin;
BusinessFormCreatePage.roles = [ROLE_ADMIN];

export default BusinessFormCreatePage;
