/* eslint-disable react/react-in-jsx-scope */
import EmptyState from '@/components/common/EmptyState';
import Loading from '@/components/common/Loader';
import DataTable from '@/components/table';
import PaymentFilter from '@/containers/travels/TravelsFilter';
import useTravels from '@/hooks/travel/useTravels';
import { DEFAULT_PAGE_SIZE, TRAVEL_DETAILS_PAGE } from '@/lib/constants';
import { locales, lottieOptions } from '@/lib/utils';
import { XCircleIcon } from '@heroicons/react/outline';
import { format } from 'date-fns';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import Lottie from 'react-lottie';

const TravelsList = ({ hiddenColumns, userId }) => {
  const { t, lang } = useTranslation('common');
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sort, setSort] = useState('');
  const onPageChangeCallback = useCallback(setPage, []);
  const onSortChangeCallback = useCallback(setSort, []);
  const [openFilters] = useState(false);
  // const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null });
  //const [loading, setLoading] = useState(false);
  // const queryClient = useQueryClient();

  const [filterValues, setFilterValues] = useState({
    paymentname: '',
    surname: '',
    name: '',
    phone: '',
    email: '',
    roles: ''
  });

  const params = useMemo(() => {
    const query = {};
    if (userId) return { traveler: userId };
    if (page !== 0) query.page = page;
    if (sort) query.sort = sort;
    return query;
  }, [filterValues, page, sort]);

  const { data: travels, isLoading } = useTravels({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  const locale = {
    ...locales[lang]
  };

  /*

  const onUpdate = (event, row) => {
    event.stopPropagation();
    const value = row.id;
    const path = TRAVEL_FORM_PAGE(`edit/${value}`);
    router.push(path);
  };

  const handleDelete = (event, row) => {
    event.stopPropagation();
    setDeleteConfirmation({ open: true, id: row.original.id });
  };

  const onDeleteConfirmation = async () => {
    try {
      setLoading(true);
      await saveTravels({
        args: { id: deleteConfirmation.id },
        options: {
          method: DELETE
        }
      });
      await queryClient.refetchQueries([API_TRAVELS_URL]);
      toast(t('deleted.male', { entity: t('travels', { count: 1 }) }));
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };


  const onViewDetails = (event, row) => {
    event.stopPropagation();
    const value = row.id;
    const path = TRAVEL_DETAILS_PAGE(value);
    router.push(path);
  };
  */

  const formatTraveler = (value) => <div>{`${value?.firstName} ${value?.lastName}`}</div>;

  const formatFlight = (value) => {
    return <div>{`${value?.airline?.name} - ${value?.number}`}</div>;
  };

  const formatPlace = (value) => {
    const travelSelected = travels?.rows.find((element) => element?.id === value);
    return <div>{`${travelSelected?.origin.name} - ${travelSelected?.destination.name}`}</div>;
  };

  const formatDate = (value) => <div>{format(new Date(value), 'PP', { locale })}</div>;

  const columns = useMemo(() => [
    {
      Header: t('travelers', { count: 1 }),
      accessor: 'traveler',
      Cell: ({ value }) => formatTraveler(value)
    },
    {
      Header: `${t('airlines', { count: 1 })}  -  ${t('flights', { count: 1 })}`,
      accessor: 'flight',
      Cell: ({ value }) => formatFlight(value)
    },
    {
      Header: `${t('origin')} - ${t('destination')}`,
      accessor: 'id',
      Cell: ({ value }) => formatPlace(value)
    },
    {
      Header: t('departure-at'),
      accessor: 'departureAt',
      Cell: ({ value }) => formatDate(value)
    },
    {
      id: 'optionsRegulations',
      displayName: 'optionsRegulations'
      /* Cell: ({ row }) => (
        <TableActions
       onEdit={(event) => onUpdate(event, row.original)}
          onDelete={(event) => handleDelete(event, row)}
          onViewDetails={(event) => onViewDetails(event, row)}
        />
      )*/
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

  const options = {
    name: t('travels', { count: 2 }),
    columns,
    data: travels?.rows,
    count: travels?.count,
    setPage: onPageChangeCallback,
    setSortBy: onSortChangeCallback,
    pageSize,
    onPageSizeChange: setPageSize,
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
        {/*<button
          type="button"
          className="px-6 py-2 font-medium bg-white border rounded-md w-max hover:bg-gray-100"
          onClick={() => setOpenFilters(!openFilters)}
        >
          {t('filter')}
    </button>*/}
        {/*renderCreateButton()*/}
      </div>
    )
  };

  /* const renderCreateButton = () => (
    <button
      type="button"
      className="btn-contained"
      onClick={() => router.push('travels/create/new')}
    >
      {t('create', { entity: t('travels', { count: 1 }).toLowerCase() })}
    </button>
  );*/

  return (
    <>
      {isLoading && <Loading />}

      {travels && travels.rows.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('travels', { count: 0 })}>
          <div className="flex items-center justify-center h-64 w-max">
            <Lottie options={lottieOptions('travels')} />
          </div>
        </EmptyState>
      )}

      {/*<DeleteConfirmationDialog
        open={deleteConfirmation.open}
        onOpen={setDeleteConfirmation}
        onDeleteConfirmation={onDeleteConfirmation}
        title={t('delete-title', { entity: t('travels', { count: 1 }) })}
        content={t('delete-message.male', { entity: t('travels', { count: 1 }) })}
      />*/}
    </>
  );
};

TravelsList.propTypes = {
  row: PropTypes.object.isRequired,
  hiddenColumns: PropTypes.object.isRequired,
  userId: PropTypes.object.isRequired
};

export default TravelsList;
