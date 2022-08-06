import CashRegisterBoxList from '@/containers/cash_register_box/CashRegisterBoxList';
import { ROLE_ADMIN } from '@/lib/constants';
import dynamic from 'next/dynamic';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const CashRegisterBoxPage = () => {
  return <CashRegisterBoxList />;
};

CashRegisterBoxPage.layout = Admin;
CashRegisterBoxPage.roles = [ROLE_ADMIN];

export default CashRegisterBoxPage;
