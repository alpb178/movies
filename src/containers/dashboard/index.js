/* eslint-disable react/react-in-jsx-scope */
import Loading from '@/components/common/Loader';
import CardBarChartUsers from 'components/cards/CardBarChartUsers.js';

import useStatics from '@/hooks/statistics/useStatistics';
import { locales } from '@/lib/utils';
import { format } from 'date-fns';
import _ from 'lodash';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

const Dashboard = () => {
  const { t, lang } = useTranslation('common');
  const [filterValues, setFilterValues] = useState('day');
  const [filterValuesI, setFilterValuesI] = useState('day');

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
            return labels.push(format(new Date(item?.date), 'P', { locale }));
          case 'year':
            labels.push(new Date(item?.date).getFullYear());
        }
      });
      setData({ labels: labels, count: count });
    }
    if (statisticsAmount) {
      const count = [];
      let labels = [];

      const grouped = _.mapValues(_.groupBy(statisticsAmount, 'date'), (list) =>
        list.map((order) => _.omit(order, 'date'))
      );

      Object.entries(grouped)?.map(([date, item]) => {
        const total = item?.reduce((partialSum, product) => {
          const subtotal = product?.orderProducts.reduce(
            (partialSum, p) => partialSum + p?.consumption,
            0
          );
          return partialSum + subtotal;
        }, 0);
        count.push(total);

        switch (filterValues) {
          case 'day':
            return labels.push(format(new Date(item?.date), 'P', { locale }));
          case 'year':
            labels.push(new Date(item?.date).getFullYear());
        }
      });
      return { labels, count };
    }

    return null;
  }, [statisticsAmount]);

  const ordersData = useMemo(() => {
    if (statistics) {
      let count = [];
      let labels = [];
      const grouped = _.mapValues(_.groupBy(statistics, 'date'), (list) =>
        list.map((order) => _.omit(order, 'date'))
      );

      Object.entries(grouped)?.map(([date, item]) => {
        count.push(item?.length);
        switch (filterValues) {
          case 'day':
            return labels.push(format(new Date(date.split('T')[0] + 'T00:00'), 'PP', { locale }));
          case 'months':
            return labels.push(new Date(date).getMonth());
          case 'year':
            labels.push(new Date(date).getFullYear());
        }
      });

      return { labels, count };
    }

    return null;
  }, [statistics]);

  return (
    <div className="w-full">
      {isLoading && <Loading />}
      <div className="flex flex-col w-full px-4 lg:space-x-4 lg:flex-row">
        <CardBarChartUsers
          data={salesData}
          //actions={['day', 'months']}
          onSubmit={onSubmit}
          title={t('statistics.sales')}
          type="line"
        />
        <CardBarChartUsers
          data={ordersData}
          // actions={['day', 'months']}
          onSubmit={onSubmitI}
          title={t('statistics.orders')}
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
