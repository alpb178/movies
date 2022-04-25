import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';
import ShipmentsList from '../shipments/ShipmentsList';
import TravelsList from '../travels/TravelsList';

const UserTravels = ({ userId }) => {
  const { t } = useTranslation('common');

  return (
    <Tab.Group as="div" className="bg-white border border-gray-100 rounded-md shadow">
      <Tab.List className="flex border-b">
        <Tab
          className={({ selected }) =>
            clsx('w-full font-medium py-4', selected ? 'border-b-2 border-primary-500' : '')
          }
        >
          {t('travels', { count: 2 })}
        </Tab>
        <Tab
          className={({ selected }) =>
            clsx('w-full font-medium py-4', selected ? 'border-b-2 border-primary-500' : '')
          }
        >
          {t('shipments', { count: 2 })}
        </Tab>
      </Tab.List>
      <Tab.Panels className="mt-2">
        <Tab.Panel
          className={clsx(
            'bg-white rounded-xl',
            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
          )}
        >
          <TravelsList hiddenColumns={['traveler']} userId={userId} />
        </Tab.Panel>
        <Tab.Panel
          className={clsx(
            'bg-white rounded-xl',
            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
          )}
        >
          <ShipmentsList />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default UserTravels;
