/* eslint-disable react/react-in-jsx-scope */
import ShipmentDetails from '@/containers/shipments/ShipmentDetails';
import { ROLE_ADMIN } from 'lib/constants';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

function ShipmentDetailsPage() {
  const router = useRouter();

  return <ShipmentDetails shipmentId={router.query.slug} />;
}

ShipmentDetailsPage.layout = Admin;
ShipmentDetailsPage.roles = [ROLE_ADMIN];

export default ShipmentDetailsPage;
