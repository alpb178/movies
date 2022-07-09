/* eslint-disable react/react-in-jsx-scope */
import Loading from '@/components/common/Loader';
import CardBarChartUsers from 'components/cards/CardBarChartUsers.js';

import useStaticsUsers from '@/hooks/statistics/useStatistics';

import { locales } from '@/lib/utils';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

const Dashboard = () => {
  const { t, lang } = useTranslation('common');
  const [filterValues, setFilterValues] = useState('day');
  const [data, setData] = useState({});
  const [dataStatics, setDataStatics] = useState({});

  const locale = {
    ...locales[lang]
  };

  const params = useMemo(() => {
    const query = {};
    if (filterValues !== '') query.tf = filterValues;
    return query;
  }, [filterValues]);

  const { data: statisticsUsers, isLoading } = useStaticsUsers({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  const { data: statistics, isLoadingStaticts } = useStaticsUsers({
    options: {
      keepPreviousData: true
    }
  });

  const onSubmit = (event, value) => {
    event.stopPropagation();
    setFilterValues(value);
  };

  useMemo(async () => {
    if (statisticsUsers) {
      let count = [];
      let labels = [];
      statisticsUsers?.map((item) => {
        count.push(item?.count);
        switch (filterValues) {
          case 'months':
            return labels.push(new Date(item?.time_frame).getMonth());
          case 'day':
            return labels.push(format(new Date(item?.time_frame), 'PP', { locale }));
          case 'year':
            labels.push(new Date(item?.time_frame).getFullYear());
        }
      });
      setData({ labels: labels, count: count });
    }
    if (statistics) {
      let count = [];
      let labels = [];
      statistics?.map((item) => {
        count.push(item?.count);
        labels.push(format(new Date(item?.time_frame), 'PP', { locale }));
      });
      setDataStatics({ labels: labels, count: count });
    }
  }, [statisticsUsers]);

  return (
    <>
      {(isLoading || isLoadingStaticts) && <Loading />}
      <div className="flex space-x-4">
        {console.log(filterValues)}
        <div className="w-full xl:w-1/2">
          <CardBarChartUsers data={data} actions={['months', 'day', 'year']} onSubmit={onSubmit} />
        </div>
        <div className="w-full h-full xl:w-1/2">
          <CardBarChartUsers data={dataStatics} />
        </div>
      </div>
    </>
  );
};

Dashboard.propTypes = {
  row: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Dashboard;
