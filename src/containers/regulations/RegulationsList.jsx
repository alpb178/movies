import EmptyState from '@/components/common/EmptyState';
import DeleteConfirmationDialog from '@/components/dialog/DeleteConfirmationDialog';
import DataTable from '@/components/table';
import TableActions from '@/components/table/TableActions';
import useRegulations, { saveRegulations } from '@/hooks/regulation/useRegulations';
import { API_REGULATIONS_URL, DEFAULT_PAGE_SIZE, DELETE } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { XCircleIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import Loading from 'components/common/Loading';
import RegulationsFilter from 'containers/regulations/RegulationsFilter';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import RegulationsForm from './RegulationsForm';

const RegulationsList = () => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sort, setSort] = useState('');
  const onPageChangeCallback = useCallback(setPage, []);
  const onSortChangeCallback = useCallback(setSort, []);
  const [openForm, setOpenForm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null });
  const [selectedItem, setSelectedItem] = useState();
  const [openFilters, setOpenFilters] = useState(false);
  const [filterValues, setFilterValues] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!openForm) {
      setSelectedItem(null);
    }
  }, [openForm]);

  const params = useMemo(() => {
    let queryParams = {};
    if (Object.keys(filterValues).length > 0) {
      queryParams = Object.fromEntries(Object.entries(filterValues).filter(([_, v]) => v));
    }
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

  const { data: regulations, isLoading } = useRegulations({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  const onDelete = (event, item) => {
    event.stopPropagation();
    setDeleteConfirmation({ open: true, id: item.id });
  };

  const onDeleteConfirmation = async () => {
    try {
      setLoading(true);
      await saveRegulations({
        args: { id: deleteConfirmation.id },
        options: {
          method: DELETE
        }
      });
      await queryClient.refetchQueries([API_REGULATIONS_URL]);
      toast(t('deleted.female', { entity: t('regulations', { count: 1 }) }));
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
      Header: t('shipment-items', { count: 1 }),
      accessor: 'shipmentItem',
      Cell: ({ row }) => row.original.shipmentItem.name
    },
    {
      Header: t('countries', { count: 1 }),
      accessor: 'country',
      Cell: ({ row }) => row.original.country.name
    },
    {
      Header: t('max-amount'),
      accessor: 'maxAmount',
      Cell: ({ value, row }) => `${value} ${row.original.shipmentItem.measureUnit.name}`
    },
    {
      Header: t('price-range'),
      Cell: ({ row }) =>
        row.original.minPrice || row.original.maxPrice ? (
          `${formatPrice(row.original.minPrice || 0)}${
            row.original.maxPrice ? ' - ' + formatPrice(row.original.maxPrice) : ''
          }`
        ) : (
          <p className="italic text-gray-400">{t('unregulated')}</p>
        )
    },
    {
      id: 'optionsRegulations',
      displayName: 'optionsRegulations',
      Cell: ({ row }) => (
        <TableActions
          onEdit={(event) => onUpdate(event, row.original)}
          onDelete={(event) => onDelete(event, row.original)}
        />
      )
    }
  ]);

  const parseFilterNames = (name) => {
    switch (name) {
      case 'maxAmount':
        return t('max-amount');
      case 'shipmentItem':
        return t('shipment-items', { count: 1 });
      default:
        return t('countries', { count: 1 });
    }
  };

  const FilterCriteria = () =>
    Object.keys(filterValues).map(
      (e) =>
        filterValues[e] &&
        filterValues[e] !== '' && (
          <div className="flex items-center px-4 py-1 mr-4 font-medium bg-gray-100 rounded-full w-max">
            <span key={filterValues[e]} className="font-medium">
              {`${parseFilterNames(e)}: `}
              <span className="font-normal">{filterValues[e]}</span>
            </span>
            <button type="button" id={filterValues[e]} onClick={() => onRemoveFilter(e)}>
              <XCircleIcon className="w-6 h-6 ml-2 float-center" />
            </button>
          </div>
        )
    );

  const handleFilter = (values) => {
    if (values.shipmentItem) values.shipmentItem = values?.shipmentItem.name;
    if (values.country) values.country = values?.country.name;
    if (values.measureUnit) values.measureUnit = values?.measureUnit.name;
    setFilterValues(values);
  };

  const onRemoveFilter = (value) => {
    setFilterValues(
      Object.keys(filterValues)
        .filter((key) => value != key)
        .reduce(
          (obj, key) => ({
            ...obj,
            [key]: filterValues[key]
          }),
          {}
        )
    );
  };

  const renderCreateButton = () => (
    <button type="button" className="btn-outlined" onClick={() => setOpenForm(true)}>
      {t('create', { entity: t('regulations', { count: 1 }) })}
    </button>
  );

  const options = {
    columns,
    data: regulations?.rows,
    count: regulations?.count,
    setPage: onPageChangeCallback,
    setSortBy: onSortChangeCallback,
    pageSize,
    onPageSizeChange: setPageSize,
    onRowClick: () => {},
    name: t('regulations', { count: 2 }),
    onFilter: (
      <div className={clsx('w-full px-6', openFilters && 'flex flex-col')}>
        <RegulationsFilter filters={filterValues} open={openFilters} onSubmit={handleFilter} />
        <div className="flex">
          <FilterCriteria />
        </div>
      </div>
    ),
    actions: (
      <div className="space-x-4">
        {/*
          <button
            type="button"
            className="px-8 py-2 text-lg font-medium bg-white border rounded-md w-max hover:bg-gray-100"
            onClick={() => setOpenFilters(!openFilters)}
          >
            {t('filter')}
          </button>
    */}
        {renderCreateButton()}
      </div>
    )
  };

  return (
    <>
      {isLoading || (loading && <Loading />)}

      {regulations && regulations?.rows.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('regulations', { count: 0 })}>{renderCreateButton()}</EmptyState>
      )}

      <RegulationsForm
        data={selectedItem}
        open={openForm}
        onOpen={setOpenForm}
        setLoading={setLoading}
      />

      <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        onOpen={setDeleteConfirmation}
        onDeleteConfirmation={onDeleteConfirmation}
        title={t('delete-title', { entity: t('regulations', { count: 1 }).toLowerCase() })}
        content={t('delete-message.female', {
          entity: t('regulations', { count: 1 }).toLowerCase()
        })}
      />
    </>
  );
};

RegulationsList.propTypes = {
  row: PropTypes.object.isRequired
};

export default RegulationsList;
