import Loading from '@/components/common/Loading';
import usePermissions from '@/hooks/permission/usePermissions';
import { locales } from '@/lib/utils';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import PropTypes from 'prop-types';
import React from 'react';
import RoleReviews from './RoleReviews';
import RoleTravels from './RoleTravels';

const Permissionsetails = ({ roleId }) => {
  const { t, lang } = useTranslation('common');

  const { data: role, isLoading } = usePermissions({
    args: { id: roleId },
    options: {
      keepPreviousData: true,
      enabled: !!roleId
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
              {`${role?.firstName} ${role?.lastName}`}
            </h1>
            <p className="text-sm font-medium text-gray-500">{`${t('registered-at')} ${format(
              new Date(role?.createdAt || null),
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
                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">{t('email')}</dt>
                    <dd className="mt-1 text-sm text-gray-900">{role?.email}</dd>
                  </div>

                  <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">{t('phone')}</dt>
                    <dd className="mt-1 text-sm text-gray-900">{role?.mobile || '-'}</dd>
                  </div>

                  <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">{t('about')}</dt>
                    <dd className="mt-1 text-sm text-gray-900">{role.description || '-'}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <RoleReviews />
          </section>
        </div>

        <section aria-labelledby="timeline-title" className="w-full">
          <RoleTravels roleId={roleId} />
        </section>
      </div>
    </main>
  );
};

Permissionsetails.propTypes = {
  roleId: PropTypes.number.isRequired
};

export default Permissionsetails;
