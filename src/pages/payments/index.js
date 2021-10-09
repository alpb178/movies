import React from 'react';
import dynamic from 'next/dynamic';
import { ADMIN_ROLE } from 'lib/constants';
import PaymentsList from 'containers/payments/PaymentsList';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const PaymentsPage = () => {
  return <PaymentsList />;
};

PaymentsPage.layout = Admin;
PaymentsPage.roles = [ADMIN_ROLE];

export default PaymentsPage;
