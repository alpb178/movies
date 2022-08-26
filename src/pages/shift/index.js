import ShiftList from '@/containers/shift/ShiftList';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const ShiftPage = () => {
  return <ShiftList />;
};

ShiftPage.layout = Admin;
ShiftPage.roles = [ROLE_ADMIN];

export default ShiftPage;