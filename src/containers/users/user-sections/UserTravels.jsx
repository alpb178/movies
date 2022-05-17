import TravelsList from '@/containers/travels/TravelsList';
import useTravels from '@/hooks/travel/useTravels';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

const UserTravels = ({ userId }) => {
  const { t } = useTranslation('common');

  const { data: travel, isLoading } = useTravels({
    args: { userId },
    options: {
      keepPreviousData: true,
      enabled: !!userId
    }
  });

  return (
    <>
      <TravelsList hiddenColumns={['traveler']} userId={userId} />
    </>
  );
};

export default UserTravels;
