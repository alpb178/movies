/* eslint-disable react/display-name */
import DataTable from '@/components/table';
import { CheckCircleIcon, PencilIcon, TrashIcon, XCircleIcon } from '@heroicons/react/outline';
import Loading from 'components/common/Loading';
import PaymentFilter from 'containers/payments/PaymentsFilter';
import { PAYMENT_ADD, PAYMENT_DETAIL_PAGE, PAYMENT_EDIT } from 'lib/constants';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { deletePayment, getPayments, selectPayment } from 'redux/actions';
import DeleteConfirmationDialog from '../../components/common/DeleteConfirmationDialog';
import EmptyState from '../../components/common/EmptyState';

const PaymentsList = ({ data, loading, onGetPayments, onSelectPayment, onDeletePayment }) => {
  const { t } = useTranslation('common');
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

  useEffect(() => {
    onGetPayments();
  }, []);

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

  const renderStatus = (clientNumber) =>
    clientNumber ? (
      <CheckCircleIcon className="w-6 h-6 text-green-700" />
    ) : (
      <XCircleIcon className="w-6 h-6 text-red-600" />
    );

  const columns = React.useMemo(() => [
    {
      Header: t('paymentname'),
      accessor: 'login'
    },
    {
      Header: t('name'),
      accessor: 'firstName'
    },
    {
      Header: t('surname'),
      accessor: 'lastName'
    },
    {
      Header: t('email'),
      accessor: 'email'
    },
    {
      Header: t('status'),
      accessor: 'activated',
      Cell: ({ cell }) => renderStatus(cell.row.original['activated'])
    },
    {
      Header: t('roles'),
      accessor: 'authorities',
      Cell: ({ value: roles }) => renderRoles(roles)
    },
    {
      id: 'optionsPayments',
      displayName: 'optionsPayments',
      Cell: ({ row }) => {
        return (
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="p-1 rounded-full hover:bg-blue-100 hover:text-blue-500"
              id="buttonEdit"
              onClick={(event) => handleEdit(event, row)}
            >
              <PencilIcon className="w-6 h-6" />
            </button>
            <button
              type="button"
              className="p-1 rounded-full hover:bg-red-100 hover:text-red-500"
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
    setFilterValues(values, onGetPayments(values));
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
    onGetPayments(updatedFilters);
    setFilterValues((prevState) => ({ ...prevState, [value]: '' }));
  };

  const options = {
    columns,
    data: data?.toJS(),
    onRowClick: (row) => {
      const value = row.original.email;
      const path = PAYMENT_DETAIL_PAGE(value);
      onSelectPayment(row.original);
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

      {!data.isEmpty() ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('payments', { count: 0 })} />
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

PaymentsList.propTypes = {
  row: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onGetPayments: PropTypes.func.isRequired,
  onSelectPayment: PropTypes.func.isRequired,
  onDeletePayment: PropTypes.func.isRequired
};

const paymentReducer = 'payment';

const mapStateToProps = (state) => ({
  loading: state.getIn([paymentReducer, 'loading']),
  data: state.getIn([paymentReducer, 'data']),
  filters: state.getIn([paymentReducer, 'filters']),
  total: state.getIn([paymentReducer, 'total'])
});

const mapDispatchToProps = (dispatch) => ({
  onGetPayments: () => dispatch(getPayments()),
  onSelectPayment: (payment) => dispatch(selectPayment(payment)),
  onDeletePayment: (paymentname) => dispatch(deletePayment(paymentname))
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsList);
