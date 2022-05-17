import useTravels from '@/hooks/travel/useTravels';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import ShipmentsList from '../../shipments/ShipmentsList';

const UserShipments = ({ userId }) => {
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
      <ShipmentsList />
    </>
  );
};

export default UserShipments;
