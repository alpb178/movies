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

  const [page, setPage] = useState(1);

  const [sort, setSort] = useState('');
  const [data, setData] = useState({});

  const locale = {
    ...locales[lang]
  };

  const params = useMemo(() => {
    const query = {};
    if (page !== 0) query.page = page;
    if (sort) query.sort = sort;
    return query;
  }, [page, sort]);

  const { data: statisticsUsers, isLoading } = useStaticsUsers({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  useMemo(async () => {
    if (statisticsUsers) {
      let count = [];
      let labels = [];
      statisticsUsers?.map((item) => {
        count.push(item?.count);
        labels.push(format(new Date(item?.time_frame), 'PP', { locale }));
      });
      setData({ labels: labels, count: count });
    }
  }, [statisticsUsers]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex space-y-4">
        <CardBarChartUsers data={data} />
      </div>
      {/*<div className="flex space-y-4">
        <CardPageVisits />
      </div>
      <div className="flex space-x-4">
        <div className="w-full xl:w-1/2">
          <CardSocialTraffic />
        </div>
        <div className="w-full h-full xl:w-1/2">
          <CardBarChart />
        </div>
      </div>*/}
    </>
  );
};

Dashboard.propTypes = {
  row: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default Dashboard;
