/* eslint-disable react/display-name */
import DataTable from '@/components/table';
import TableActions from '@/components/table/TableActions';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/outline';
import DeleteConfirmationDialog from 'components/common/DeleteConfirmationDialog';
import EmptyState from 'components/common/EmptyState';
import Loading from 'components/common/Loading';
import UserFilter from 'containers/users/UserFilter';
import { USER_ADD, USER_DETAIL_PAGE, USER_EDIT } from 'lib/constants';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { deleteUser, getUsers, selectUser } from 'redux/actions';

const Users = ({ data, loading, onGetUsers, onSelectUser, onDeleteUser }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  // const [page, setPage] = useState(0);
  // const [size, setSize] = useState(20);
  const [openFilters, setOpenFilters] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null });

  const [filterValues, setFilterValues] = useState({
    username: '',
    surname: '',
    name: '',
    phone: '',
    email: '',
    roles: ''
  });

  useEffect(() => {
    onGetUsers();
  }, []);

  const onDelete = (event, row) => {
    event.stopPropagation();
    setDeleteConfirmation({ open: true, id: row.original.id });
  };

  const onDeleteConfirmation = () => {
    onDeleteUser(deleteConfirmation.id);
  };

  const onUpdate = (event, row) => {
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
      accessor: 'username'
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
      Header: t('roles', { count: 2 }),
      accessor: 'authorities',
      Cell: ({ value: roles }) => renderRoles(roles)
    },
    {
      id: 'optionsUsers',
      displayName: 'optionsUsers',
      Cell: ({ row }) => {
        return (
          <TableActions
            onEdit={(event) => onUpdate(event, row.original)}
            onDelete={(event) => onDelete(event, row.original)}
          />
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
    setFilterValues(values, onGetUsers(values));
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
    onGetUsers(updatedFilters);
    setFilterValues((prevState) => ({ ...prevState, [value]: '' }));
  };

  const options = {
    columns,
    data: data?.toJS().rows,
    onRowClick: (row) => {
      const value = row.original.id;
      const path = USER_DETAIL_PAGE(value);
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
        <button
          type="button"
          className="p-2 px-6 py-2 ml-4 font-medium bg-white border rounded-md w-max hover:bg-gray-100"
          onClick={() => handleAdd()}
        >
          {t('add')} {t('users', { count: 1 }).toLowerCase()}
        </button>
      </>
    )
  };

  return (
    <>
      {loading && <Loading />}

      {data ? <DataTable {...options} /> : <EmptyState text={t('users', { count: 0 })} />}

      <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        onOpen={setDeleteConfirmation}
        onDeleteConfirmation={onDeleteConfirmation}
        title={t('delete-title', { entity: t('users', { count: 1 }).toLowerCase() })}
        content={t('delete-message.male', { entity: t('users', { count: 1 }).toLowerCase() })}
      />
    </>
  );
};

Users.propTypes = {
  row: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onGetUsers: PropTypes.func.isRequired,
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
  onGetUsers: (user) => dispatch(getUsers(user)),
  onSelectUser: (user) => dispatch(selectUser(user)),
  onDeleteUser: (username) => dispatch(deleteUser(username))
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);
