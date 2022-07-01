/* eslint-disable react/react-in-jsx-scope */
import TravelForm from '@/containers/travels/TravelForm';
import { ROLE_ADMIN } from 'lib/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const TravelFormPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="bg-white">
      <TravelForm travelId={id} />
    </div>
  );
};

TravelFormPage.layout = Admin;
TravelFormPage.roles = [ROLE_ADMIN];

export default TravelFormPage;
