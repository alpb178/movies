/* eslint-disable react/jsx-key */
/*  
import EmptyState from '@/components/common/EmptyState';
import Loader from '@/components/common/Loader';
import { useSearchTravel } from '@/hooks/table/useTravels';
import useMediaContext from '@/hooks/useMediaContext';
import { TRAVEL_DETAILS_PAGE } from '@/lib/constants';
import { locales, lottieOptions } from '@/lib/utils';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';

const UserTravels = ({ userId }) => {
  const { t, lang } = useTranslation('common');
  const { isSmallScreen } = useMediaContext();
  const router = useRouter();

  const { data: travels, isLoading } = useSearchTravel({
    args: { id: userId, sort: 'departureAt,desc' },
    options: {
      enabled: !!userId
    }
  });

  const onDetailsTravel = (travel) => {
    const value = travel.id;
    const path = TRAVEL_DETAILS_PAGE(value);
    router.push(path);
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="px-4 py-8">
      {isSmallScreen ? <h3 className="form-header">{t('travels', { count: 2 })}</h3> : null}

      {travels && travels?.rows.length > 0 ? (
        travels.rows.map((travel) => (
          <div
            className="flex m-4 justify-between w-full p-4 space-x-4 transition duration-200 ease-in-out border rounded-md hover:shadow-lg"
            onClick={() => onDetailsTravel(travel)}
          >
            <div className="">
              <p className="text-sm font-medium text-gray-700 sm:text-base md:text-lg">{`${travel?.origin?.name} - ${travel?.destination?.name}`}</p>
              <p className="max-w-2xl mt-1 text-sm text-gray-500">{t('itinerary')}</p>
            </div>

            <div className="">
              <p className="text-sm font-medium text-gray-700 sm:text-base md:text-lg">{`${travel?.flight?.airline?.name}-${travel?.flight?.number}`}</p>
              <p className="max-w-2xl mt-1 text-sm text-gray-500">
                {t('airlines', { count: 1 })} - {t('flights', { count: 1 })}
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-medium text-gray-700 sm:text-base md:text-lg">{`${format(
                new Date(travel?.departureAt),
                'PPP',
                {
                  locale: {
                    ...locales[lang]
                  }
                }
              )}`}</p>
              <p className="max-w-2xl mt-1 text-sm text-gray-500">{t('departure-at')}</p>
            </div>
          </div>
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
  );
};

UserTravels.propTypes = {
  userId: PropTypes.object
};

export default UserTravels;
*/
