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
  const [salesFilters, setSalesFilters] = useState('day');
  const [ordersFilters, setOrdersFilters] = useState('day');

  const locale = {
    ...locales[lang]
  };

  const salesParams = useMemo(() => {
    const query = {};
    if (salesFilters !== '') query.tf = salesFilters;
    return query;
  }, [salesFilters]);

  const ordersParams = useMemo(() => {
    const query = {};
    if (ordersFilters !== '') query.tf = ordersFilters;
    return query;
  }, [ordersFilters]);

  const { data: statistics, isLoading: isLoadingOrders } = useStatics({
    args: ordersParams,
    options: {
      keepPreviousData: true
    }
  });

  const { data: salesReport, isLoading: isLoadingSales } = useStatics({
    args: salesParams,
    options: {
      keepPreviousData: true
    }
  });

  const onSubmit = (value) => {
    setSalesFilters(value);
  };

  const onSubmitI = (value) => {
    setOrdersFilters(value);
  };

  const salesData = useMemo(() => {
    if (salesReport) {
      const count = [];
      let labels = [];

      const grouped = _.mapValues(_.groupBy(salesReport, 'date'), (list) =>
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

        switch (salesFilters) {
          case 'day':
            return labels.push(format(new Date(date.split('T')[0] + 'T00:00'), 'P', { locale }));
          case 'month':
            return labels.push(format(new Date(date.split('T')[0] + 'T00:00'), 'MMMM', { locale }));
          case 'year':
            return labels.push(new Date(date).getFullYear());
        }
      });

      return { labels, count };
    }

    return null;
  }, [salesReport]);

  const ordersData = useMemo(() => {
    if (statistics) {
      let count = [];
      let labels = [];
      const grouped = _.mapValues(_.groupBy(statistics, 'date'), (list) =>
        list.map((order) => _.omit(order, 'date'))
      );

      Object.entries(grouped)?.map(([date, item]) => {
        count.push(item?.length);
        switch (salesFilters) {
          case 'day':
            return labels.push(format(new Date(date.split('T')[0] + 'T00:00'), 'P', { locale }));
          case 'month':
            return labels.push(format(new Date(date.split('T')[0] + 'T00:00'), 'MMMM', { locale }));
          case 'year':
            return labels.push(new Date(date).getFullYear());
        }
      });

      return { labels, count };
    }

    return null;
  }, [statistics]);

  return (
    <div className="w-full">
      <div className="flex flex-col w-full px-4 lg:space-x-4 lg:flex-row">
        {isLoadingSales ? (
          <Loading />
        ) : (
          <CardBarChartUsers
            data={salesData}
            actions={[
              { name: 'sales-day', value: 'day' },
              { name: 'sales-months', value: 'month' }
            ]}
            onSubmit={onSubmit}
            title={t('statistics.sales')}
            type="line"
          />
        )}

        {isLoadingOrders ? (
          <Loading />
        ) : (
          <CardBarChartUsers
            data={ordersData}
            actions={[
              { name: 'orders-day', value: 'day' },
              { name: 'orders-months', value: 'month' }
            ]}
            onSubmit={onSubmitI}
            title={t('statistics.orders')}
            type="line"
            bgColor=""
            borderColor=""
          />
        )}
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
