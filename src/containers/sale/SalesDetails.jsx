/* eslint-disable react/react-in-jsx-scope */
import EmptyState from '@/components/common/EmptyState';
import Loading from '@/components/common/Loader';
import useSales from '@/hooks/sales/useSales';
import { lottieOptions } from '@/lib/utils';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Lottie from 'react-lottie';

const SaleDetails = ({ saleId }) => {
  const { t, lang } = useTranslation('common');
  const [shipmentPrice, setShipmentPrice] = useState(0);

  const { data: sale, isLoading } = useSales({
    args: { id: saleId },
    options: {
      keepPreviousData: true,
      enabled: !!saleId
    }
  });

  const calculateShipmentPrice = () => {
    let total = 0;
    if (sale?.orderProducts?.length > 0) {
      sale?.orderProducts.map((option) => {
        total += option?.amount * option?.product?.price;
      });
      setShipmentPrice(total);
    }
  };

  useEffect(() => {
    if (sale?.orderProducts?.length > 0) {
      calculateShipmentPrice();
    }
  }, [sale?.orderProducts]);

  return isLoading ? (
    <Loading />
  ) : (
    <main className="p-6">
      <div className="grid mt-5 sm:grid-cols-3">
        <div className="sm:col-span-1">
          <dt className="font-medium text-gray-600">{t('form.common.label.status')}</dt>
          <dd className="mt-6 font-medium text-gray-900">
            <span className="px-4 mt-5 py-1 font-medium text-yellow-700 bg-yellow-100 rounded-full float-center">
              {sale?.status}
            </span>
          </dd>

          <div className="mt-12">
            <dt className="font-medium text-gray-600">{t('form.common.label.createdAt')}</dt>
            <dd className="mt-5 font-medium text-gray-900">{sale?.createdAt || t('no-data')}</dd>
          </div>
          <div className="mt-12">
            <dt className="font-medium text-gray-600">{t('form.common.label.updatedAt')}</dt>
            <dd className="mt-5 font-medium text-gray-900">{sale?.updatedAt || t('no-data')}</dd>
          </div>
        </div>
        <div className="sm:col-span-1">
          <dt className="font-medium text-gray-600">{t('form.common.label.amount')}</dt>
          <dd className="mt-6 font-medium text-gray-900">
            <span className="px-4 mt-5 py-1 font-medium text-yellow-700 bg-yellow-100 rounded-full float-center">
              {shipmentPrice || 0}
            </span>
          </dd>
          <div className="mt-12">
            <dt className="font-mediumtext-gray-600">{t('form.common.label.area')}</dt>
            <dd className="mt-5 font-medium text-gray-900">
              {sale?.tables?.area?.name || t('no-data')}
            </dd>
          </div>
          <div className="mt-12">
            <dt className="font-medium text-gray-600">{t('form.common.label.table')}</dt>
            <dd className="mt-5 font-medium text-gray-900">{sale?.tables?.code || t('no-data')}</dd>
          </div>
        </div>
        <div className="sm:col-span-1">
          <dt className="font-medium text-gray-600"> {t('products', { count: 2 })}</dt>
          <dl className="grid mt-5 grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1">
            {sale?.orderProducts?.length > 0 ? (
              <dl className="grid  sm:grid-cols-1">
                {sale?.orderProducts.map((option) => (
                  <div
                    key={option?.id}
                    className="flex m-4 justify-between w-full p-4 space-x-4 transition duration-200 ease-in-out border rounded-md hover:shadow-lg"
                  >
                    <div className="">
                      <p className="text-sm font-medium text-gray-700 sm:text-base md:text-lg">
                        {option?.product?.name}
                      </p>
                      <p className="max-w-2xl mt-1 text-sm text-gray-500">
                        {t('products', { count: 1 })}
                      </p>
                    </div>

                    <div className="">
                      <p className="text-sm font-medium text-gray-700 sm:text-base md:text-lg">{`${option?.product?.price}`}</p>
                      <p className="max-w-2xl mt-1 text-sm text-gray-500">
                        {t('form.common.label.price')}
                      </p>
                    </div>
                    <div className="">
                      <p className="text-sm font-medium text-gray-700 sm:text-base md:text-lg">
                        {option?.amount} -
                        <span className="px-4 mt-5 py-1 font-medium text-yellow-700 bg-yellow-100 rounded-full float-center">
                          {option?.amount * option?.product?.price}$
                        </span>
                      </p>
                      <p className="max-w-2xl mt-1 text-sm text-gray-500">
                        {t('form.common.label.size')} - {t('form.common.label.amount')}
                      </p>
                    </div>
                  </div>
                ))}
              </dl>
            ) : (
              <EmptyState text={t('sales', { count: 0 })}>
                <div className="flex items-center justify-center h-64 w-max">
                  <Lottie options={lottieOptions('offline')} />
                </div>
              </EmptyState>
            )}
          </dl>
        </div>
      </div>
    </main>
  );
};

SaleDetails.propTypes = {
  userId: PropTypes.number.isRequired
};

export default SaleDetails;
