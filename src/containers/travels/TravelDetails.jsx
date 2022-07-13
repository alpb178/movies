/* eslint-disable react/react-in-jsx-scope */
import Error from '@/components/common/Error';
import Loading from '@/components/common/Loader';
import useTravels from '@/hooks/travel/useTravels';
import { formatPrice, locales } from '@/lib/utils';
import { CurrencyEuroIcon } from '@heroicons/react/outline';
import { ArrowNarrowRightIcon, CalendarIcon, ChatAltIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useMemo } from 'react';

const calculateSavings = (reservations) =>
  reservations.reduce((partialsum, item) => partialsum + item?.amount * item?.payload.price, 0);

const Status = ({ data }) => {
  const { t } = useTranslation('common');

  const colorize = () => {
    switch (data) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-700';
      case 'ACCEPTED':
        return 'bg-red-300 text-red-700';
      case 'REJECTED':
        return 'bg-red-200 text-red-700';
    }
  };
  return (
    <dib className={clsx(colorize(), 'rounded-full px-3 p-1 text-sm')}>
      {t(`shipments.status.${data.toLowerCase()}`)}
    </dib>
  );
};

const MetaData = ({ travel }) => {
  const { t, lang } = useTranslation('common');

  const sum = useMemo(() => {
    return travel.payload.reduce((partialsum, item) => partialsum + item?.amount * item?.price, 0);
  }, [travel]);

  const rsum = useMemo(() => {
    return calculateSavings(travel.reservations);
  }, [travel]);

  return (
    <>
      <h2 className="sr-only">Details</h2>
      <div className="space-y-5">
        <div className="flex items-center space-x-2">
          <CurrencyEuroIcon className="w-5 h-5 text-green-600" aria-hidden="true" />
          <span className="text-sm font-medium text-green-700">
            Estás ahorrando {rsum} / {formatPrice(sum)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <ChatAltIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
          <span className="text-sm font-medium text-gray-900">{`${travel?.reservations?.length} ${t(
            'reservations.reservations',
            {
              count: travel?.reservations?.length
            }
          ).toLowerCase()}`}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
          <span className="text-sm font-medium text-gray-900">
            {`${t('departure-at')} ${format(new Date(travel?.departureAt), 'PPP', {
              locale: {
                ...locales[lang]
              }
            })}`}
          </span>
        </div>
      </div>

      <div className="py-6 mt-6 space-y-8 border-t border-b border-gray-200 xl:border-b-0">
        <div>
          <h2 className="font-medium text-gray-500">{t('reservations.confirmed')}</h2>
          <ul role="list" className="mt-3 space-y-3">
            <li className="flex justify-start">
              <a href="#" className="flex items-center space-x-3">
                <div className="flex-shrink-0">
                  <img
                    className="w-5 h-5 rounded-full"
                    src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                    alt=""
                  />
                </div>
                <div className="text-sm font-medium text-gray-900">Eduardo Benz</div>
              </a>
            </li>
          </ul>
        </div>
        {/* <div>
          <h2 className="text-sm font-medium text-gray-500">Tags</h2>
          <ul role="list" className="mt-2 leading-8">
            <li className="inline">
              <a
                href="#"
                className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5"
              >
                <div className="absolute flex items-center justify-center flex-shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" aria-hidden="true" />
                </div>
                <div className="text-sm font-medium text-gray-900">Bug</div>
              </a>{' '}
            </li>
            <li className="inline">
              <a
                href="#"
                className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5"
              >
                <div className="absolute flex items-center justify-center flex-shrink-0">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-500" aria-hidden="true" />
                </div>
                <div className="text-sm font-medium text-gray-900">Accessibility</div>
              </a>{' '}
            </li>
          </ul>
        </div> */}
      </div>
    </>
  );
};

export default function Example() {
  const { t } = useTranslation('common');
  const router = useRouter();

  const {
    data: travel,
    error,
    isLoading
  } = useTravels({
    args: { id: router.query.slug },
    options: {
      enabled: !!router.query.slug
    }
  });

  if (error) return <Error />;

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex min-h-full">
      <div className="flex flex-col flex-1 w-0">
        <main className="flex-1">
          <div className="px-6 py-8 xl:py-10">
            <div className="max-w-5xl mx-auto xl:max-w-5xl xl:grid xl:grid-cols-3">
              <div className="xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200">
                <div>
                  <div className="items-start md:flex md:justify-between md:space-x-4 xl:border-b xl:pb-6">
                    <div>
                      <div className="flex items-center space-x-2 text-2xl font-bold text-gray-900">
                        <h1>{travel?.origin?.name}</h1>
                        <ArrowNarrowRightIcon className="w-6 h-6" />
                        <h1>{travel?.destination?.name}</h1>
                      </div>
                      <p className="mt-2 text-gray-500">
                        {t('travelers', { count: 1 })}{' '}
                        <a href="#" className="font-medium text-gray-900">
                          {travel?.traveler?.firstName} {travel?.traveler?.lastName}
                        </a>
                      </p>
                      <p className="mt-2 text-gray-500">
                        {t('flights', { count: 1 })}{' '}
                        <a href="#" className="font-medium text-gray-900">
                          {travel?.flight?.number}
                        </a>{' '}
                        {t('of')}{' '}
                        <a href="#" className="font-medium text-gray-900">
                          {travel?.flight?.airline.name}
                        </a>
                      </p>
                    </div>
                  </div>

                  <aside className="mt-8 xl:hidden">
                    <MetaData travel={travel} />
                  </aside>

                  <div className="py-3 xl:pt-6 xl:pb-0">
                    <h2 className="sr-only">Observations</h2>
                    <div className="prose max-w-none">
                      <p>{travel?.observations}</p>
                    </div>
                  </div>
                </div>

                <section aria-labelledby="payload-title" className="mt-8 xl:mt-10">
                  <div className="divide-y divide-gray-200">
                    <h2 id="activity-title" className="pb-4 text-lg font-medium text-gray-900">
                      {t('payload.available')}
                    </h2>

                    <div className="flow-root pt-2">
                      <ul role="list" className="-mb-8">
                        {travel?.payload.map((item) => (
                          <li key={item.id}>
                            <div className="flex justify-between w-full py-4 space-x-4">
                              <div className="flex flex-col h-full space-y-2">
                                <p className="font-medium">{item?.shipmentItem?.name}</p>
                                <p className="text-sm text-gray-800">
                                  <span className="text-gray-600">{`${t('availability')}: `}</span>
                                  {item?.amount}
                                </p>
                              </div>
                              <p className="font-medium">{formatPrice(item?.price)}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>

                <section aria-labelledby="activity-title" className="mt-16 xl:mt-20">
                  <div className="divide-y divide-gray-200">
                    <h2
                      id="activity-title"
                      className="flex justify-between pb-4 text-lg font-medium text-gray-900"
                    >
                      <span>{t('reservations.requests')}</span>
                      <span>{formatPrice(calculateSavings(travel?.reservations))}</span>
                    </h2>

                    <div className="pt-6">
                      <ul role="list" className="divide-y">
                        {travel?.reservations.map((item) => (
                          <li key={item.id} className="py-6">
                            <div className="flex justify-between">
                              {`${item.sender.firstName} ${item.sender.lastName}`}
                              <Status data={item.status} />
                            </div>
                            <div className="flex space-x-1 text-sm prose">
                              <span>{item.amount}</span>
                              <span>{item.payload?.shipmentItem?.name}</span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </section>
              </div>

              <aside className="hidden xl:block xl:pl-8">
                <MetaData travel={travel} />
              </aside>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

Status.propTypes = {
  data: PropTypes.object
};

MetaData.propTypes = {
  travel: PropTypes.object
};
