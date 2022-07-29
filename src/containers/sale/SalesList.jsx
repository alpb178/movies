/* eslint-disable react/display-name */
import EmptyState from '@/components/common/EmptyState';
import Loading from '@/components/common/Loader';
import DataTable from '@/components/table';
import TableActions from '@/components/table/TableActions';
import useSales from '@/hooks/sales/useSales';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
import { lottieOptions } from '@/lib/utils';
import { XCircleIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Lottie from 'react-lottie';
import { useQueryClient } from 'react-query';
import SalesFilter from './SalesFilter';

const SalesList = () => {
  const { t } = useTranslation('common');

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sort, setSort] = useState();
  const onPageChangeCallback = useCallback(setPage, []);
  const onSortChangeCallback = useCallback(setSort, []);
  const [openFilters, setOpenFilters] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const queryClient = useQueryClient();
  const [selectedItem, setSelectedItem] = useState();
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null });
  const [loading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState({
    country: ''
  });

  useEffect(() => {
    if (!openForm) {
      setSelectedItem(null);
    }
  }, [openForm]);

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
    return queryParams;
  }, [filterValues, page, pageSize, sort]);

  const { data: sales, isLoading } = useSales({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  const onUpdate = (event, item) => {
    event.stopPropagation();
    setSelectedItem(item);
    setOpenForm(true);
  };

  const columns = React.useMemo(() => [
    {
      Header: t('code'),
      accessor: 'code'
    },
    {
      Header: t('name'),
      accessor: 'name'
    },
    {
      id: 'optionsSales',
      displayName: 'optionsSales',
      Cell: ({ row }) => <TableActions onEdit={(event) => onUpdate(event, row.original)} />
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
  };

  const options = {
    name: t('sales', { count: 2 }),
    columns,
    data: sales?.rows,
    count: sales?.count,
    setPage: onPageChangeCallback,
    setSortBy: onSortChangeCallback,
    pageSize,
    onPageSizeChange: setPageSize,
    onFilter: (
      <div className={`w-full px-6 ${openFilters && 'flex flex-col'}`}>
        <SalesFilter open={openFilters} onSubmit={handleFilters} />

        <div className="flex">
          <FilterCriteria />
        </div>
      </div>
    ),
    actions: (
      <div className="space-x-4">
        {/* <button
          type="button"
          className="px-6 py-2 text-lg font-medium bg-white border rounded-md w-max hover:bg-gray-100"
          onClick={() => setOpenFilters(!openFilters)}
        >
          {t('filter')}
        </button>*/}
      </div>
    )
  };

  return (
    <>
      {(loading || isLoading) && <Loading />}

      {sales && sales.rows.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('sales', { count: 0 })}>
          <div className="flex items-center justify-center h-64 w-max">
            <Lottie options={lottieOptions('offline')} />
          </div>
        </EmptyState>
      )}
    </>
  );
};

SalesList.propTypes = {
  row: PropTypes.object,
  data: PropTypes.object,
  loading: PropTypes.bool,
  onGetSales: PropTypes.func,
  onSelectPayment: PropTypes.func,
  onDeletePayment: PropTypes.func
};

export default SalesList;
