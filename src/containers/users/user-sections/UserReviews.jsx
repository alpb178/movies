import EmptyState from '@/components/common/EmptyState';
import { lottieOptions } from '@/lib/utils';
import { Tab } from '@headlessui/react';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import Lottie from 'react-lottie';

function UserReviews() {
  const { t } = useTranslation('common');

  return (
    <Tab.Group as="div" className="">
      <Tab.List className="flex border-b">
        <Tab
          className={({ selected }) =>
            clsx('w-full font-medium py-4', selected ? 'border-b-2 border-primary-500' : '')
          }
        >
          {t('reviews.left', { count: 2 })}
        </Tab>
        <Tab
          className={({ selected }) =>
            clsx('w-full font-medium py-4', selected ? 'border-b-2 border-primary-500' : '')
          }
        >
          {t('reviews.made', { count: 2 })}
        </Tab>
      </Tab.List>
      <Tab.Panels className="mt-2">
        <Tab.Panel
          className={clsx(
            'bg-white rounded-xl',
            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
          )}
        >
          <EmptyState title={t('reviews', { count: 0 })}>
            <div className="flex items-center justify-center h-64 w-max">
              <Lottie options={lottieOptions('reviews')} />
            </div>
          </EmptyState>
        </Tab.Panel>
        <Tab.Panel
          className={clsx(
            'bg-white rounded-xl',
            'focus:outline-none focus:ring-2 ring-offset-2 ring-offset-blue-400 ring-white ring-opacity-60'
          )}
        >
          <EmptyState title={t('reviews', { count: 0 })}>
            <div className="flex items-center justify-center h-64 w-max">
              <Lottie options={lottieOptions('reviews')} />
            </div>
          </EmptyState>
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
}

export default UserReviews;
