/* eslint-disable react/display-name */
import DeleteConfirmationDialog from '@/components/common/DeleteConfirmationDialog';
import EmptyState from '@/components/common/EmptyState';
import Loading from '@/components/common/Loading';
import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import DataTable from '@/components/table';
import PaymentFilter from '@/containers/shipments/ShipmentsFilter';
import useShipments from '@/hooks/shipment/useShipments';
import { PAYMENT_DETAIL_PAGE } from '@/lib/constants';
import { PencilIcon, TrashIcon, XCircleIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import ShipmentsForm from './ShipmentsForm';

const ShipmentsList = ({ loading, onDeletePayment }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  // const [page, setPage] = useState(0);
  // const [size, setSize] = useState(20);
  const [openFilters, setOpenFilters] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const [filterValues, setFilterValues] = useState({
    measureUnit: ''
  });

  const params = useMemo(() => {
    return {};
  }, []);

  const { data: shipments } = useShipments({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  const handleDelete = (event, row) => {
    event.preventDefault();
    const answer = window.confirm(t('message.payment-delete') + ' ' + row.original.paymentname);
    if (answer) {
      onDeletePayment(row.original.paymentname);
    }
  };

  const handleEdit = (event, row) => {
    event.stopPropagation();
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
      id: 'optionsShipments',
      displayName: 'optionsShipments',
      Cell: ({ row }) => {
        return (
          <div className="flex items-center space-x-4">
            <button
              className="p-1 rounded-full hover:bg-blue-100 hover:text-blue-500"
              type="button"
              id="buttonEdit"
              onClick={(event) => handleEdit(event, row)}
            >
              <PencilIcon className="w-6 h-6" />
            </button>
            <button
              className="p-1 rounded-full hover:bg-red-100 hover:text-red-500"
              type="button"
              id="buttonDelete"
              onClick={() => setOpenDeleteConfirmation(true)}
            >
              <TrashIcon className="w-6 h-6" />
            </button>
          </div>
        );
      }
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
    <button type="button" className="btn-outlined" onClick={() => router.push('shipments/create')}>
      {t('add', { entity: t('shipments', { count: 1 }) })}
    </button>
  );

  const options = {
    columns,
    data: shipments?.rows,
    name: t('shipments', { count: 2 }),
    handleRowClick: (row) => {
      const value = row.original.email;
      const path = PAYMENT_DETAIL_PAGE(value);
      onSelectPayment(row.original);
      router.push(path);
    },
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

      {shipments && shipments.rows.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('shipments', { count: 0 })}>{renderInsertButton()}</EmptyState>
      )}

      <FormDialogWrapper open={openForm} onOpen={setOpenForm}>
        <ShipmentsForm />
      </FormDialogWrapper>

      <DeleteConfirmationDialog
        open={openDeleteConfirmation}
        onOpen={setOpenDeleteConfirmation}
        title={t('delete', { entity: 'user' })}
        content={t('asd')}
      />
    </>
  );
};

ShipmentsList.propTypes = {
  row: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onGetShipments: PropTypes.func.isRequired,
  onSelectPayment: PropTypes.func.isRequired,
  onDeletePayment: PropTypes.func.isRequired
};

export default ShipmentsList;
