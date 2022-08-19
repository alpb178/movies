import Loading from '@/components/common/Loader';
import DeleteConfirmationDialog from '@/components/dialog/DeleteConfirmationDialog';
import DataTable from '@/components/table';
import TableActions from '@/components/table/TableActions';
import useUsers, { saveUser } from '@/hooks/user/useUsers';
import { locales, lottieOptions } from '@/lib/utils';
import { XCircleIcon } from '@heroicons/react/outline';
import EmptyState from 'components/common/EmptyState';
import UserFilter from 'containers/users/UserFilter';
import { format } from 'date-fns';
import {
  API_USERS_URL,
  DEFAULT_PAGE_SIZE,
  DELETE,
  USER_DETAIL_PAGE,
  USER_FORM_PAGE
} from 'lib/constants';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import Lottie from 'react-lottie';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const UsersList = () => {
  const { t, lang } = useTranslation('common');
  const router = useRouter();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sort, setSort] = useState('');
  const onPageChangeCallback = useCallback(setPage, []);
  const onSortChangeCallback = useCallback(setSort, []);
  const queryClient = useQueryClient();
  const [loading, setLoading] = useState(false);
  const [openFilters] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null });

  const [filterValues, setFilterValues] = useState({
    username: '',
    surname: '',
    name: '',
    phone: '',
    email: ''
  });

  const locale = {
    ...locales[lang]
  };

  const params = useMemo(() => {
    const queryParams = {};

    if (page) {
      queryParams.page = page;
    }
    if (pageSize) {
      queryParams.size = pageSize;
    }
    if (sort) {
      queryParams.sort = sort;
    }
    return queryParams;
  }, [filterValues, page, pageSize, sort]);

  const { data: users, isLoading } = useUsers({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  const handleDelete = (event, row) => {
    event.stopPropagation();
    setDeleteConfirmation({ open: true, id: row.original.id });
  };

  const onDeleteConfirmation = async () => {
    try {
      setLoading(true);
      await saveUser({
        args: { id: deleteConfirmation.id },
        options: {
          method: DELETE
        }
      });
      await queryClient.refetchQueries([API_USERS_URL]);
      toast(t('deleted.male', { entity: t('users', { count: 1 }) }));
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
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

  const formatDate = (value) => <div>{format(new Date(value), 'PP', { locale })}</div>;

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
      Header: t('phone'),
      accessor: 'mobile'
    },
    {
      Header: t('create-at'),
      accessor: 'createdAt',
      Cell: ({ value }) => formatDate(value)
    },
    {
      id: 'optionsUsers',
      displayName: 'optionsUsers',
      Cell: ({ row }) => {
        return (
          <TableActions
            onEdit={(event) => onUpdate(event, row)}
            onDelete={(event) => handleDelete(event, row)}
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
    <button type="button" className="btn-contained" onClick={() => handleAdd()}>
      {t('create', { entity: t('users', { count: 1 }).toLowerCase() })}
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
      const value = row?.original?.id;
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
        {/*
          <button
            type="button"
            className="px-6 py-2 font-medium bg-white border rounded-md w-max hover:bg-gray-100"
            onClick={() => setOpenFilters(!openFilters)}
          >
            {t('filter')}
          </button>
    */}
        {renderInsertButton()}
      </div>
    )
  };

  return (
    <>
      {(isLoading || loading) && <Loading />}
      {users && users?.rows?.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('users', { count: 0 })}>
          {renderInsertButton()}
          <div className="flex items-center justify-center h-64 w-max">
            <Lottie options={lottieOptions('offline')} />
          </div>
        </EmptyState>
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
  row: PropTypes.object
};

export default UsersList;
