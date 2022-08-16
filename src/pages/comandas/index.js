import ComandasList from '@/containers/comanda/ComandaList';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const ComandasPage = () => {
  return <ComandasList />;
};

ComandasPage.layout = Admin;
ComandasPage.roles = [ROLE_ADMIN];

export default ComandasPage;
