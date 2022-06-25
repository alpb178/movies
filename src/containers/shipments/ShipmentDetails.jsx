/* eslint-disable react/react-in-jsx-scope */
import Loading from '@/components/common/Loader';
import useShipments from '@/hooks/shipment/useShipments';
import { locales } from '@/lib/utils';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useState } from 'react';
const ShipmentDetails = ({ shipmentId }) => {
  const { t, lang } = useTranslation('common');
  const [loading] = useState(isLoading);
  const { data: shipment, isLoading } = useShipments({
    args: { id: shipmentId },
    options: {
      keepPreviousData: true
    }
  });

  return (
    <>
      {loading && <Loading />}
      <div className="min-h-full bg-white">
        <div className="grid grid-cols-1 gap-12 mx-auto mt-8 lg:grid-flow-col-dense lg:grid-cols-3">
          <div className="space-y-6 lg:col-start-1">
            <section aria-labelledby="applicant-information-title">
              <div className="flex items-center space-x-5">
                <div className="flex-shrink-0">
                  <Image
                    layout="intrinsic"
                    width={72}
                    height={72}
                    className="rounded-full"
                    src="/images/photo-1463453091185-61582044d556.jpeg"
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{`${shipment?.id}`}</h1>
                  <p className="text-sm font-medium text-gray-500">{`${t('registered-at')} ${format(
                    new Date(shipment?.createdAt || null),
                    'PPP',
                    {
                      locale: { ...locales[lang] }
                    }
                  )}`}</p>
                </div>
              </div>
              <div className="py-5 border-t border-gray-200">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-lg font-medium text-gray-500">{t('origin')}</dt>
                    <dd className="mt-1 text-lm text-gray-900"></dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-lg font-medium text-gray-500">{t('destination')}</dt>
                    <dd className="mt-1 text-lm text-gray-900"></dd>
                  </div>
                </dl>

                <div className="sm:col-span-1 mt-5">
                  <dt className="text-lg font-medium text-gray-500">{t('date-flight')}</dt>
                  <dd className="mt-1 text-lm text-gray-900">
                    {format(new Date(shipment?.departureAt || null), 'PPP', {
                      locale: { ...locales[lang] }
                    })}
                  </dd>
                </div>

                <div className="sm:col-span-1 mt-5">
                  <dt className="text-lg font-medium text-gray-500"></dt>
                  <dd className="mt-1 text-lm text-gray-900"></dd>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

ShipmentDetails.propTypes = {
  shipmentId: PropTypes.number.isRequired
};

export default ShipmentDetails;
