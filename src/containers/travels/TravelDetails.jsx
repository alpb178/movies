/* eslint-disable react/react-in-jsx-scope */
import useRegulations from '@/hooks/regulation/useRegulations';
import useTravels from '@/hooks/travel/useTravels';
import { formatPrice, locales } from '@/lib/utils';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';
const TravelDetail = ({ travelId }) => {
  const { t, lang } = useTranslation('common');
  const [selectedOptions, setSelectedOptions] = useState([]);
  const { data: travel } = useTravels({
    args: { id: travelId },
    options: {
      keepPreviousData: true
    }
  });

  const { data: regulations } = useRegulations({
    args: {},
    options: {
      keepPreviousData: true,
      enabled: !!travel
    }
  });

  useMemo(async () => {
    {
      travel?.payload?.map((item) => {
        const regulationSelected = regulations?.rows.find(
          (element) => element?.shipmentItem.id === item.ShipmentItemId
        );
        item.id = item.ShipmentItemId;
        item.measureUnit = regulationSelected?.shipmentItem?.measureUnit;
        item.name = regulationSelected?.shipmentItem?.name;
        item.maxAmount = regulationSelected?.maxAmount;
        item.maxPrice = regulationSelected?.maxPrice;
        item.minPrice = regulationSelected?.maxPrice;
      });
      setSelectedOptions(travel?.payload);
    }
  }, [travel]);

  return (
    <div className="min-h-full bg-white">
      <main className="p-6">
        <div className="flex flex-col-reverse mt-6 space-y-4 space-y-reverse justify-stretch sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          >
            Disqualify
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
          >
            Advance to offer
          </button>
        </div>

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
                  <h1 className="text-2xl font-bold text-gray-900">
                    {`${travel?.traveler?.firstName} ${travel?.traveler?.lastName}`}
                  </h1>
                  <p className="text-sm font-medium text-gray-500">{`${t('registered-at')} ${format(
                    new Date(travel?.traveler?.createdAt || null),
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
                    <dd className="mt-1 text-lm text-gray-900">
                      {travel?.origin?.code} - {travel?.origin?.name}
                    </dd>
                  </div>
                  <div className="sm:col-span-1">
                    <dt className="text-lg font-medium text-gray-500">{t('destination')}</dt>
                    <dd className="mt-1 text-lm text-gray-900">
                      {travel?.destination?.code} - {travel?.destination?.name}
                    </dd>
                  </div>
                </dl>

                <div className="sm:col-span-1 mt-5">
                  <dt className="text-lg font-medium text-gray-500">{t('date-flight')}</dt>
                  <dd className="mt-1 text-lm text-gray-900">
                    {format(new Date(travel?.departureAt || null), 'PPP', {
                      locale: { ...locales[lang] }
                    })}
                  </dd>
                </div>

                <div className="sm:col-span-1 mt-5">
                  <dt className="text-lg font-medium text-gray-500">
                    {t('flights', { count: 1 })}
                  </dt>
                  <dd className="mt-1 text-lm text-gray-900">
                    {travel?.flight?.airline?.name} - {travel?.flight?.number}
                  </dd>
                </div>
              </div>
            </section>
          </div>

          <section aria-labelledby="timeline-title" className="lg:col-start-2 lg:col-span-2">
            <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
              {t('shipment-items', { count: 2 })}
            </h2>

            <div className="flow-root mt-6">
              <ul role="list" className="border divide-y rounded-lg">
                {selectedOptions &&
                  selectedOptions.length > 0 &&
                  selectedOptions.map((item) => (
                    <li key={item.id} className="grid w-full grid-cols-3 p-6">
                      <div className="space-y-1">
                        <p className="font-medium">{item?.name}</p>
                        <p className="text-sm text-gray-400">{item?.measureUnit?.name}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="font-medium">{`- / ${item?.amount}`}</p>
                        <p className="text-sm text-gray-400">{`Disponibilidad (${item?.measureUnit?.name})`}</p>
                      </div>
                      <p className="text-right">{formatPrice(item?.price)}</p>
                    </li>
                  ))}
              </ul>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

TravelDetail.propTypes = {
  travelId: PropTypes.number.isRequired
};

export default TravelDetail;
