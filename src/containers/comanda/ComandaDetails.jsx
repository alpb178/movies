/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import Loading from '@/components/common/Loader';
import useComandas from '@/hooks/comanda/useComandas';
import { formatPrice, locales } from '@/lib/utils';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import Status from './Status';

const ComandaDetails = ({ comandaId }) => {
  const { t, lang } = useTranslation('common');
  const [shipmentPrice, setShipmentPrice] = useState(0);
  const locale = {
    ...locales[lang]
  };

  const { data: comanda, isLoading } = useComandas({
    args: { id: comandaId },
    options: {
      keepPreviousData: true,
      enabled: !!comandaId
    }
  });

  const calculateShipmentPrice = () => {
    let total = 0;
    if (comanda?.orderProducts?.length > 0) {
      comanda?.orderProducts.map((option) => {
        total += option?.amount * option?.product?.price;
      });
      setShipmentPrice(total);
    }
  };

  useEffect(() => {
    if (comanda?.orderProducts?.length > 0) {
      calculateShipmentPrice();
    }
  }, [comanda?.orderProducts]);

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col w-full sm:space-x-8 lg:flex-row">
      {console.log(comandaId)}
      <div className="w-full space-y-6">
        <section aria-labelledby="applicant-information-title">
          <div className="bg-white">
            <div className="px-4 py-5 sm:px-8">
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
            <div className="px-4 py-5 border-gray-200 border-y sm:px-8">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    {t('form.common.label.status')}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    <Status data={comanda?.status} />
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    {t('form.common.label.createdAt')} - {t('form.common.label.time')}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {format(new Date(comanda?.createdAt), 'PPP', { locale })} -{' '}
                    {new Date(comanda?.createdAt).toLocaleTimeString('en-US')}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    {t('form.common.label.amount')}
                  </dt>
                  <dd className="mt-1 text-lg leading-6 text-gray-900">
                    <span className="mt-5 font-medium text-green-700 float-center">
                      {formatPrice(shipmentPrice) || 0}
                    </span>
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  <dt className="text-sm font-medium text-gray-500">
                    {t('form.common.label.updatedAt')} - {t('form.common.label.time')}
                  </dt>
                  <dd className="mt-1 text-sm text-gray-900">
                    {format(new Date(comanda?.updatedAt), 'PPP', { locale })} -{' '}
                    {new Date(comanda?.updatedAt).toLocaleTimeString('en-US')}
                  </dd>
                </div>
                <div className="sm:col-span-1">
                  {/* <dt className="text-sm font-medium text-gray-500">
                    {t('form.common.label.area')} 
                  </dt>*/}
                  <dd className="mt-1 font-medium text-gray-900">
                    {comanda?.table?.code || ''}
                    <span className="font-normal text-gray-600">{` en `}</span>
                    {comanda?.table?.area?.name || ''}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>
      </div>

      <section className="w-full max-w-2xl">
        <div className="px-4 py-5 lg:px-8">
          <h2 id="timeline-title" className="text-lg font-medium text-gray-900 bor">
            {t('products', { count: 2 })}
          </h2>
        </div>

        <div className="w-full pt-5 mt-0 border-t border-gray-200 lg:mt-5">
          {comanda?.orderProducts?.length > 0 ? (
            <dl className="w-full px-4 space-y-6 lg:px-8">
              {comanda?.orderProducts.map((option) => (
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

ComandaDetails.propTypes = {
  comandaId: PropTypes.number
};

export default ComandaDetails;
