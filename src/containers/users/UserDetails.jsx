/* eslint-disable react/react-in-jsx-scope */
import Loading from '@/components/common/Loader';
import useMediaContext from '@/hooks/useMediaContext';
import useUsers from '@/hooks/user/useUsers';
import { Tab } from '@headlessui/react';
import { BanIcon } from '@heroicons/react/outline';
import { PencilIcon } from '@heroicons/react/solid';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import UserProfile from './user-sections/UserProfile';
import UserReviews from './user-sections/UserReviews';
import UserShipments from './user-sections/UserShipments';
import UserTraces from './user-sections/UserTraces';
import UserTravels from './user-sections/UserTravels';

const UserDetails = ({ userId }) => {
  const { t, lang } = useTranslation('common');
  const { isLarge, isSmall } = useMediaContext();

  const { data: user, isLoading } = useUsers({
    args: { id: userId },
    options: {
      keepPreviousData: true,
      enabled: !!userId
    }
  });

  const sections = {
    profile: <UserProfile data={user} />,
    travels: <UserTravels userId={userId} />,
    shipments: <UserShipments userId={userId} />,
    reviews: <UserReviews userId={user?.id} />
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <div className="flex w-full min-h-full">
        <div className="flex flex-col w-full">
          <main className="flex-1 py-8 xl:py-10">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 xl:grid xl:grid-cols-3">
              <div className="xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200">
                <div className="md:flex md:justify-between md:space-x-4 xl:pb-6">
                  <div className="flex space-x-8">
                    <img
                      className="w-20 h-20 rounded-full ring-4 ring-white sm:h-24 sm:w-24"
                      src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                      alt=""
                    />
                    <div>
                      <p className="text-2xl font-bold text-gray-900">
                        {`${user?.firstName} ${user?.lastName}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex h-full mt-6 space-x-4 md:mt-0">
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    >
                      <PencilIcon className="w-5 h-5 mr-2 -ml-1 text-gray-500" aria-hidden="true" />
                      <span>{t('update')}</span>
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                    >
                      <BanIcon className="w-5 h-5 mr-2 -ml-1 text-gray-500" aria-hidden="true" />
                      <span>{t('deactivate')}</span>
                    </button>
                  </div>
                </div>

                <div className="w-full px-2 mt-4 xl:mt-0 sm:px-0">
                  <Tab.Group>
                    <Tab.List className="flex space-x-8 border-b ">
                      {Object.keys(sections).map((section) => (
                        <Tab
                          key={section}
                          className={({ selected }) =>
                            clsx(
                              'w-max py-4 px-2 font-medium leading-5 text-gray-800 border-b-2 border-transparent',
                              selected
                                ? 'border-secondary-600'
                                : 'hover:text-secondary-600 hover:border-gray-300'
                            )
                          }
                        >
                          {t(section, { count: 2 })}
                        </Tab>
                      ))}

                      {isSmall ? (
                        <Tab
                          className={({ selected }) =>
                            clsx(
                              'w-max py-4 px-2 font-medium leading-5 text-gray-800 border-b-2 border-transparent',
                              selected
                                ? 'border-secondary-600'
                                : 'hover:text-secondary-600 hover:border-gray-300'
                            )
                          }
                        >
                          {t('traces', { count: 2 })}
                        </Tab>
                      ) : null}
                    </Tab.List>
                    <Tab.Panels className="mt-2">
                      {Object.values(sections).map((section, idx) => (
                        <Tab.Panel key={idx}>{section}</Tab.Panel>
                      ))}

                      {isSmall ? (
                        <Tab.Panel>
                          <UserTraces key={4} />
                        </Tab.Panel>
                      ) : null}
                    </Tab.Panels>
                  </Tab.Group>
                </div>
              </div>

              {isLarge ? <UserTraces /> : null}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

UserDetails.propTypes = {
  userId: PropTypes.number.isRequired
};

export default UserDetails;
