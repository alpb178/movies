import Loading from '@/components/common/Loader';
import useShifts from '@/hooks/shift/useShift';
import { locales, lottieOptions } from '@/lib/utils';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';
import Status from './Status';

const ShiftDetails = ({ shiftId }) => {
  const { t, lang } = useTranslation('common');
  const locale = {
    ...locales[lang]
  };

  const { data: shift, isLoading } = useShifts({
    args: { id: shiftId },
    options: {
      keepPreviousData: true,
      enabled: !!shiftId
    }
  });

  return isLoading ? (
    <Loading />
  ) : (
    <div className="flex flex-col w-full pb-8 space-x-0 lg:space-x-8 lg:flex-row">
      <div className="w-full space-y-6">
        <section aria-labelledby="applicant-information-title">
          <div className="bg-white">
            <div className="flex items-start justify-between px-4 py-5 sm:px-8">
              <div className="">
                <h2
                  id="applicant-information-title"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  {t('form.shifts.title.details')}
                </h2>
                <p className="max-w-2xl mt-1 text-sm text-gray-500">
                  {t('form.shifts.title.detailsEspecified')}
                </p>
              </div>

              <Status data={shift?.status} className="p-1 px-6 text-base rounded-full" />
            </div>

            <div className="flex flex-col justify-between px-4 py-5 space-y-4 border-gray-200 lg:space-x-4 lg:flex-row lg:space-y-0 border-y sm:px-8">
              <div className="space-y-4 font-medium text-gray-900">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {t('form.common.label.createdAt')} - {t('form.common.label.time')}
                  </p>
                  <div className="mt-1 text-sm text-gray-900">
                    {format(new Date(shift?.createdAt), 'PP', { locale })}-
                    {new Date(shift?.createdAt).toLocaleTimeString('en-US')}
                  </div>
                </div>

                <div className="sm:col-span-1">
                  <p className="text-sm font-medium text-gray-500">
                    {t('form.common.label.updatedAt')} - {t('form.common.label.time')}
                  </p>
                  <dd className="mt-1 text-sm text-gray-900">
                    {format(new Date(shift?.updatedAt), 'PP', { locale })} -{' '}
                    {new Date(shift?.updatedAt).toLocaleTimeString('en-US')}
                  </dd>
                </div>
              </div>

              <div className="lg:max-w-xs sm:col-span-1">
                <p className="font-medium text-gray-900">{t('form.common.worker-shift')}</p>

                <div className="grid grid-cols-2 gap-2 mt-2 text-base gap-x-8">
                  <p>
                    {shift?.user?.firstName} {shift?.user?.lastName}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      <section className="w-full lg:max-w-2xl">
        <div className="px-4 py-5 sm:px-8">
          <h2 id="timeline-title" className="text-lg font-medium text-gray-900 bor">
            {t('shifts', { count: 2 })}
          </h2>
        </div>

        <div className="w-full pt-5 mt-0 border-t border-gray-200 lg:mt-5">
          {shift?.shifts?.length > 0 ? (
            <dl className="w-full px-4 space-y-6 sm:px-8">
              {shift?.shifts.map((option) => (
                <div key={option?.id} className="flex justify-between w-full space-x-8">
                  <div className="w-full">
                    <p className="font-medium text-gray-700">
                      {format(new Date(option?.createdAt), 'PP', { locale })}/
                      {new Date(option?.createdAt).toLocaleTimeString('en-US')} -
                      {format(new Date(shift?.updatedAt), 'PP', { locale })}/
                      {new Date(shift?.updatedAt).toLocaleTimeString('en-US')}
                    </p>
                    <p className="max-w-2xl mt-1 text-sm text-gray-500">
                      {t('form.common.label.createdAt')}- {t('form.common.label.updatedAt')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-700">
                      <span className="py-1 mt-5 font-medium">
                        <Status data={option?.status} className="p-1 px-1 rounded-full" />
                      </span>
                    </p>
                    <p className="mt-1 text-sm text-gray-500">{t('form.common.label.status')}</p>
                  </div>
                </div>
              ))}
            </dl>
          ) : (
            <Lottie options={lottieOptions('offline')} />
          )}
        </div>
      </section>
    </div>
  );
};

ShiftDetails.propTypes = {
  shiftId: PropTypes.number
};

export default ShiftDetails;
