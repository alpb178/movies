/* eslint-disable react/display-name */
import EmptyState from '@/components/common/EmptyState';
import Loading from '@/components/common/Loader';
import DeleteConfirmationDialog from '@/components/dialog/DeleteConfirmationDialog';
import DataTable from '@/components/table';
import TableActions from '@/components/table/TableActions';
import useMeasureUnits, { saveMeasureUnits } from '@/hooks/measure-unit/useMeasureUnits';
import { API_MEASURE_UNITS_URL, DEFAULT_PAGE_SIZE, DELETE } from '@/lib/constants';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import MeasureUnitsForm from './MeasureUnitForm';

const MeasureUnitsList = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sort, setSort] = useState();
  const onPageChangeCallback = useCallback(setPage, []);
  const onSortChangeCallback = useCallback(setSort, []);
  const [openForm, setOpenForm] = useState(false);
  const queryClient = useQueryClient();
  const [selectedItem, setSelectedItem] = useState();
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null });
  const [loading, setLoading] = useState(false);

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
  }, [page, sort]);

  const { data: measureunits, isLoading } = useMeasureUnits({
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
      await saveMeasureUnits({
        args: { id: deleteConfirmation.id },
        options: {
          method: DELETE
        }
      });
      await queryClient.refetchQueries([API_MEASURE_UNITS_URL]);
      toast(t('deleted.male', { entity: t('measure-units', { count: 1 }) }));
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
      Header: t('name'),
      accessor: 'name'
    },
    {
      Header: t('symbol'),
      accessor: 'symbol'
    },
    {
      id: 'optionsUsers',
      displayName: 'optionsUsers',
      Cell: ({ row }) => (
        <TableActions
          onEdit={(event) => onUpdate(event, row.original)}
          onDelete={(event) => handleDelete(event, row)}
        />
      )
    }
  ]);

  const renderInsertButton = () => (
    <button type="button" className="btn-contained" onClick={() => setOpenForm(true)}>
      {t('create', { entity: t('measure-units', { count: 1 }).toLowerCase() })}
    </button>
  );

  const options = {
    columns,
    data: measureunits?.rows,
    count: measureunits?.count,
    setPage: onPageChangeCallback,
    setSortBy: onSortChangeCallback,
    pageSize,
    onPageSizeChange: setPageSize,
    name: t('measure-units', { count: 2 }),
    actions: <>{renderInsertButton()}</>
  };

  return (
    <>
      {isLoading && <Loading />}

      {measureunits && measureunits.rows.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('measure-units', { count: 0 })}>{renderInsertButton()}</EmptyState>
      )}

      <MeasureUnitsForm
        data={selectedItem}
        open={openForm}
        onOpen={setOpenForm}
        setLoading={setLoading}
      />

      <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        onOpen={setDeleteConfirmation}
        onDeleteConfirmation={onDeleteConfirmation}
        title={t('delete', { entity: 'measure-units' })}
        content={t('delete-message.female', { entity: t('measure-units', { count: 1 }) })}
      />
    </>
  );
};

MeasureUnitsList.propTypes = {
  row: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

export default MeasureUnitsList;
