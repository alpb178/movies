/* eslint-disable react/jsx-key */
/* eslint-disable react/react-in-jsx-scope */
import EmptyState from '@/components/common/EmptyState';
import Loader from '@/components/common/Loader';
import { useSearchShipment } from '@/hooks/shipment/useShipments';
import useMediaContext from '@/hooks/useMediaContext';
import { locales, lottieOptions } from '@/lib/utils';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import Lottie from 'react-lottie';

const UserShipments = ({ userId }) => {
  const { t, lang } = useTranslation('common');
  // const { user } = useAppContext();
  const { isSmallScreen } = useMediaContext();

  const { data: shipment, isLoading } = useSearchShipment({
    args: { id: userId, sort: 'departureAt,desc' },
    options: {
      enabled: !!userId
    }
  });

  return isLoading ? (
    <Loader />
  ) : (
    <div className="px-4 py-8">
      {isSmallScreen ? <h3 className="form-header">{t('travels', { count: 2 })}</h3> : null}

      <div className="py-2 space-y-2">
        {shipment && shipment?.rows.length > 0 ? (
          shipment.rows.map((travel) => (
            <a className="flex justify-between w-full p-4 space-x-4 transition duration-200 ease-in-out border rounded-md hover:shadow-lg">
              <div className="">
                <p className="text-sm font-medium text-gray-700 sm:text-base md:text-lg">{`${travel?.origin?.name} - ${travel?.destination?.name}`}</p>
                <p className="max-w-2xl mt-1 text-sm text-gray-500">{t('itinerary')}</p>
              </div>

              <div className="">
                <p className="text-sm font-medium text-gray-700 sm:text-base md:text-lg">{`${travel?.flight?.number}`}</p>
                <p className="max-w-2xl mt-1 text-sm text-gray-500">{t('flights', { count: 1 })}</p>
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-gray-700 sm:text-base md:text-lg">{`${format(
                  new Date(travel?.createdAt),
                  'PPP',
                  {
                    locale: {
                      ...locales[lang]
                    }
                  }
                )}`}</p>
                <p className="max-w-2xl mt-1 text-sm text-gray-500">{t('departure-at')}</p>
              </div>
            </a>
          ))
        ) : (
          <EmptyState
            title={t('travels', { count: 0 })}
            buttonText={t('new', { entity: t('travels', { count: 1 }).toLowerCase() })}
            body={t('travels.empty_state_body')}
          >
            <div className="flex items-center justify-center h-64 w-max">
              <Lottie options={lottieOptions('travels')} />
            </div>
          </EmptyState>
        )}
      </div>
    </div>
  );
};

export default UserShipments;
