/* eslint-disable react/react-in-jsx-scope */
import Loading from '@/components/common/Loader';
import useUsers from '@/hooks/user/useUsers';
import Image from 'next/image';
import UserOrganization from './user-sections/UserOrganization';
import UserProfile from './user-sections/UserProfile';

const MetaData = ({ data }) => {
  return (
    <div className="border-t border-b border-gray-200 xl:border-b-0">
      <UserOrganization data={data} />
    </div>
  );
};

export default function Example({ userId }) {
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
    <div className="flex min-h-full">
      <div className="flex flex-col flex-1 w-0">
        <main className="flex-1">
          <div className="max-w-5xl mx-auto xl:max-w-5xl xl:grid xl:grid-cols-3">
            <div className="xl:col-span-2 xl:pr-8 xl:border-r xl:border-gray-200">
              <div className="md:flex md:justify-between md:space-x-4 xl:pb-6">
                <div className="flex space-x-8">
                  <div className="mt-8">
                    <div className="flex-shrink-0">
                      <Image
                        layout="intrinsic"
                        width={72}
                        height={72}
                        className="rounded-full"
                        src="/images/user-avatar.png"
                        alt=""
                      />
                    </div>

                    <p className="text-2xl font-bold text-gray-900">
                      {`${user?.firstName} ${user?.lastName}`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="w-full px-2 mt-4 xl:mt-0 sm:px-0">
                <UserProfile data={user} />
              </div>
            </div>

            <aside className="hidden xl:block xl:pl-8">
              <MetaData data={user?.business} />
            </aside>
          </div>
        </main>
      </div>
    </div>
  );
}
