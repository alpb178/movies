/* eslint-disable react/react-in-jsx-scope */
import Loading from '@/components/common/Loader';
import CardBarChartUsers from 'components/cards/CardBarChartUsers.js';

import useStatics from '@/hooks/statistics/useStatistics';
import { locales } from '@/lib/utils';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

const Dashboard = () => {
  const { t, lang } = useTranslation('common');
  const [filterValues, setFilterValues] = useState('day');
  const [filterValuesI, setFilterValuesI] = useState('day');
  const [data, setData] = useState({});
  const [dataUP, setDataUP] = useState({});

  const locale = {
    ...locales[lang]
  };

  const params = useMemo(() => {
    const query = {};
    if (filterValues !== '') query.tf = filterValues;
    return query;
  }, [filterValues]);

  const paramsI = useMemo(() => {
    const query = {};
    if (filterValuesI !== '') query.tf = filterValuesI;
    return query;
  }, [filterValuesI]);

  const { data: statistics, isLoading } = useStatics({
    args: paramsI,
    options: {
      keepPreviousData: true
    }
  });

  const { data: statisticsAmount, isLoadingStatisticsAmount } = useStatics({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  const onSubmit = (event, value) => {
    event.stopPropagation();
    setFilterValues(value);
  };

  const onSubmitI = (event, value) => {
    event.stopPropagation();
    setFilterValuesI(value);
  };

  useMemo(async () => {
    if (statistics) {
      let count = [];
      let labels = [];
      statistics?.map((item) => {
        count.push(item?.orderProducts?.length);
        switch (filterValues) {
          case 'months':
            return labels.push(new Date(item?.date).getMonth());
          case 'day':
            return labels.push(format(new Date(item?.date.split('T')[0]), 'PP', { locale }));
          case 'year':
            labels.push(new Date(item?.item?.date).getFullYear());
        }
      });
      setData({ labels: labels, count: count });
    }
    if (statisticsAmount) {
      const count = [];
      let labels = [];
      statisticsAmount?.map((item) => {
        const total = item.orderProducts?.reduce(
          (partialSum, product) => partialSum + product?.consumption,
          0
        );
        count.push(total);

        switch (filterValues) {
          case 'day':
            return labels.push(format(new Date(item?.date), 'PP', { locale }));
          case 'year':
            labels.push(new Date(item?.item?.date).getFullYear());
        }
      });
      setDataUP({ labels, count });
    }
  }, [statisticsAmount, statistics]);

  return (
    <div className="w-full">
      {isLoading && <Loading />}
      <div className="flex w-full px-4 space-x-4">
        <CardBarChartUsers
          data={dataUP}
          //actions={['day', 'months']}
          onSubmit={onSubmit}
          title={t('statistics.users-count')}
          type="line"
        />
        <CardBarChartUsers
          data={data}
          // actions={['day', 'months']}
          onSubmit={onSubmitI}
          title={t('statistics.user-activate-desactivate')}
          type="line"
        />
      </div>
    </div>
  );
};

Dashboard.propTypes = {
  row: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Dashboard;
