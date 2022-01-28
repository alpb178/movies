import React from 'react';
import { Rings } from 'react-loader-spinner';
import useTranslation from 'next-translate/useTranslation';

export default function Loading() {
  const { t } = useTranslation('common');

  return (
    <div className="absolute inset-0 z-50 flex items-center justify-center w-full h-full bg-black opacity-75">
      <div className="relative ">
        <Rings color="white" width={100} />
        <h3 className="my-4 text-lg text-center text-white">{t('loading')}</h3>
      </div>
    </div>
  );
}
