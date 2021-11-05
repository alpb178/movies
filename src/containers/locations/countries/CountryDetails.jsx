import React from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import useTravels from '@/hooks/travel/useTravels';
import Loading from '@/components/common/Loading';

const TravelDetails = ({ travelId }) => {
  const { t } = useTranslation('common');

  const { data: travel, isLoading } = useTravels({
    args: { id: travelId },
    options: {
      keepPreviousData: true
    }
  });

  return (
    <>
      {isLoading && <Loading />}

      <div className="overflow-hidden bg-white">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-xl font-medium leading-6 text-gray-900">
            <span className="mx-2 text-gray-400">{travel?.id}</span>
          </h3>
        </div>
        <div className="px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">{t('traveler')}</dt>
              <dd className="mt-1 text-sm text-gray-900">{travel?.traveler?.name}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">{t('surname')}</dt>
              <dd className="mt-1 text-sm text-gray-900">{}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">{t('email')}</dt>
              <dd className="mt-1 text-sm text-gray-900">{}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">{t('phone')}</dt>
              <dd className="mt-1 text-sm text-gray-900">{}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">{t('travelname')}</dt>
              <dd className="mt-1 text-sm text-gray-900">{}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">{t('role')}</dt>
              <dd className="mt-1 text-sm text-gray-900">{}</dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  );
};

TravelDetails.propTypes = {
  travelId: PropTypes.number.isRequired
};

export default TravelDetails;
