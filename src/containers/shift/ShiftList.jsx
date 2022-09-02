/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import EmptyState from '@/components/common/EmptyState';
import Loading from '@/components/common/Loader';
import DeleteConfirmationDialog from '@/components/dialog/DeleteConfirmationDialog';
import DataTable from '@/components/table';
import TableActions from '@/components/table/TableActions';
import useShifts, { deleteShifts } from '@/hooks/shift/useShift';
import { API_SHIFT_URL, DEFAULT_PAGE_SIZE, SHIFT_DETAIL_PAGE } from '@/lib/constants';
import { locales, lottieOptions } from '@/lib/utils';
import { XCircleIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import Lottie from 'react-lottie';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import ShiftFilter from './ShiftFilter';
import Status from './Status';

const ShiftList = () => {
  const { t, lang } = useTranslation('common');
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sort, setSort] = useState();
  const onPageChangeCallback = useCallback(setPage, []);
  const onSortChangeCallback = useCallback(setSort, []);
  const [openFilters] = useState(false);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null });
  const [filterValues, setFilterValues] = useState({
    country: ''
  });

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
    return queryParams;
  }, [filterValues, page, pageSize, sort]);

  const { data: shifts, isLoading } = useShifts({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  const handleDelete = (event, row) => {
    event.stopPropagation();
    setDeleteConfirmation({ open: true, id: row.original.id });
  };

  const onDeleteConfirmation = async () => {
    try {
      setLoading(true);
      await deleteShifts({
        args: { id: deleteConfirmation.id }
      });

      await queryClient.refetchQueries([API_SHIFT_URL]);
      toast(t('deleted.male', { entity: t('shifts', { count: 1 }) }));
      setLoading(false);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = (event, row) => {
    event.stopPropagation();
    const value = row.original.id;
    // const path = SALE_FORM_PAGE(value);
    // router.push(path);
  };

  const renderStatus = (status) => {
    return <Status data={status} />;
  };

  const formatDate = (value) => <div>{format(new Date(value), 'PPp', { locale })}</div>;
  const formatUser = (value) => (
    <div>
      {value?.firstName} {value?.lastName}
    </div>
  );
  const formatOrders = (value) => <div>{value?.length}</div>;

  const columns = React.useMemo(() => [
    {
      Header: t('form.common.label.createdAt'),
      accessor: 'createdAt',
      Cell: ({ value }) => formatDate(value)
    },
    {
      Header: t('form.common.label.status'),
      accessor: 'status',
      Cell: ({ value, row }) => renderStatus(value, row)
    },
    {
      Header: t('form.common.label.updatedAt'),
      accessor: 'updatedAt',
      Cell: ({ value }) => formatDate(value)
    },
    {
      Header: t('form.common.worker-shift'),
      accessor: 'user',
      Cell: ({ value }) => formatUser(value)
    },
    {
      Header: t('form.common.size-orders'),
      accessor: 'orders',
      Cell: ({ value }) => formatOrders(value)
    },
    {
      id: 'optionComanda',
      displayName: 'optionComanda',
      Cell: ({ row }) => (
        <TableActions
          onEdit={(event) => onUpdate(event, row)}
          onDelete={(event) => handleDelete(event, row)}
        />
      )
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
    name: t('shifts', { count: 2 }),
    columns,
    data: shifts?.rows,
    count: shifts?.count,
    setPage: onPageChangeCallback,
    setSortBy: onSortChangeCallback,
    pageSize,
    onPageSizeChange: setPageSize,
    onRowClick: (row) => {
      console.log(row);
      const value = row.original.id;
      const path = SHIFT_DETAIL_PAGE(value);
      router.push(path);
    },
    onFilter: (
      <div className={`w-full px-6 ${openFilters && 'flex flex-col'}`}>
        <ShiftFilter open={openFilters} onSubmit={handleFilters} />

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

      {shifts && shifts.rows.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('shifts', { count: 0 })}>
          <div className="flex items-center justify-center h-64 w-max">
            <Lottie options={lottieOptions('offline')} />
          </div>
        </EmptyState>
      )}

      <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        onOpen={setDeleteConfirmation}
        onDeleteConfirmation={onDeleteConfirmation}
        title={t('delete-title', { entity: t('shifts', { count: 1 }) })}
        content={t('delete-message.female', { entity: t('shifts', { count: 1 }) })}
      />
    </>
  );
};

ShiftList.propTypes = {
  row: PropTypes.object,
  data: PropTypes.object,
  loading: PropTypes.bool,
  onSelectPayment: PropTypes.func,
  onDeletePayment: PropTypes.func
};

export default ShiftList;
