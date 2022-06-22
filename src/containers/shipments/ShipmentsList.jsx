/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import EmptyState from '@/components/common/EmptyState';
import Loading from '@/components/common/Loader';
import DeleteConfirmationDialog from '@/components/dialog/DeleteConfirmationDialog';
import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import DataTable from '@/components/table';
import TableActions from '@/components/table/TableActions';
import PaymentFilter from '@/containers/shipments/ShipmentsFilter';
import useShipments from '@/hooks/shipment/useShipments';
import { XCircleIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { useMemo, useState } from 'react';
import ShipmentsForm from './ShipmentsForm';

const ShipmentsList = () => {
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

  const handleDelete = (event, row) => {};

  const onUpdate = (event) => {
    event.stopPropagation();
  };

  const locale = {
    //...locales[lang]
  };

  const rednerMeasureUnit = (value) => <div>{value?.name}</div>;

  const columns = useMemo(() => [
    {
      Header: t('travelers', { count: 1 }),
      accessor: 'traveler'
      //  Cell: ({ value }) => formatTraveler(value)
    },
    {
      Header: t('flights', { count: 1 }),
      accessor: 'flight'
      //  Cell: ({ value }) => formatFlight(value)
    },
    {
      Header: t('origin'),
      accessor: 'origin'
      // Cell: ({ value }) => formatPlace(value)
    },
    {
      Header: t('departure-at'),
      accessor: 'departureAt'
      // Cell: ({ value }) => formatDate(value)
    },
    {
      Header: t('destination'),
      accessor: 'destination'
      //  Cell: ({ value }) => formatPlace(value)
    },
    {
      Header: t('objeto'),
      accessor: 'objeto'
      // Cell: ({ value }) => formatPlace(value)
    },
    {
      id: 'optionsRegulations',
      displayName: 'optionsRegulations',
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
    <button type="button" className="btn-contained" onClick={() => router.push('shipments/create')}>
      {t('create', { entity: t('shipments', { count: 1 }).toLowerCase() })}
    </button>
  );

  const options = {
    columns,
    data: shipments?.rows,
    name: t('shipments', { count: 2 }),
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
      {<Loading />}

      {shipments && shipments.rows.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('shipments', { count: 0 })}>{renderInsertButton()}</EmptyState>
      )}

      <FormDialogWrapper open={openForm} onOpen={setOpenForm}>
        <ShipmentsForm />
      </FormDialogWrapper>

      {console.log(shipments)}

      <DeleteConfirmationDialog
        open={openDeleteConfirmation}
        onOpen={setOpenDeleteConfirmation}
        title={t('delete', { entity: 'user' })}
        content={t('asd')}
      />
    </>
  );
};

ShipmentsList.propTypes = {};

export default ShipmentsList;
