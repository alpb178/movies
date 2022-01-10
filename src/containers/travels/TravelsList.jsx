/* eslint-disable react/display-name */
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { TrashIcon, PencilIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/outline';
import DataTable from '@/components/table';
import Loading from '@/components/common/Loading';
import EmptyState from '@/components/common/EmptyState';
import DeleteConfirmationDialog from '@/components/common/DeleteConfirmationDialog';
import PaymentFilter from '@/containers/travels/TravelsFilter';
import useTravels from '@/hooks/travel/useTravels';
import { PAYMENT_EDIT, TRAVEL_DETAILS_PAGE } from '@/lib/constants';
import { format } from 'date-fns';
import { enGB, es } from 'date-fns/locale';

const locales = { es, en: enGB };

const TravelsList = ({ loading, onDeletePayment }) => {
  const { t, lang } = useTranslation('common');
  const router = useRouter();
  // const [page, setPage] = useState(0);
  // const [size, setSize] = useState(20);
  const [openFilters, setOpenFilters] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);

  const [filterValues, setFilterValues] = useState({
    paymentname: '',
    surname: '',
    name: '',
    phone: '',
    email: '',
    roles: ''
  });

  const params = useMemo(() => {
    return {};
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

  const handleEdit = (event, row) => {
    event.stopPropagation();
    const value = row.original.email;
    const path = PAYMENT_EDIT(value);
    onSelectPayment(row.original);
    router.push(path);
  };

  
  const formatTraveler = (value) => <div>{value?.internalUser?.name}</div>;

  const formatFlight = (value) => <div>{value.number}</div>;

  const formatPlace = (value) => <div>{value.name}</div>;

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
    setFilterValues(values, onGetTravels(values));
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
    onGetTravels(updatedFilters);
    setFilterValues((prevState) => ({ ...prevState, [value]: '' }));
  };

  const options = {
    columns,
    data: travels,
    handleRowClick: (row) => {
      const value = row.original.id;
      const path = TRAVEL_DETAILS_PAGE(value);
      router.push(path);
    },
    onFilter: (
      <div className={`w-full px-6 py-4 ${openFilters && 'flex flex-col'}`}>
        <div className="mb-4">
          <PaymentFilter open={openFilters} onSubmit={handleFilters} />
        </div>
        <div className="flex">
          <FilterCriteria />
        </div>
      </div>
    ),
    actions: (
      <>
        <button
          type="button"
          className="px-6 py-2 font-medium bg-white border rounded-md w-max hover:bg-gray-100"
          onClick={() => setOpenFilters(!openFilters)}
        >
          {t('filter')}
        </button>
      </>
    )
  };

  return (
    <>
      {loading && <Loading />}

      {travels ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('travels', { count: 0 })}>
          <button
            type="button"
            className="px-4 py-2 my-8 text-lg text-white rounded-md bg-secondary-500"
            onClick={() => router.push('travels/create')}
          >
            Nueva regulación
          </button>
        </EmptyState>
      )}

      <DeleteConfirmationDialog
        open={openDeleteConfirmation}
        onOpen={setOpenDeleteConfirmation}
        title={t('delete', { entity: 'user' })}
        content={t('asd')}
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
