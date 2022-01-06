/* eslint-disable react/display-name */
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { TrashIcon, PencilIcon, XCircleIcon } from '@heroicons/react/outline';
import DataTable from '@/components/table';
import RegulationsFilter from 'containers/regulations/RegulationsFilter';
import { PAYMENT_DETAIL_PAGE, PAYMENT_ADD, PAYMENT_EDIT } from 'lib/constants';
import Loading from 'components/common/Loading';
import EmptyState from '../../components/common/EmptyState';
import DeleteConfirmationDialog from '../../components/common/DeleteConfirmationDialog';
import useRegulations from '../../hooks/regulation/useRegulations';
import RegulationsFormDialogWrapper from '../../components/form/FormDialogWrapper';

const RegulationsList = ({ loading, onDeletePayment }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  // const [page, setPage] = useState(0);
  // const [size, setSize] = useState(20);
  const [openFilters, setOpenFilters] = useState(false);
  const [openForm, setOpenForm] = useState(false);
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

  const { data: regulations } = useRegulations({
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
    const value = row.original.email;
    const path = PAYMENT_EDIT(value);
    onSelectPayment(row.original);
    router.push(path);
  };

  const handleAdd = () => {
    router.push(PAYMENT_ADD);
  };

  const renderRoles = (roles) => (
    <div className="flex space-x-2">
      {roles?.map((role) => (
        <span
          key={role}
          className="inline-flex px-4 py-1 font-medium leading-5 text-green-700 rounded-full bg-green-50"
        >
          {t(role.replace(/_/g, '-').toLowerCase())}
        </span>
      ))}
    </div>
  );

  const columns = React.useMemo(() => [
    {
      Header: t('countries', { count: 1 }),
      accessor: 'country',
      Cell: ({ cell }) => <div>{cell.row.original.country.name}</div>
    },
    {
      Header: t('max-amount'),
      accessor: 'maxAmount'
    },
    {
      Header: t('shipment-items', { count: 1 }),
      accessor: 'shipmentItem',
      Cell: ({ cell }) => <div>{cell.row.original.shipmentItem.name}</div>
    },
    {
      id: 'optionsRegulations',
      displayName: 'optionsRegulations',
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
    setFilterValues(values, onGetRegulations(values));
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
    onGetRegulations(updatedFilters);
    setFilterValues((prevState) => ({ ...prevState, [value]: '' }));
  };

  const options = {
    columns,
    data: regulations,
    handleRowClick: (row) => {
      const value = row.original.email;
      const path = PAYMENT_DETAIL_PAGE(value);
      onSelectPayment(row.original);
      router.push(path);
    },
    onFilter: (
      <div className={`w-full px-6 py-4 ${openFilters && 'flex flex-col'}`}>
        <div className="mb-4">
          <RegulationsFilter open={openFilters} onSubmit={handleFilters} />
        </div>
        <div className="flex">
          <FilterCriteria />
        </div>
      </div>
    ),
    actions: (
      <div className="space-x-2">
        <button
          type="button"
          className="px-6 py-2 font-medium bg-white border rounded-md w-max hover:bg-gray-100"
          onClick={() => setOpenFilters(!openFilters)}
        >
          {t('filter')}
        </button>
        <button
          type="button"
          className="px-6 py-2 font-medium bg-white border rounded-md border-primary-600 text-primary-600 w-max hover:bg-gray-100"
          onClick={() => setOpenForm(true)}
        >
          {t('new', { entity: t('regulations', { count: 1 }) })}
        </button>
      </div>
    )
  };

  return (
    <>
      {loading && <Loading />}

      {regulations ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('regulations', { count: 0 })}>
          <button
            type="button"
            className="px-4 py-2 my-8 text-lg text-white rounded-md bg-secondary-500"
            onClick={() => router.push('regulations/create')}
          >
            Nueva regulación
          </button>
        </EmptyState>
      )}

      <RegulationsFormDialogWrapper open={openForm} onOpen={setOpenForm} />
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
