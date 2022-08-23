/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Loading from '@/components/common/Loader';
import useOrders from '@/hooks/orders/useOrders';
import { formatPrice, locales } from '@/lib/utils';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useMemo } from 'react';
import Status from './Status';

const OrderDetails = ({ orderId }) => {
  const { t, lang } = useTranslation('common');
  const locale = {
    ...locales[lang]
  };

  const { data: order, isLoading } = useOrders({
    args: { id: orderId },
    options: {
      keepPreviousData: true,
      enabled: !!orderId
    }
  });

  const profit = useMemo(() => {
    let total = 0;
    if (order?.orderProducts?.length > 0) {
      order?.orderProducts.map((option) => {
        total += option?.amount * option?.product?.price;
      });
      return total;
    }
  }, [order]);

  const service = useMemo(() => {
    if (profit) return profit * order?.service;

    return 0;
  }, [profit]);

  const discount = useMemo(() => {
    if (profit) return profit * order?.discount;

    return 0;
  }, [profit]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col w-full pb-8 space-x-0 lg:space-x-8 lg:flex-row">
      <div className="w-full space-y-6">
        <section aria-labelledby="applicant-information-title">
          <div className="bg-white">
            <div className="flex items-start justify-between px-4 py-5 sm:px-8">
              <div className="">
                <h2
                  id="applicant-information-title"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {t('form.sales.title.details')}
                </h2>
                <p className="max-w-2xl mt-1 text-sm text-gray-500">
                  {t('form.sales.title.detailsEspecified')}
                </p>
              </div>

              <Status data={order?.status} className="p-1 px-6 text-base rounded-full" />
            </div>

            <div className="flex flex-col justify-between px-4 py-5 space-y-4 border-gray-200 lg:space-x-4 lg:flex-row lg:space-y-0 border-y sm:px-8">
              <div className="space-y-4 font-medium text-gray-900">
                <div className="font-medium text-gray-900">
                  {order?.table?.code.includes(t('tables', { count: 1 }))
                    ? order?.table?.code
                    : `${t('tables', { count: 1 })} ${order?.table?.code}`}
                  <span className="font-normal text-gray-600">{` en `}</span>
                  {order?.table?.area?.name || ''}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {t('form.common.label.createdAt')} - {t('form.common.label.time')}
                  </p>
                  <div className="mt-1 text-sm text-gray-900">
                    {format(new Date(order?.createdAt), 'PP', { locale })} -{' '}
                    {new Date(order?.createdAt).toLocaleTimeString('en-US')}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <p className="text-sm font-medium text-gray-500">
                    {t('form.common.label.updatedAt')} - {t('form.common.label.time')}
                  </p>
                  <dd className="mt-1 text-sm text-gray-900">
                    {format(new Date(order?.updatedAt), 'PP', { locale })} -{' '}
                    {new Date(order?.updatedAt).toLocaleTimeString('en-US')}
                  </dd>
                </div>
              </div>

              <div className="lg:max-w-xs sm:col-span-1">
                <p className="text-sm font-medium text-gray-500">{t('form.common.label.amount')}</p>

                <div className="grid grid-cols-2 gap-2 mt-2 text-base gap-x-8">
                  <p>Subtotal</p>
                  <span className="font-medium text-right text-gray-700">
                    {formatPrice(profit) || 0}
                  </span>
                  <p>
                    Servicio{' '}
                    <span className="font-medium text-gray-400">({order?.service * 100}%)</span>
                  </p>
                  <span className="font-medium text-right text-gray-700">
                    {formatPrice(service) || 0}
                  </span>
                  <p>
                    Descuento{' '}
                    <span className="font-medium text-gray-400">({order?.discount * 100}%)</span>
                  </p>
                  <span className="font-medium text-right text-gray-700">
                    {formatPrice(discount) || 0}
                  </span>
                  <p className="font-semibold">Total</p>
                  <span className="font-semibold text-right text-emerald-600">
                    {formatPrice(profit + service - discount) || 0}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="w-full lg:max-w-2xl">
        <div className="px-4 py-5 sm:px-8">
          <h2 id="timeline-title" className="text-lg font-medium text-gray-900 bor">
            {t('products', { count: 2 })}
          </h2>
        </div>

        <div className="w-full pt-5 mt-0 border-t border-gray-200 lg:mt-5">
          {order?.orderProducts?.length > 0 ? (
            <dl className="w-full px-4 space-y-6 sm:px-8">
              {order?.orderProducts.map((option) => (
                <div key={option?.id} className="flex justify-between w-full space-x-8">
                  <div className="w-full">
                    <p className="font-medium text-gray-700">{option?.product?.name}</p>
                    <p className="max-w-2xl mt-1 text-sm text-gray-500">
                      {t('products', { count: 1 })}
                    </p>
                  </div>

                  <div className="w-full">
                    <p className="font-medium text-gray-700">{`${option?.amount} x ${formatPrice(
                      option?.product?.price,
                      2
                    )}`}</p>
                    <p className="max-w-2xl mt-1 text-sm text-gray-500">
                      {t('form.common.label.size')}- {t('form.common.label.price')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-700">
                      <span className="py-1 mt-5 font-medium">
                        {formatPrice(option?.amount * option?.product?.price) || 0}
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{t('form.common.label.amount')}</p>
                  </div>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </section>
    </div>
  );
};

OrderDetails.propTypes = {
  orderId: PropTypes.number
};

export default OrderDetails;
