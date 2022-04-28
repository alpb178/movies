import DetailsDialogWrapper from '@/components/detailsDialog/DialogWrapper';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React from 'react';

const RegionDetails = ({ data, onOpen, open }) => {
  const { t } = useTranslation('common');

  return (
    <DetailsDialogWrapper formName="region" open={open} onOpen={onOpen}>
      <div className="w-full p-6 text-gray-700 bg-white border ">
        <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4">
          <dt className="text-xl font-medium text-gray-500">{t('form.common.label.name')}</dt>
          <dd className="mt-1 text-xl text-gray-900 sm:mt-0 sm:col-span-2">{data?.name}</dd>
        </div>
        <div className="px-2 py-4 border-t border-gray-200 sm:p-0">
          <dl className="sm:divide-y sm:divide-gray-200">
            <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-xl font-medium text-gray-500">{t('form.common.label.code')}</dt>
              <dd className="mt-1 text-xl text-gray-900 sm:mt-0 sm:col-span-2">{data?.code}</dd>
            </div>
            <div className="py-2 sm:py-3 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt className="text-xl font-medium text-gray-500">
                {t('form.regulation.label.country')}
              </dt>
              <dd className="mt-1 text-xl text-gray-900 sm:mt-0 sm:col-span-2">
                {data?.country.name}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </DetailsDialogWrapper>
  );
};

RegionDetails.defaultProps = {
  data: null
};

RegionDetails.propTypes = {
  data: PropTypes.object,
  onOpen: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};

export default RegionDetails;
