/* eslint-disable react/display-name */
import DeleteConfirmationDialog from '@/components/common/DeleteConfirmationDialog';
import EmptyState from '@/components/common/EmptyState';
import Loading from '@/components/common/Loading';
import FormDialogWrapper from '@/components/form/FormDialogWrapper';
import DataTable from '@/components/table';
import useMeasureUnits from '@/hooks/measure-unit/useMeasureUnits';
import { LOCATION_DETAILS_PAGE, MEASUREUNITS_EDIT } from '@/lib/constants';
import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';
import CountryForm from './MeasureUnitForm';

const MeasureUnitsList = ({ loading }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [openFilters, setOpenFilters] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null });

  const [filterValues, setFilterValues] = useState({
    name: '',
    symbol: ''
  });

  const params = useMemo(() => {
    return {};
  }, []);

  const { data: measureunits } = useMeasureUnits({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  const handleDelete = (event, row) => {
    event.stopPropagation();
    setDeleteConfirmation({ open: true, id: row.original.login });
  };

  const onDeleteConfirmation = () => {
    console.log();
  };

  const handleEdit = (event, row) => {
    event.stopPropagation();
    const value = row.original.email;
    const path = MEASUREUNITS_EDIT(value);
    router.push(path);
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
              onClick={(event) => handleDelete(event, row)}
            >
              <TrashIcon className="w-6 h-6" />
            </button>
          </div>
        );
      }
    }
  ]);

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
    onGetMeasureUnits(updatedFilters);
    setFilterValues((prevState) => ({ ...prevState, [value]: '' }));
  };

  const renderInsertButton = () => (
    <button type="button" className="btn-outlined" onClick={() => setOpenForm(true)}>
      {t('add')} {t('measure-units', { count: 1 }).toLowerCase()}
    </button>
  );

  const options = {
    columns,
    data: measureunits,
    handleRowClick: (row) => {
      const value = row.original.id;
      const path = LOCATION_DETAILS_PAGE(value);
      router.push(path);
    },
    actions: <>{renderInsertButton()}</>
  };

  return (
    <>
      {loading && <Loading />}

      {measureunits && measureunits.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('measure-units', { count: 0 })}>{renderInsertButton()}</EmptyState>
      )}

      <FormDialogWrapper open={openForm} onOpen={setOpenForm}>
        <CountryForm />
      </FormDialogWrapper>

      <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        onOpen={setDeleteConfirmation}
        onDeleteConfirmation={onDeleteConfirmation}
        title={t('delete', { entity: 'measureunits' })}
        content={t('asd')}
      />
    </>
  );
};

MeasureUnitsList.propTypes = {
  row: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onGetMeasureUnits: PropTypes.func.isRequired,
  onSelectMeasureUnits: PropTypes.func.isRequired,
  onDeleteMeasureUnits: PropTypes.func.isRequired
};

export default MeasureUnitsList;
