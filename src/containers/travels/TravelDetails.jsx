import useTravels from '@/hooks/travel/useTravels';
import { formatPrice, locales } from '@/lib/utils';
import { CheckIcon, PaperClipIcon, ThumbUpIcon, UserIcon } from '@heroicons/react/solid';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';

const user = {
  name: 'Whitney Francis',
  email: 'whitney@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1517365830460-955ce3ccd263?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80'
};
const navigation = [
  { name: 'Dashboard', href: '#' },
  { name: 'Jobs', href: '#' },
  { name: 'Applicants', href: '#' },
  { name: 'Company', href: '#' }
];
const breadcrumbs = [
  { name: 'Jobs', href: '#', current: false },
  { name: 'Front End Developer', href: '#', current: false },
  { name: 'Applicants', href: '#', current: true }
];
const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' }
];
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

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const TravelDetail = ({ travelId }) => {
  const { t, lang } = useTranslation('common');

  const { data: travel, isLoading } = useTravels({
    args: { id: travelId },
    options: {
      keepPreviousData: true
    }
  });

  return (
    <>
      <div className="min-h-full bg-white">
        <main className="p-6">
          <div className="md:flex md:items-center md:justify-between md:space-x-5">
            <div className="flex items-center space-x-5">
              <div className="flex-shrink-0">
                <div className="relative">
                  <img
                    className="w-16 h-16 rounded-full"
                    src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                    alt=""
                  />
                  <span className="absolute inset-0 rounded-full shadow-inner" aria-hidden="true" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {`${travel?.traveler?.firstName} ${travel?.traveler?.lastName}`}
                </h1>
                <p className="text-sm font-medium text-gray-500">{`${t('registered-at')} ${format(
                  new Date(travel?.traveler?.createdAt || null),
                  'PPP',
                  { locale: { ...locales[lang] } }
                )}`}</p>
              </div>
            </div>
            <div className="flex flex-col-reverse mt-6 space-y-4 space-y-reverse justify-stretch sm:flex-row-reverse sm:justify-end sm:space-x-reverse sm:space-y-0 sm:space-x-3 md:mt-0 md:flex-row md:space-x-3">
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
              >
                Disqualify
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500"
              >
                Advance to offer
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-12 mx-auto mt-8 lg:grid-flow-col-dense lg:grid-cols-3">
            <div className="space-y-6 lg:col-start-1">
              {/* Description list*/}
              <section aria-labelledby="applicant-information-title">
                <div className="pb-2">
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
                <div className="py-5 border-t border-gray-200">
                  <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">{t('email')}</dt>
                      <dd className="mt-1 text-sm text-gray-900">{travel?.traveler?.email}</dd>
                    </div>
                    <div className="sm:col-span-1">
                      <dt className="text-sm font-medium text-gray-500">{t('mobile')}</dt>
                      <dd className="mt-1 text-sm text-gray-900">{travel?.traveler?.mobile}</dd>
                    </div>
                    {/* <div className="sm:col-span-1">
                        <dt className="text-sm font-medium text-gray-500">Salary expectation</dt>
                        <dd className="mt-1 text-sm text-gray-900">$120,000</dd>
                      </div> */}
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">{t('about')}</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt
                        cillum culpa consequat. Excepteur qui ipsum aliquip consequat sint. Sit id
                        mollit nulla mollit nostrud in ea officia proident. Irure nostrud pariatur
                        mollit ad adipisicing reprehenderit deserunt qui eu.
                      </dd>
                    </div>
                    <div className="sm:col-span-2">
                      <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                      <dd className="mt-1 text-sm text-gray-900">
                        <ul
                          role="list"
                          className="border border-gray-200 divide-y divide-gray-200 rounded-md"
                        >
                          {attachments.map((attachment) => (
                            <li
                              key={attachment.name}
                              className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                            >
                              <div className="flex items-center flex-1 w-0">
                                <PaperClipIcon
                                  className="flex-shrink-0 w-5 h-5 text-gray-400"
                                  aria-hidden="true"
                                />
                                <span className="flex-1 w-0 ml-2 truncate">{attachment.name}</span>
                              </div>
                              <div className="flex-shrink-0 ml-4">
                                <a
                                  href={attachment.href}
                                  className="font-medium text-blue-600 hover:text-blue-500"
                                >
                                  Download
                                </a>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </dd>
                    </div>
                  </dl>
                </div>
                <div>
                  <a
                    href="#"
                    className="block px-4 py-4 text-sm font-medium text-center text-gray-500 bg-gray-50 hover:text-gray-700 sm:rounded-b-lg"
                  >
                    Read full application
                  </a>
                </div>
              </section>
            </div>

            <section aria-labelledby="timeline-title" className="lg:col-start-2 lg:col-span-2">
              <h2 id="timeline-title" className="text-lg font-medium text-gray-900">
                {t('shipment-items', { count: 2 })}
              </h2>

              <div className="flow-root mt-6">
                <ul role="list" className="border divide-y rounded-lg">
                  {travel?.payload &&
                    travel?.payload.length > 0 &&
                    travel?.payload.map((item, itemIdx) => (
                      <li key={item.id} className="grid w-full grid-cols-3 p-6">
                        <div className="space-y-1">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-gray-400">{item.measureUnit.name}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="font-medium">{`- / ${item.Payload.amount}`}</p>
                          <p className="text-sm text-gray-400">{`Disponibilidad (${item.measureUnit.name})`}</p>
                        </div>
                        <p className="text-right">{formatPrice(item.Payload.price)}</p>
                      </li>
                    ))}
                </ul>
              </div>
              {/* <div className="flex flex-col mt-6 justify-stretch">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Advance to offer
                  </button>
                </div> */}
            </section>
          </div>
        </main>
      </div>
    </>
  );
};

export default TravelDetail;
