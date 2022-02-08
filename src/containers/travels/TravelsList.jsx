import DeleteConfirmationDialog from '@/components/common/DeleteConfirmationDialog';
import EmptyState from '@/components/common/EmptyState';
import Loading from '@/components/common/Loading';
import DataTable from '@/components/table';
import TableActions from '@/components/table/TableActions';
import PaymentFilter from '@/containers/travels/TravelsFilter';
import useTravels from '@/hooks/travel/useTravels';
import { TRAVEL_DETAILS_PAGE, TRAVEL_FORM_PAGE } from '@/lib/constants';
import { locales } from '@/lib/utils';
import { XCircleIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';

const TravelsList = ({ hiddenColumns, loading, userId }) => {
  const { t, lang } = useTranslation('common');
  const router = useRouter();
  // const [page, setPage] = useState(0);
  // const [size, setSize] = useState(20);
  const [openFilters, setOpenFilters] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null });

  const [filterValues, setFilterValues] = useState({
    paymentname: '',
    surname: '',
    name: '',
    phone: '',
    email: '',
    roles: ''
  });

  const params = useMemo(() => {
    if (userId) return { traveler: userId };
  }, []);

  const { data: travels } = useTravels({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  const locale = {
    ...locales[lang]
  };

  const onUpdate = (event, row) => {
    event.stopPropagation();
    const value = row.id;
    const path = TRAVEL_FORM_PAGE(`edit/${value}`);
    router.push(path);
  };

  const onDelete = (event, row) => {
    event.stopPropagation();
    setDeleteConfirmation({ open: true, id: row.original.login });
  };

  const onDeleteConfirmation = () => {
    // onDeleteUser(deleteConfirmation.id);
  };

  const formatTraveler = (value) => <div>{`${value?.firstName} ${value?.lastName}`}</div>;

  const formatFlight = (value) => <div>{value?.number}</div>;

  const formatPlace = (value) => <div>{value?.name}</div>;

  const formatDate = (value) => <div>{format(new Date(value), 'PPp', { locale })}</div>;

  const columns = React.useMemo(() => [
    {
      Header: t('travelers', { count: 1 }),
      accessor: 'traveler',
      Cell: ({ value }) => formatTraveler(value)
    },
    {
      Header: t('flights', { count: 1 }),
      accessor: 'flight',
      Cell: ({ value }) => formatFlight(value)
    },
    {
      Header: t('origin'),
      accessor: 'origin',
      Cell: ({ value }) => formatPlace(value)
    },
    {
      Header: t('departure-at'),
      accessor: 'departureAt',
      Cell: ({ value }) => formatDate(value)
    },
    {
      Header: t('destination'),
      accessor: 'destination',
      Cell: ({ value }) => formatPlace(value)
    },
    {
      id: 'optionsRegulations',
      displayName: 'optionsRegulations',
      Cell: ({ row }) => (
        <TableActions
          onEdit={(event) => onUpdate(event, row.original)}
          onDelete={() => onDelete(event, row.original)}
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

  const renderCreateButton = () => (
    <button
      type="button"
      className="btn-outlined"
      onClick={() => router.push('travels/create/new')}
    >
      {t('new', { entity: t('travels', { count: 1 }) })}
    </button>
  );

  const options = {
    columns,
    data: travels?.rows,
    onRowClick: (row) => {
      const value = row.original.id;
      const path = TRAVEL_DETAILS_PAGE(value);
      router.push(path);
    },
    hiddenColumns,
    onFilter: (
      <div className={`w-full px-6 ${openFilters && 'flex flex-col'}`}>
        <div className="mb-4">
          <PaymentFilter open={openFilters} onSubmit={handleFilters} />
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

      {travels && travels.rows.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('travels', { count: 0 })}>{renderCreateButton()}</EmptyState>
      )}

      <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        onOpen={setDeleteConfirmation}
        onDeleteConfirmation={onDeleteConfirmation}
        title={t('delete-title', { entity: t('travels', { count: 1 }).toLowerCase() })}
        content={t('delete-message.male', { entity: t('travels', { count: 1 }).toLowerCase() })}
      />
    </>
  );
};

TravelsList.propTypes = {
  row: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onGetTravels: PropTypes.func.isRequired,
  onSelectPayment: PropTypes.func.isRequired,
  onDeletePayment: PropTypes.func.isRequired
};

export default TravelsList;
