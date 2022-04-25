/* eslint-disable react/display-name */
import DataTable from '@/components/table';
import TableActions from '@/components/table/TableActions';
import useRoles from '@/hooks/role/useRoles';
import { XCircleIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import DeleteConfirmationDialog from 'components/common/DeleteConfirmationDialog';
import EmptyState from 'components/common/EmptyState';
import Loading from 'components/common/Loading';
import { DEFAULT_PAGE_SIZE, ROLE_ADD, ROLE_EDIT } from 'lib/constants';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import React, { useCallback, useMemo, useState } from 'react';
import RolesFilter from './RolesFilter';
import RolesForm from './RolesForm';

const Roles = () => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sort, setSort] = useState('');
  const onPageChangeCallback = useCallback(setPage, []);
  const onSortChangeCallback = useCallback(setSort, []);
  const [openFilters, setOpenFilters] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null });

  const [filterValues, setFilterValues] = useState({
    measureUnit: ''
  });

  const params = useMemo(() => {
    const query = {};
    if (page !== 0) query.page = page;
    if (sort) query.sort = sort;
    return query;
  }, [filterValues, page, sort]);

  const { data: roles, isLoading } = useRoles({
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
    // onDeleteUser(deleteConfirmation.id);
  };
  const onUpdate = (event, row) => {
    event.stopPropagation();
    const value = row.original.email;
    const path = ROLE_EDIT(value);
    onSelectRole(row.original);
    router.push(path);
  };

  const handleAdd = () => {
    router.push(ROLE_ADD);
  };

  const renderPermissions = (permissions) => (
    <div className="flex space-x-2">
      {permissions?.map((permission) => (
        <span
          key={permission.id}
          className="px-4 py-1 font-medium rounded-full text-secondary-700 bg-secondary-100"
        >
          {t(permission.name.replace(/_/g, '-').toLowerCase())}
        </span>
      ))}
    </div>
  );

  const columns = React.useMemo(() => [
    {
      Header: t('name'),
      accessor: 'name'
    },
    {
      Header: t('permissions', { count: 2 }),
      accessor: 'permissions',
      Cell: ({ value: permissions }) =>
        permissions.length > 0 ? (
          renderPermissions(permissions)
        ) : (
          <p className="text-gray-400">{t('permissions', { count: 0 })}</p>
        )
    },
    {
      id: 'optionsRoles',
      displayName: 'optionsRoles',
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
      {t('roles')}
    </button>
  );

  const options = {
    name: t('roles', { count: 2 }),
    columns,
    data: roles?.rows,
    count: roles?.count,
    setPage: onPageChangeCallback,
    setSortBy: onSortChangeCallback,
    pageSize,
    onPageSizeChange: setPageSize,
    onRowClick: (row) => {},
    onFilter: (
      <div className={clsx('w-full px-6', openFilters && 'flex flex-col')}>
        <RolesFilter open={openFilters} onSubmit={handleFilters} />

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
      {isLoading && <Loading />}

      {roles && roles.rows.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('shipment-items', { count: 0 })}>{renderInsertButton()}</EmptyState>
      )}

      <RolesForm data={{}} open={openForm} onOpen={setOpenForm} />

      <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        onOpen={setDeleteConfirmation}
        onDeleteConfirmation={onDeleteConfirmation}
        title={t('delete-title', { entity: t('roles', { count: 1 }).toLowerCase() })}
        content={t('delete-message.male', { entity: t('roles', { count: 1 }).toLowerCase() })}
      />
    </>
  );
};

export default Roles;
