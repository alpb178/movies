/* eslint-disable react/react-in-jsx-scope */
import EmptyState from '@/components/common/EmptyState';
import Loading from '@/components/common/Loader';
import useSales from '@/hooks/sales/useSales';
import { lottieOptions } from '@/lib/utils';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import Lottie from 'react-lottie';

const SaleDetails = ({ saleId }) => {
  const { t, lang } = useTranslation('common');

  const { data: sale, isLoading } = useSales({
    args: { id: saleId },
    options: {
      keepPreviousData: true,
      enabled: !!saleId
    }
  });

  return isLoading ? (
    <Loading />
  ) : (
    <main className="p-6">
      <div className="grid mt-5 grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
        <div className="sm:col-span-1">
          <dt className="text-2xl text-gray-600">{t('form.common.label.name')}</dt>
          <dd className="mt-5 text-gray-900">{sale?.name || t('no-data')}</dd>
        </div>
        <div className="sm:col-span-1">
          <dt className="text-2xl  text-gray-600">{t('form.common.label.table')}</dt>
          <dl className="grid mt-5 grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            {sale?.tables?.length > 0 ? (
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-3">
                {sale?.tables.map((option) => (
                  <span
                    key={option?.code}
                    className="px-4 py-1 font-medium  text-green-700 bg-green-100 rounded-full float-center"
                  >
                    {option.code}
                  </span>
                ))}
              </dl>
            ) : (
              <EmptyState text={t('sales', { count: 0 })}>
                <div className="flex items-center justify-center h-64 w-max">
                  <Lottie options={lottieOptions('offline')} />
                </div>
              </EmptyState>
            )}
          </dl>
        </div>
      </div>
    </main>
  );
};

SaleDetails.propTypes = {
  userId: PropTypes.number.isRequired
};

export default SaleDetails;
