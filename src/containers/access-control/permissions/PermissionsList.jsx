/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/display-name */
import Loading from '@/components/common/Loader';
import DeleteConfirmationDialog from '@/components/dialog/DeleteConfirmationDialog';
import DataTable from '@/components/table';
import TableActions from '@/components/table/TableActions';
import usePermissions, { savePermission } from '@/hooks/permission/usePermissions';
import { XCircleIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import EmptyState from 'components/common/EmptyState';
import { API_PERMISSIONS_URL, DEFAULT_PAGE_SIZE, DELETE } from 'lib/constants';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import ResourcesList from '../resources/ResourcesList';
import PermissionsFilter from './PermissionsFilter';
import PermissionsForm from './PermissionsForm';

const Permissions = () => {
  const { t } = useTranslation('common');
  const queryClient = useQueryClient();
  const [openFilters, setOpenFilters] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null });
  const [selectedItem, setSelectedItem] = useState();
  const [filterValues, setFilterValues] = useState({
    actions: ''
  });
  const [loading, setLoading] = useState(isLoading);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sort, setSort] = useState();
  const onPageChangeCallback = useCallback(setPage, []);
  const onSortChangeCallback = useCallback(setSort, []);

  const params = useMemo(() => {
    const query = {};
    if (page !== 0) query.page = page;
    if (sort) query.sort = sort;
    return query;
  }, [filterValues, page, sort]);

  const { data: permissions, isLoading } = usePermissions({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  const onDelete = (event, row) => {
    event.stopPropagation();
    setDeleteConfirmation({ open: true, id: row.original.id });
  };

  const onDeleteConfirmation = async () => {
    try {
      setLoading(true);
      await savePermission({
        args: { id: deleteConfirmation.id },
        options: {
          method: DELETE
        }
      });
      await queryClient.refetchQueries([API_PERMISSIONS_URL]);
      toast(t('deleted.male', { entity: t('permission', { count: 1 }) }));
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = (event, item) => {
    event.stopPropagation();
    setSelectedItem(item.original);
    setOpenForm(true);
  };

  const columns = useMemo(() => [
    {
      Header: t('action'),
      accessor: 'action'
    },
    {
      Header: t('resources', { count: 1 }),
      accessor: 'resource',
      Cell: ({ value: resource }) => t(resource?.name, { count: 2 })
    },
    {
      id: 'optionsPermissions',
      displayName: 'optionsPermissions',
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
    <button type="button" className="btn-contained" onClick={() => setOpenForm(true)}>
      {t('create', { entity: t('permissions', { count: 1 }).toLowerCase() })}
    </button>
  );

  const options = {
    name: t('permissions', { count: 2 }),
    columns,
    data: permissions?.rows,
    count: permissions?.count,
    setPage: onPageChangeCallback,
    setSortBy: onSortChangeCallback,
    pageSize,
    onPageSizeChange: setPageSize,
    onRowClick: () => null, // TODO: Here we show details view
    onFilter: (
      <div className={clsx('w-full px-6', openFilters && 'flex flex-col')}>
        <PermissionsFilter open={openFilters} onSubmit={handleFilters} />

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

      <div className="flex space-x-8">
        <div className="w-full">
          {permissions && permissions.rows.length > 0 ? (
            <DataTable {...options} />
          ) : (
            <EmptyState text={t('shipment-items', { count: 0 })}>{renderInsertButton()}</EmptyState>
          )}
        </div>

        <div className="w-1/2 max-w-md">
          <ResourcesList />
        </div>
      </div>

      <PermissionsForm
        data={selectedItem}
        onLoading={setLoading}
        onOpen={setOpenForm}
        open={openForm}
      />

      <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        onOpen={setDeleteConfirmation}
        onDeleteConfirmation={onDeleteConfirmation}
        title={t('delete-title', { entity: t('permissions', { count: 1 }).toLowerCase() })}
        content={t('delete-message.male', { entity: t('permissions', { count: 1 }).toLowerCase() })}
      />
    </>
  );
};

Permissions.propTypes = {
  row: PropTypes.object
};

export default Permissions;
