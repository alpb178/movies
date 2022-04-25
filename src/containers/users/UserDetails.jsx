import Loading from '@/components/common/Loading';
import useUsers from '@/hooks/user/useUsers';
import { locales } from '@/lib/utils';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';
import UserReviews from './UserReviews';
import UserTravels from './UserTravels';

const UserDetails = ({ userId }) => {
  const { t, lang } = useTranslation('common');

  const { data: user, isLoading } = useUsers({
    args: { id: userId },
    options: {
      keepPreviousData: true,
      enabled: !!userId
    }
  });

  return isLoading ? (
    <Loading />
  ) : (
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
              alt="profile-image"
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

      <div className="flex flex-col space-y-6 lg:space-y-0 lg:space-x-6 lg:flex-row">
        <div className="w-full space-y-6">
          {/* Description list*/}
          <section
            aria-labelledby="applicant-information-title"
            className="bg-white border border-gray-100 rounded-md shadow"
          >
            <div className="">
              <div className="px-4 py-5 sm:px-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">{t('email')}</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user?.email}</dd>
                  </div>

                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">{t('phone')}</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user?.mobile || '-'}</dd>
                  </div>

                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">{t('about')}</dt>
                    <dd className="mt-1 text-sm text-gray-900">{user.description || '-'}</dd>
                  </div>

                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                      {t('roles', { count: 2 })}
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                      {user.roles.map((role) => (
                        <span
                          key={role.id}
                          className="px-4 py-1 font-medium rounded-full text-secondary-700 bg-secondary-100"
                        >
                          {t(role.name.replace(/_/g, '-').toLowerCase())}
                        </span>
                      )) || '-'}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <UserReviews />
          </section>
        </div>

        <section aria-labelledby="timeline-title" className="w-full">
          <UserTravels userId={userId} />
        </section>
      </div>
    </main>
  );
};

UserDetails.propTypes = {
  userId: PropTypes.number.isRequired
};

export default UserDetails;
