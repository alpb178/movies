import DeleteConfirmationDialog from '@/components/common/DeleteConfirmationDialog';
import EmptyState from '@/components/common/EmptyState';
import Loading from '@/components/common/Loading';
import DataTable from '@/components/table';
import TableActions from '@/components/table/TableActions';
import PaymentFilter from '@/containers/shipment-items/ShipmentItemsFilter';
import useShipmentItems from '@/hooks/shipment-item/useShipmentItems';
import { API_SHIPMENT_ITEMS_URL, DEFAULT_PAGE_SIZE, DELETE } from '@/lib/constants';
import { XCircleIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import ShipmentItemsForm from './ShipmentItemsForm';

const ShipmentItemsList = () => {
  const { t } = useTranslation('common');

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sort, setSort] = useState('');
  const onPageChangeCallback = useCallback(setPage, []);
  const onSortChangeCallback = useCallback(setSort, []);
  const [openFilters, setOpenFilters] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null });
  const [selectedItem, setSelectedItem] = useState();

  const [filterValues, setFilterValues] = useState({
    measureUnit: ''
  });
  useEffect(() => {
    if (!openForm) {
      setSelectedItem(null);
    }
  }, [openForm]);

  const params = useMemo(() => {
    const query = {};
    if (page !== 0) query.page = page;
    if (sort) query.sort = sort;
    return query;
  }, [filterValues, page, sort]);

  const { data: shipmentItems } = useShipmentItems({
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
      await useShipmentItems({
        args: { id: deleteConfirmation.id },
        options: {
          method: DELETE
        }
      });
      toast(t('deleted.male', { entity: t('shipment-items', { count: 1 }) }));
      queryClient.refetchQueries([API_SHIPMENT_ITEMS_URL]);
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

  const rednerMeasureUnit = (value) => <div>{value?.name}</div>;

  const columns = React.useMemo(() => [
    {
      Header: t('name'),
      accessor: 'name'
    },
    {
      Header: t('measure-units', { count: 1 }),
      accessor: 'measureUnit',
      Cell: ({ value }) => rednerMeasureUnit(value)
    },
    {
      id: 'optionsShipmentItems',
      displayName: 'optionsShipmentItems',
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
      Nuevo artículo
    </button>
  );

  const options = {
    name: t('shipment-items', { count: 2 }),
    columns,
    data: shipmentItems?.rows,
    count: shipmentItems?.count,
    setPage: onPageChangeCallback,
    setSortBy: onSortChangeCallback,
    pageSize,
    onPageSizeChange: setPageSize,
    onRowClick: (row) => {},
    onFilter: (
      <div className={clsx('w-full px-6', openFilters && 'flex flex-col')}>
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

      {shipmentItems && shipmentItems.rows.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('shipment-items', { count: 0 })}>{renderInsertButton()}</EmptyState>
      )}

      <ShipmentItemsForm
        data={selectedItem}
        open={openForm}
        onOpen={setOpenForm}
        setLoading={setLoading}
      />

      <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        onOpen={setDeleteConfirmation}
        onDeleteConfirmation={onDeleteConfirmation}
        title={t('delete-title', { entity: t('shipment-items', { count: 1 }) })}
        content={t('delete-message.male', { entity: t('shipment-items', { count: 1 }) })}
      />
    </>
  );
};

ShipmentItemsList.propTypes = {
  row: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default ShipmentItemsList;
