import useUsers from '@/hooks/user/useUsers';
import { locales } from '@/lib/utils';
import { Tab } from '@headlessui/react';
import { CheckIcon, ThumbUpIcon, UserIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';
import ShipmentsList from '../shipments/ShipmentsList';
import TravelsList from '../travels/TravelsList';

const attachments = [
  { name: 'resume_front_end_developer.pdf', href: '#' },
  { name: 'coverletter_front_end_developer.pdf', href: '#' }
];
const eventTypes = {
  applied: { icon: UserIcon, bgColorClass: 'bg-gray-400' },
  advanced: { icon: ThumbUpIcon, bgColorClass: 'bg-blue-500' },
  completed: { icon: CheckIcon, bgColorClass: 'bg-green-500' }
};
const timeline = [
  {
    id: 1,
    type: eventTypes.applied,
    content: 'Applied to',
    target: 'Front End Developer',
    date: 'Sep 20',
    datetime: '2020-09-20'
  },
  {
    id: 2,
    type: eventTypes.advanced,
    content: 'Advanced to phone screening by',
    target: 'Bethany Blake',
    date: 'Sep 22',
    datetime: '2020-09-22'
  },
  {
    id: 3,
    type: eventTypes.completed,
    content: 'Completed phone screening with',
    target: 'Martha Gardner',
    date: 'Sep 28',
    datetime: '2020-09-28'
  },
  {
    id: 4,
    type: eventTypes.advanced,
    content: 'Advanced to interview by',
    target: 'Bethany Blake',
    date: 'Sep 30',
    datetime: '2020-09-30'
  },
  {
    id: 5,
    type: eventTypes.completed,
    content: 'Completed interview with',
    target: 'Katherine Snyder',
    date: 'Oct 4',
    datetime: '2020-10-04'
  }
];
const comments = [
  {
    id: 1,
    name: 'Leslie Alexander',
    date: '4d ago',
    imageId: '1494790108377-be9c29b29330',
    body: 'Ducimus quas delectus ad maxime totam doloribus reiciendis ex. Tempore dolorem maiores. Similique voluptatibus tempore non ut.'
  },
  {
    id: 2,
    name: 'Michael Foster',
    date: '4d ago',
    imageId: '1519244703995-f4e0f30006d5',
    body: 'Et ut autem. Voluptatem eum dolores sint necessitatibus quos. Quis eum qui dolorem accusantium voluptas voluptatem ipsum. Quo facere iusto quia accusamus veniam id explicabo et aut.'
  },
  {
    id: 3,
    name: 'Dries Vincent',
    date: '4d ago',
    imageId: '1506794778202-cad84cf45f1d',
    body: 'Expedita consequatur sit ea voluptas quo ipsam recusandae. Ab sint et voluptatem repudiandae voluptatem et eveniet. Nihil quas consequatur autem. Perferendis rerum et.'
  }
];

export default function UserDetails({ userId }) {
  const { t, lang } = useTranslation('common');

  const { data: user, isLoading } = useUsers({
    args: { id: userId },
    options: {
      keepPreviousData: true
    }
  });

  return (
    <main className="p-6">
      <div className="mx-auto mb-6 md:flex md:items-center md:justify-between md:space-x-5">
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
              {`${user?.firstName} ${user?.lastName}`}
            </h1>
            <p className="text-sm font-medium text-gray-500">{`${t('registered-at')} ${format(
              new Date(user?.createdAt || null),
              'PPP',
              { locale: { ...locales[lang] } }
            )}`}</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button type="button" className="btn-outlined">
            Disqualify
          </button>
          <button type="button" className="border btn-contained border-secondary-500">
            Advance to offer
          </button>
        </div>
      </div>

      <div className="flex space-x-6 sm:flex-col lg:flex-row">
        <div className="w-full space-y-6">
          {/* Description list*/}
          <section
            aria-labelledby="applicant-information-title"
            className="bg-white rounded-md shadow"
          >
            <div className="">
              <div className="px-4 py-5 sm:px-6">
                <h2
                  id="applicant-information-title"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Applicant Information
                </h2>
                <p className="max-w-2xl mt-1 text-sm text-gray-500">
                  Personal details and application.
                </p>
              </div>
              <div className="px-4 py-5 border-t border-gray-200 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  {user?.email ? (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">{t('email')}</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                    </div>
                  ) : null}

                  {user?.mobile ? (
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">Phone</dt>
                      <dd className="mt-1 text-sm text-gray-900">{user.mobile}</dd>
                    </div>
                  ) : null}
                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">{t('about')}</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum
                      culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id mollit
                      nulla mollit nostrud in ea officia proident. Irure nostrud pariatur mollit ad
                      adipisicing reprehenderit deserunt qui eu.
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <Tab.Group as="div" className="">
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
                  <ShipmentsList />
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
          </section>
        </div>

        <section aria-labelledby="timeline-title" className="w-full">
          <Tab.Group as="div" className="bg-white rounded-md shadow">
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
        </section>
      </div>
    </main>
  );
}

UserDetails.propTypes = {
  userId: PropTypes.number.isRequired
};
