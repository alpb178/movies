/* eslint-disable react/display-name */
import EmptyState from '@/components/common/EmptyState';
import Loading from '@/components/common/Loading';
import DeleteConfirmationDialog from '@/components/dialog/DeleteConfirmationDialog';
import DataTable from '@/components/table';
import TableActions from '@/components/table/TableActions';
import useRegions, { saveRegions } from '@/hooks/location/region/useRegions';
import { API_REGIONS_URL, DEFAULT_PAGE_SIZE, DELETE } from '@/lib/constants';
import { XCircleIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import RegionForm from './RegionForm';
import RegionsFilter from './RegionsFilter';

const RegionsList = () => {
  const { t } = useTranslation('common');

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sort, setSort] = useState();
  const onPageChangeCallback = useCallback(setPage, []);
  const onSortChangeCallback = useCallback(setSort, []);
  const [openFilters, setOpenFilters] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const queryClient = useQueryClient();
  const [selectedItem, setSelectedItem] = useState();
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null });
  const [loading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState({
    country: ''
  });

  useEffect(() => {
    if (!openForm) {
      setSelectedItem(null);
    }
  }, [openForm]);

  const params = useMemo(() => {
    const query = {};
    if (page !== 0) query.page = page;
    if (sort) query.sort = sort;
    return query;
  }, [filterValues, page, sort]);

  const { data: regions, isLoading } = useRegions({
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
      await saveRegions({
        args: { id: deleteConfirmation.id },
        options: {
          method: DELETE
        }
      });
      await queryClient.refetchQueries([API_REGIONS_URL]);
      toast(t('deleted.male', { entity: t('regions', { count: 1 }) }));
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = (event, item) => {
    event.stopPropagation();
    setSelectedItem(item);
    setOpenForm(true);
  };

  const columns = React.useMemo(() => [
    {
      Header: t('code'),
      accessor: 'code'
    },
    {
      Header: t('name'),
      accessor: 'name'
    },
    {
      Header: t('countries', { count: 1 }),
      accessor: 'country',
      Cell: ({ row }) => row.original.country.name
    },
    {
      id: 'optionsRegions',
      displayName: 'optionsRegions',
      Cell: ({ row }) => (
        <TableActions
          onEdit={(event) => onUpdate(event, row.original)}
          onDelete={(event) => handleDelete(event, row)}
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
            <button type="button" id={filterValues[e]} onClick={() => onFilterChange(e)}>
              <XCircleIcon className="w-6 h-6 ml-2 float-center" />
            </button>
          </div>
        )
    );

  const handleFilters = (values) => {
    setFilterValues(values);
  };

  const onFilterChange = (value) => {
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

  const renderCreateButton = () => (
    <button type="button" className="btn-outlined" onClick={() => setOpenForm(true)}>
      {t('create', { entity: t('regions', { count: 1 }) })}
    </button>
  );

  const options = {
    name: t('regions', { count: 2 }),
    columns,
    data: regions?.rows,
    count: regions?.count,
    setPage: onPageChangeCallback,
    setSortBy: onSortChangeCallback,
    pageSize,
    onPageSizeChange: setPageSize,
    onFilter: (
      <div className={`w-full px-6 ${openFilters && 'flex flex-col'}`}>
        <RegionsFilter open={openFilters} onSubmit={handleFilters} />

        <div className="flex">
          <FilterCriteria />
        </div>
      </div>
    ),
    actions: (
      <div className="space-x-4">
        {/* <button
          type="button"
          className="px-6 py-2 text-lg font-medium bg-white border rounded-md w-max hover:bg-gray-100"
          onClick={() => setOpenFilters(!openFilters)}
        >
          {t('filter')}
        </button>*/}
        {renderCreateButton()}
      </div>
    )
  };

  return (
    <>
      {(loading || isLoading) && <Loading />}

      {regions && regions.rows.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('regions', { count: 0 })}>{renderCreateButton()}</EmptyState>
      )}

      <RegionForm
        data={selectedItem}
        open={openForm}
        onOpen={setOpenForm}
        setLoading={setLoading}
      />

      <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        onOpen={setDeleteConfirmation}
        onDeleteConfirmation={onDeleteConfirmation}
        title={t('delete-title', { entity: t('regions', { count: 1 }) })}
        content={t('delete-message.female', { entity: t('regions', { count: 1 }) })}
      />
    </>
  );
};

RegionsList.propTypes = {
  row: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onGetRegions: PropTypes.func.isRequired,
  onSelectPayment: PropTypes.func.isRequired,
  onDeletePayment: PropTypes.func.isRequired
};

export default RegionsList;
