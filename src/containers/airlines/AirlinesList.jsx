/* eslint-disable react/display-name */
import DeleteConfirmationDialog from '@/components/common/DeleteConfirmationDialog';
import EmptyState from '@/components/common/EmptyState';
import DataTable from '@/components/table';
import TableActions from '@/components/table/TableActions';
import useAirlines from '@/hooks/airline/useAirlines';
import { XCircleIcon } from '@heroicons/react/outline';
import Loading from 'components/common/Loading';
import PaymentFilter from 'containers/airlines/AirlinesFilter';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import AirlinesForm from './AirlinesForm';

const AirlinesList = ({ loading, onDeletePayment }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  // const [page, setPage] = useState(0);
  // const [size, setSize] = useState(20);
  const [openFilters, setOpenFilters] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [openDeleteConfirmation, setOpenDeleteConfirmation] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [filterValues, setFilterValues] = useState({
    name: ''
  });

  const params = useMemo(() => {
    return {};
  }, []);

  const { data: airlines } = useAirlines({
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
          onDelete={() => setOpenDeleteConfirmation(true)}
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
    name: t('airlines', { count: 2 }),
    onRowClick: (row) => {},
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

      <AirlinesForm data={selectedItem} open={openForm} onOpen={setOpenForm} />

      <DeleteConfirmationDialog
        open={openDeleteConfirmation}
        onOpen={setOpenDeleteConfirmation}
        title={t('delete', { entity: 'user' })}
        content={t('asd')}
      />
    </>
  );
};

AirlinesList.propTypes = {
  row: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onGetAirlines: PropTypes.func.isRequired,
  onSelectPayment: PropTypes.func.isRequired,
  onDeletePayment: PropTypes.func.isRequired
};

export default AirlinesList;
