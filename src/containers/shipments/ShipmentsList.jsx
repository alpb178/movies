/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import EmptyState from '@/components/common/EmptyState';
import Loading from '@/components/common/Loader';
import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import DataTable from '@/components/table';
import TableActions from '@/components/table/TableActions';
import PaymentFilter from '@/containers/shipments/ShipmentsFilter';
import useShipmentItems from '@/hooks/shipment-item/useShipmentItems';
import useShipments from '@/hooks/shipment/useShipments';
import useTravels from '@/hooks/travel/useTravels';
import { DEFAULT_PAGE_SIZE, SHIPMENTS_DETAILS_PAGE, SHIPMENTS_FORM_PAGE } from '@/lib/constants';
import { locales } from '@/lib/utils';
import { XCircleIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import ShipmentsForm from './ShipmentsForm';

const ShipmentsList = () => {
  const { t, lang } = useTranslation('common');
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sort, setSort] = useState('');
  const onPageChangeCallback = useCallback(setPage, []);
  const onSortChangeCallback = useCallback(setSort, []);
  const [loading, setLoading] = useState(isLoading);
  const [openFilters, setOpenFilters] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  // const queryClient = useQueryClient();
  // const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null });

  const [filterValues, setFilterValues] = useState({
    measureUnit: ''
  });

  const params = useMemo(() => {
    const query = {};
    if (page !== 0) query.page = page;
    if (sort) query.sort = sort;
    return query;
  }, [filterValues, page, sort]);

  const locale = {
    ...locales[lang]
  };

  const { data: travel } = useTravels({
    options: {
      keepPreviousData: true
    }
  });

  const { data: shipmentItem } = useShipmentItems({
    options: {
      keepPreviousData: true
    }
  });

  const { data: shipments, isLoading } = useShipments({
    args: params,
    options: {
      keepPreviousData: true,
      enabled: !!travel && !!shipmentItem
    }
  });

  useMemo(async () => {
    {
      shipments?.rows?.map((item) => {
        const travelSelected = travel?.rows.find((element) => element?.id === item.travelId);
        item.traveler = `${travelSelected?.traveler?.firstName} ${travelSelected?.traveler?.lastName}`;
        item.origin = `${travelSelected?.origin?.code}-${travelSelected?.destination?.code}`;
        item.flight = `${travelSelected?.flight?.number}-${travelSelected?.destination?.code}`;
        item.departureAtTravel = travelSelected?.departureAt;
      });
    }
  }, [shipments]);

  /*

  const handleDelete = (event, row) => {
    event.stopPropagation();
    setDeleteConfirmation({ open: true, id: row.original.id });
  };

  const onDeleteConfirmation = async () => {
    try {
      setLoading(true);
      await saveShipments({
        args: { id: deleteConfirmation.id },
        options: {
          method: DELETE
        }
      });
      await queryClient.refetchQueries([API_SHIPMENTS_URL]);
      toast(t('deleted.male', { entity: t('travels', { count: 1 }) }));
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = (event, row) => {
    event.stopPropagation();
    const value = row.id;
    const path = SHIPMENTS_FORM_PAGE(`edit/${value}`);
    router.push(path);
  };*/

  const formatDate = (value) => <div>{format(new Date(value), 'PPp', { locale })}</div>;

  const formatShipmentItem = (value) => {
    const shipmentItemSelected = shipmentItem?.rows.find((element) => element?.id === value);

    return <div>{shipmentItemSelected?.name}</div>;
  };

  const columns = useMemo(() => [
    {
      Header: t('travelers', { count: 1 }),
      accessor: 'traveler'
    },
    {
      Header: t('flights', { count: 1 }),
      accessor: 'flight'
    },
    {
      Header: `${t('origin')} - ${t('destination')}`,
      accessor: 'origin'
    },
    {
      Header: t('departure-at'),
      accessor: 'departureAtTravel',
      Cell: ({ value }) => formatDate(value)
    },
    {
      Header: `${t('shipment-items', { count: 1 })}`,
      accessor: 'shipmentItemId',
      Cell: ({ value }) => formatShipmentItem(value)
    },
    {
      Header: t('status'),
      accessor: 'status'
    },
    {
      id: 'optionsShipments',
      displayName: 'optionsShipments',
      Cell: ({ row }) => (
        <TableActions
          /*  onEdit={(event) => onUpdate(event, row.original)}
          onDelete={(event) => handleDelete(event, row)}*/
          onViewDetails={(event) => onViewDetails(event, row)}
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

  /* const renderInsertButton = () => (
    <button type="button" className="btn-contained" onClick={() => router.push('shipments/create')}>
      {t('create', { entity: t('shipments', { count: 1 }).toLowerCase() })}
    </button>
  );*/

  const onViewDetails = (event, row) => {
    event.stopPropagation();
    const value = row.id;
    const path = SHIPMENTS_FORM_PAGE(`edit/${value}`);
    router.push(path);
  };

  const options = {
    name: t('shipments', { count: 2 }),
    columns,
    data: shipments?.rows,
    count: shipments?.count,
    setPage: onPageChangeCallback,
    setSortBy: onSortChangeCallback,
    pageSize,
    onPageSizeChange: setPageSize,
    onRowClick: (row) => {
      const value = row.original.id;
      const path = SHIPMENTS_DETAILS_PAGE(value);
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
        {/*  <button
          type="button"
          className="px-8 py-2 text-lg font-medium bg-white border rounded-md w-max hover:bg-gray-100"
          onClick={() => setOpenFilters(!openFilters)}
        >
          {t('filter')}
        </button>
       renderInsertButton()*/}
      </div>
    )
  };

  return (
    <>
      {loading && <Loading />}

      {shipments && shipments.rows.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('shipments', { count: 0 })}>{/*renderInsertButton()*/}</EmptyState>
      )}

      <FormDialogWrapper open={openForm} onOpen={setOpenForm}>
        <ShipmentsForm setLoading={setLoading} />
      </FormDialogWrapper>
      {/* <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        onOpen={setDeleteConfirmation}
        onDeleteConfirmation={onDeleteConfirmation}
        title={t('delete-title', { entity: t('shipments', { count: 1 }) })}
        content={t('delete-message.male', { entity: t('shipments', { count: 1 }) })}
      />*/}
    </>
  );
};

ShipmentsList.propTypes = {
  row: PropTypes.object.isRequired,
  hiddenColumns: PropTypes.object.isRequired,
  userId: PropTypes.object.isRequired
};

export default ShipmentsList;
