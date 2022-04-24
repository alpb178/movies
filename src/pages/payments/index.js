import PaymentsList from 'containers/payments/PaymentsList';
import { ROLE_ADMIN } from 'lib/constants';
import dynamic from 'next/dynamic';
import React from 'react';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const PaymentsPage = () => {
  return <PaymentsList />;
};

PaymentsPage.layout = Admin;
PaymentsPage.roles = [ROLE_ADMIN];

export default PaymentsPage;
