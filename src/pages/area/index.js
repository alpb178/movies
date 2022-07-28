import AreasList from '@/containers/area/AreasList';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const AreasPage = () => {
  return <AreasList />;
};

AreasPage.layout = Admin;
AreasPage.roles = [ROLE_ADMIN];

export default AreasPage;
