/* eslint-disable react/display-name */
import DeleteConfirmationDialog from '@/components/common/DeleteConfirmationDialog';
import EmptyState from '@/components/common/EmptyState';
import DataTable from '@/components/table';
import TableActions from '@/components/table/TableActions';
import useAirlines, { saveAirlines } from '@/hooks/airline/useAirlines';
import { API_AIRLINES_URL, DEFAULT_PAGE_SIZE, DELETE } from '@/lib/constants';
import { XCircleIcon } from '@heroicons/react/outline';
import Loading from 'components/common/Loading';
import PaymentFilter from 'containers/airlines/AirlinesFilter';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import AirlinesForm from './AirlinesForm';

const AirlinesList = () => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const [openFilters, setOpenFilters] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null });
  const [selectedItem, setSelectedItem] = useState();
  const [filterValues, setFilterValues] = useState({
    name: ''
  });
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sort, setSort] = useState();
  const onPageChangeCallback = useCallback(setPage, []);
  const onSortChangeCallback = useCallback(setSort, []);

  const params = useMemo(() => {
    const query = {};
    if (page !== 0) query.page = page;
    if (sort) query.sort = sort;
    return query;
  }, [filterValues, page, sort]);

  useEffect(() => {
    if (!openForm) {
      setSelectedItem(null);
    }
  }, [openForm]);

  const { data: airlines } = useAirlines({
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
      await saveAirlines({
        args: { id: deleteConfirmation.id },
        options: {
          method: DELETE
        }
      });
      toast(t('deleted.female', { entity: t('airlines', { count: 1 }) }));
      queryClient.refetchQueries([API_AIRLINES_URL]);
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = (event, item) => {
    event.stopPropagation();
    setSelectedItem(item);
    setOpenForm(true);
  };

  const columns = React.useMemo(() => [
    {
      Header: t('logo'),
      accessor: 'logoUrl'
    },
    {
      Header: t('name'),
      accessor: 'name'
    },
    {
      id: 'optionsAirlines',
      displayName: 'optionsAirlines',
      Cell: ({ row }) => (
        <TableActions
          onEdit={(event) => onUpdate(event, row.original)}
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
            <button type="button" id={filterValues[e]} onClick={(event) => handleClick(event, e)}>
              <XCircleIcon className="w-6 h-6 ml-2 float-center" />
            </button>
          </div>
        )
    );

  const handleFilters = (values) => {
    setFilterValues(values);
  };

  const handleClick = (event, value) => {
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

  const renderInsertButton = () => (
    <button type="button" className="btn-outlined" onClick={() => setOpenForm(true)}>
      {t('new', { entity: t('airlines', { count: 1 }) })}
    </button>
  );

  const options = {
    columns,
    data: airlines?.rows,
    count: airlines?.count,
    setPage: onPageChangeCallback,
    setSortBy: onSortChangeCallback,
    pageSize,
    onPageSizeChange: setPageSize,
    name: t('airlines', { count: 2 }),
    onFilter: (
      <div className={`w-full px-6 ${openFilters && 'flex flex-col'}`}>
        <PaymentFilter open={openFilters} onSubmit={handleFilters} />

        <div className="flex">
          <FilterCriteria />
        </div>
      </div>
    ),
    actions: (
      <div className="space-x-4">
        <button
          type="button"
          className="px-8 py-2 text-lg font-medium bg-white border rounded-md w-max hover:bg-gray-100"
          onClick={() => setOpenFilters(!openFilters)}
        >
          {t('filter')}
        </button>
        {renderInsertButton()}
      </div>
    )
  };

  return (
    <>
      {loading && <Loading />}

      {airlines && airlines.rows.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('airlines', { count: 0 })}>{renderInsertButton()}</EmptyState>
      )}

      <AirlinesForm
        data={selectedItem}
        open={openForm}
        onOpen={setOpenForm}
        setLoading={setLoading}
      />

      <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        onOpen={setDeleteConfirmation}
        onDeleteConfirmation={onDeleteConfirmation}
        title={t('delete-title', { entity: t('airlines', { count: 1 }) })}
        content={t('delete-message.female', { entity: t('airlines', { count: 1 }) })}
      />
    </>
  );
};

AirlinesList.propTypes = {
  row: PropTypes.object
};

export default AirlinesList;
