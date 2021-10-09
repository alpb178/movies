/* eslint-disable react/display-name */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { connect } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import { TrashIcon, PencilIcon, XCircleIcon, CheckCircleIcon } from '@heroicons/react/outline';
import DataTable from 'components/table';
import UserFilter from 'containers/users/UserFilter';
import { getPayments, selectUser, deleteUser } from 'redux/actions';
import { USER_DETAIL_PAGE, USER_ADD, USER_EDIT } from 'lib/constants';
import Loading from 'components/common/Loading';
import EmptyState from '../../components/common/EmptyState';

const PaymentsList = ({ data, loading, onGetPayments, onSelectUser, onDeleteUser }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  // const [page, setPage] = useState(0);
  // const [size, setSize] = useState(20);
  const [openFilters, setOpenFilters] = useState(false);

  const [filterValues, setFilterValues] = useState({
    username: '',
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
    event.stopPropagation();
    const answer = window.confirm(t('message.user-delete') + ' ' + row.original.username);
    if (answer) {
      onDeleteUser(row.original.username);
      onGetPayments();
    }
  };

  const handleEdit = (event, row) => {
    event.stopPropagation();
    const value = row.original.email;
    const path = USER_EDIT(value);
    onSelectUser(row.original);
    router.push(path);
  };

  const handleAdd = () => {
    router.push(USER_ADD);
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
      Header: t('username'),
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
              onClick={(event) => handleDelete(event, row)}
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
    handleRowClick: (row) => {
      const value = row.original.email;
      const path = USER_DETAIL_PAGE(value);
      onSelectUser(row.original);
      router.push(path);
    },
    onFilter: (
      <div className={`w-full px-6 py-4 ${openFilters && 'flex flex-col'}`}>
        <div className="mb-4">
          <UserFilter open={openFilters} onSubmit={handleFilters} />
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
    </>
  );
};

PaymentsList.propTypes = {
  row: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onGetPayments: PropTypes.func.isRequired,
  onSelectUser: PropTypes.func.isRequired,
  onDeleteUser: PropTypes.func.isRequired
};

const userReducer = 'user';

const mapStateToProps = (state) => ({
  loading: state.getIn([userReducer, 'loading']),
  data: state.getIn([userReducer, 'data']),
  filters: state.getIn([userReducer, 'filters']),
  total: state.getIn([userReducer, 'total'])
});

const mapDispatchToProps = (dispatch) => ({
  onGetPayments: () => dispatch(getPayments()),
  onSelectUser: (user) => dispatch(selectUser(user)),
  onDeleteUser: (username) => dispatch(deleteUser(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentsList);
