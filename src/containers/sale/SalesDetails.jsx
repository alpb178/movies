/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Loading from '@/components/common/Loader';
import useSales from '@/hooks/sales/useSales';
import { formatPrice, locales } from '@/lib/utils';
import clsx from 'clsx';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const SaleDetails = ({ saleId }) => {
  const { t, lang } = useTranslation('common');
  const [shipmentPrice, setShipmentPrice] = useState(0);
  const locale = {
    ...locales[lang]
  };

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
    <div className="min-h-full">
      <main className="py-10">
        <div className="mt-8 max-w-3xl mx-auto grid grid-cols-1 gap-6 sm:px-6 lg:max-w-7xl lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1 lg:col-span-2">
            <section aria-labelledby="applicant-information-title">
              <div className="bg-white shadow sm:rounded-lg">
                <div className="px-4 py-5 sm:px-6">
                  <h2
                    id="applicant-information-title"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    {t('form.sales.title.details')}
                  </h2>
                  <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    {t('form.sales.title.detailsEspecified')}
                  </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        {t('form.common.label.status')}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <span className="px-4 mt-5 py-1 font-medium text-yellow-700 bg-yellow-100 rounded-full float-center">
                          <Status data={sale?.status} />
                        </span>
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        {t('form.common.label.createdAt')} - {t('form.common.label.time')}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {format(new Date(sale?.createdAt), 'PPP', { locale })} -{' '}
                        {new Date(sale?.createdAt).toLocaleTimeString('en-US')}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        {t('form.common.label.amount')}
                      </dt>
                      <dd className="mt-1 leading-6 text-sm  text-gray-900">
                        <span className="px-4 mt-5 py-1 font-medium text-green-700 bg-green-100 rounded-full float-center">
                          {formatPrice(shipmentPrice) || 0}
                        </span>
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        {t('form.common.label.updatedAt')} - {t('form.common.label.time')}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {format(new Date(sale?.updatedAt), 'PPP', { locale })} -{' '}
                        {new Date(sale?.updatedAt).toLocaleTimeString('en-US')}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        {t('form.common.label.area')}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {sale?.table?.area?.name || t('no-data')}
                      </dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">
                        {t('form.common.label.table')}
                      </dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        {sale?.table?.code || t('no-data')}
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>
          </div>

          <section aria-labelledby="timeline-title" className="lg:col-start-3 lg:col-span-1">
            <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
              <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                {t('products', { count: 2 })}
              </h2>

              <div className="mt-6 flow-root">
                <dl className="grid mt-5 grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-1">
                  {sale?.orderProducts?.length > 0 ? (
                    <dl className="grid  sm:grid-cols-1">
                      {sale?.orderProducts.map((option) => (
                        <div
                          key={option?.id}
                          className="flex m-4 justify-between w-full  p-3 space-x-4  rounded-md"
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
                              <span className="px-4 mt-5 py-1 font-medium text-green-700 bg-green-100 rounded-full float-center">
                                {formatPrice(option?.amount * option?.product?.price) || 0}
                              </span>
                            </p>
                            <p className="max-w-2xl mt-1 text-sm text-gray-500">
                              {t('form.common.label.size')} - {t('form.common.label.amount')}
                            </p>
                          </div>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                </dl>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

SaleDetails.propTypes = {
  saleId: PropTypes.number
};

export default SaleDetails;

const Status = ({ data }) => {
  const { t } = useTranslation('common');

  const colorize = () => {
    switch (data) {
      case 'OPEN':
        return 'bg-yellow-100 text-yellow-700';
      case 'CLOSE':
        return 'bg-red-300 text-red-700';
    }
  };
  return (
    <dib className={clsx(colorize(), 'rounded-full px-3 p-1 text-sm')}>
      {t(`form.common.status.${data.toLowerCase()}`)}
    </dib>
  );
};
