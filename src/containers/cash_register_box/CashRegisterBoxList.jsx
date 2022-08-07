/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import EmptyState from '@/components/common/EmptyState';
import Loading from '@/components/common/Loader';
import DataTable from '@/components/table';
import { useStaticsProducts } from '@/hooks/statistics/useStatistics';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
import { formatPrice, locales, lottieOptions } from '@/lib/utils';
import { XCircleIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Lottie from 'react-lottie';
import SalesFilter from './CashRegisterBoxFilter';

const CashRegisterBoxList = () => {
  const { t, lang } = useTranslation('common');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sort, setSort] = useState();
  const onPageChangeCallback = useCallback(setPage, []);
  const onSortChangeCallback = useCallback(setSort, []);
  const [openFilters, setOpenFilters] = useState(true);
  const [openForm] = useState(false);
  const [SelectedItem, setSelectedItem] = useState();
  const [loading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState({
    date: ''
  });

  useEffect(() => {
    if (!openForm) {
      setSelectedItem(null);
    }
  }, [openForm]);

  const locale = {
    ...locales[lang]
  };

  const params = useMemo(() => {
    const queryParams = {};

    if (page) {
      queryParams.page = page;
    }
    if (pageSize) {
      queryParams.size = pageSize;
    }
    if (sort) {
      queryParams.sort = sort;
    }
    if (filterValues.date !== '') {
      queryParams.createdAt = filterValues.date;
    }
    return queryParams;
  }, [filterValues, page, pageSize, sort]);

  const { data: products, isLoading } = useStaticsProducts({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  const formatDate = (value) => <div>{format(new Date(value), 'PPp', { locale })}</div>;
  const formatAmount = (value) => (
    <div>{formatPrice(value?.original?.amount * value?.original?.product?.price || 0, 2)}</div>
  );

  const columns = React.useMemo(() => [
    {
      Header: t('form.common.label.createdAt'),
      accessor: 'created_at',
      Cell: ({ value }) => formatDate(value)
    },
    {
      Header: t('sales', { count: 1 }),
      accessor: 'order.id'
    },
    {
      Header: t('form.common.label.table'),
      accessor: 'order.table.code'
    },
    {
      Header: t('form.common.label.area'),
      accessor: 'order.table.area.name'
    },
    {
      Header: t('products', { count: 1 }),
      accessor: 'product.name'
    },
    {
      Header: t('form.common.label.price'),
      accessor: 'product.price'
    },
    {
      Header: t('form.common.label.size'),
      accessor: 'amount'
    },
    {
      Header: t('form.common.label.amount'),
      Cell: ({ row }) => formatAmount(row)
    }
  ]);

  const FilterCriteria = () =>
    Object.keys(filterValues).map(
      (e) =>
        filterValues[e] !== '' && (
          <div className="flex items-center px-4 py-1 mr-4 text-sm font-medium bg-gray-100 rounded-full w-max">
            <span key={filterValues[e]} className="font-medium">
              {`${t(e)}: `}
              <span className="font-normal">{filterValues[e]}</span>
            </span>
            <button type="button" id={filterValues[e]} onClick={() => onFilterChange(e)}>
              <XCircleIcon className="w-6 h-6 ml-2 float-center" />
            </button>
          </div>
        )
    );

  const handleFilters = (values) => {
    setFilterValues(values);
  };

  const onFilterChange = (value) => {
    const updatedFilters = Object.keys(filterValues)
      .filter((key) => value != key)
      .reduce(
        (obj, key) => ({
          ...obj,
          [key]: filterValues[key]
        }),
        {}
      );
    setFilterValues(updatedFilters);
    setLoading(false);
  };

  const options = {
    name: t('cash_register_box', { count: 2 }),
    columns,
    data: products,
    count: products?.lenght,
    setPage: onPageChangeCallback,
    setSortBy: onSortChangeCallback,
    pageSize,
    onPageSizeChange: setPageSize
  };

  return (
    <>
      {(loading || isLoading) && <Loading />}

      <div className={`w-full mt-5 px-6 ${openFilters && 'flex flex-col'}`}>
        <SalesFilter open={openFilters} onSubmit={handleFilters} />

        <div className="flex">
          <FilterCriteria />
        </div>
      </div>

      {products && products?.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('cash_register_box', { count: 0 })}>
          <div className="flex items-center justify-center h-64 w-max">
            <Lottie options={lottieOptions('offline')} />
          </div>
        </EmptyState>
      )}
    </>
  );
};

CashRegisterBoxList.propTypes = {
  row: PropTypes.object,
  data: PropTypes.object,
  loading: PropTypes.bool,
  onGetSales: PropTypes.func,
  onSelectPayment: PropTypes.func,
  onDeletePayment: PropTypes.func
};

export default CashRegisterBoxList;
