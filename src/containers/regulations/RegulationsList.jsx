/* eslint-disable react/display-name */
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useTranslation from 'next-translate/useTranslation';
import { XCircleIcon } from '@heroicons/react/outline';
import DataTable from '@/components/table';
import RegulationsFilter from 'containers/regulations/RegulationsFilter';
import Loading from 'components/common/Loading';
import EmptyState from '@/components/common/EmptyState';
import DeleteConfirmationDialog from '@/components/common/DeleteConfirmationDialog';
import useRegulations from '@/hooks/regulation/useRegulations';
import RegulationsForm from './RegulationsForm';
import TableActions from '@/components/table/TableActions';
import { formatPrice } from '@/lib/utils';

const RegulationsList = ({ loading, onDeletePayment }) => {
  const { t } = useTranslation('common');
  // const [page, setPage] = useState(0);
  // const [size, setSize] = useState(20);
  const [openForm, setOpenForm] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [openFilters, setOpenFilters] = useState(false);
  const [filterValues, setFilterValues] = useState({});

  const params = useMemo(() => {
    return Object.fromEntries(Object.entries(filterValues).filter(([_, v]) => v));
  }, [filterValues]);

  const { data: regulations } = useRegulations({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  const onDelete = (event, row) => {
    event.preventDefault();
    const answer = window.confirm(t('message.payment-delete') + ' ' + row.original.paymentname);
    if (answer) {
      onDeletePayment(row.original.paymentname);
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
          onDelete={() => setOpenDeleteConfirmation(true)}
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
      {t('new', { entity: t('regulations', { count: 1 }) })}
    </button>
  );

  const options = {
    columns,
    data: regulations?.rows,
    handleRowClick: (row) => {
      const value = row.original.email;
    },
    onFilter: (
      <div className={`w-full px-6 py-4 ${openFilters && 'flex flex-col'}`}>
        <div className="mb-4">
          <RegulationsFilter filters={filterValues} open={openFilters} onSubmit={handleFilter} />
        </div>
        <div className="flex">
          <FilterCriteria />
        </div>
      </div>
    ),
    actions: (
      <div className="space-x-4">
        <button
          type="button"
          className="px-6 py-2 font-medium bg-white border rounded-md w-max hover:bg-gray-100"
          onClick={() => setOpenFilters(!openFilters)}
        >
          {t('filter')}
        </button>
        {renderCreateButton()}
      </div>
    )
  };

  return (
    <>
      {loading && <Loading />}

      {regulations && regulations?.rows.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('regulations', { count: 0 })}>{renderCreateButton()}</EmptyState>
      )}

      <RegulationsForm data={selectedItem} open={openForm} onOpen={setOpenForm} />

      <DeleteConfirmationDialog
        open={openDeleteConfirmation}
        onOpen={setOpenDeleteConfirmation}
        title={t('delete', { entity: 'user' })}
        content={t('asd')}
      />
    </>
  );
};

RegulationsList.propTypes = {
  row: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onGetRegulations: PropTypes.func.isRequired,
  onSelectPayment: PropTypes.func.isRequired,
  onDeletePayment: PropTypes.func.isRequired
};

export default RegulationsList;
