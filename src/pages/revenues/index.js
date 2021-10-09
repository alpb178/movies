import React from 'react';

import dynamic from 'next/dynamic';

const Admin = dynamic(() => import('layouts/Admin'), {
  ssr: false
});

const CertificateIso = () => {
  return (
    <>
      <div className="flex flex-col items-center"></div>
    </>
  );
};

CertificateIso.layout = Admin;

export default CertificateIso;
