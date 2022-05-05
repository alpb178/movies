import DataTable from '@/components/table';
import TableActions from '@/components/table/TableActions';
import useUsers from '@/hooks/user/useUsers';
import { CheckCircleIcon, ClockIcon, XCircleIcon } from '@heroicons/react/outline';
import DeleteConfirmationDialog from 'components/common/DeleteConfirmationDialog';
import EmptyState from 'components/common/EmptyState';
import Loading from 'components/common/Loading';
import UserFilter from 'containers/users/UserFilter';
import { DEFAULT_PAGE_SIZE, USER_DETAIL_PAGE, USER_FORM_PAGE } from 'lib/constants';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';

const UsersList = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sort, setSort] = useState('');
  const onPageChangeCallback = useCallback(setPage, []);
  const onSortChangeCallback = useCallback(setSort, []);
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

  const params = useMemo(() => {
    const query = {};
    if (page !== 0) query.page = page;
    if (sort) query.sort = sort;
    return query;
  }, [filterValues, page, sort]);

  const { data: users, isLoading } = useUsers({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  const onDelete = (event, row) => {
    event.stopPropagation();
    setDeleteConfirmation({ open: true, id: row.original.id });
  };

  const onDeleteConfirmation = () => {
    //  onDeleteUser(deleteConfirmation.id);
  };

  const onUpdate = (event, row) => {
    event.stopPropagation();
    const value = row.original.id;
    const path = USER_FORM_PAGE(value);
    router.push(path);
  };

  const handleAdd = () => {
    router.push(USER_FORM_PAGE());
  };

  const renderRoles = (roles) => (
    <div className="flex space-x-2">
      {roles?.map((role) => (
        <span
          key={role.id}
          className="px-4 py-1 font-medium rounded-full text-secondary-700 bg-secondary-100"
        >
          {t(role.name.replace(/_/g, '-').toLowerCase())}
        </span>
      ))}
    </div>
  );

  const renderStatus = (status) => {
    switch (status) {
      case 'ACTIVE':
        return <CheckCircleIcon className="w-6 h-6 text-green-700" />;
      case 'PENDING':
        return <ClockIcon className="w-6 h-6 text-green-700" />;

      default:
        return <XCircleIcon className="w-6 h-6 text-red-600" />;
    }
  };
  const columns = React.useMemo(() => [
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
      accessor: 'status',
      Cell: ({ cell }) => renderStatus(cell.row.original.status)
    },
    {
      Header: t('roles', { count: 2 }),
      accessor: 'roles',
      Cell: ({ value: roles }) => renderRoles(roles)
    },
    {
      id: 'optionsUsers',
      displayName: 'optionsUsers',
      Cell: ({ row }) => {
        return (
          <TableActions
            onEdit={(event) => onUpdate(event, row)}
            onDelete={(event) => onDelete(event, row)}
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
    <button type="button" className="btn-outlined" onClick={() => handleAdd()}>
      {t('add')} {t('users', { count: 1 }).toLowerCase()}
    </button>
  );

  const options = {
    name: t('users', { count: 2 }),
    columns,
    data: users?.rows,
    count: users?.count,
    setPage: onPageChangeCallback,
    setSortBy: onSortChangeCallback,
    pageSize,
    onPageSizeChange: setPageSize,
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
      <div className="space-x-4">
        <button
          type="button"
          className="px-6 py-2 font-medium bg-white border rounded-md w-max hover:bg-gray-100"
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
      {isLoading && <Loading />}

      {users && users.rows.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('users', { count: 0 })}>{renderInsertButton()}</EmptyState>
      )}

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

UsersList.propTypes = {
  row: PropTypes.object.isRequired
};

export default UsersList;
