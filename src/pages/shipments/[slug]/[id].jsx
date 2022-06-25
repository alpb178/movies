/* eslint-disable react/react-in-jsx-scope */
import ShipmentsForm from '@/containers/shipments/ShipmentsForm';
import { ROLE_ADMIN } from 'lib/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const ShipmentsFormPage = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="bg-white">
      <ShipmentsForm shipmentId={id} />
    </div>
  );
};

ShipmentsForm.layout = Admin;
ShipmentsForm.roles = [ROLE_ADMIN];

export default ShipmentsFormPage;
