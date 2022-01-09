/* eslint-disable react/display-name */
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { TrashIcon, PencilIcon, XCircleIcon } from '@heroicons/react/outline';
import DataTable from '@/components/table';
import Loading from '@/components/common/Loading';
import EmptyState from '@/components/common/EmptyState';
import DeleteConfirmationDialog from '@/components/common/DeleteConfirmationDialog';
import useMeasureUnits from '@/hooks/measure-unit/useMeasureUnits';
import { MEASUREUNITS_EDIT, LOCATION_DETAILS_PAGE } from '@/lib/constants';
import CountryForm from './MeasureUnitForm';
import FormDialogWrapper from '@/components/form/FormDialogWrapper';

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

  const options = {
    columns,
    data: measureunits,
    handleRowClick: (row) => {
      const value = row.original.id;
      const path = LOCATION_DETAILS_PAGE(value);
      router.push(path);
    },
    actions: (
      <>
        <button
          type="button"
          className="p-2 px-6 py-2 ml-4 font-medium bg-white border rounded-md w-max hover:bg-gray-100"
          onClick={() => setOpenForm(true)}
        >
          {t('add')} {t('measure-units', { count: 1 }).toLowerCase()}
        </button>
      </>
    )
  };

  return (
    <>
      {loading && <Loading />}

      {measureunits && measureunits.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('measureunits', { count: 0 })}>
          <button
            type="button"
            className="px-4 py-2 my-8 text-lg text-white rounded-md bg-secondary-500"
            onClick={() => setOpenForm(true)}
          >
            {t('add')} {t('measureunits', { count: 1 }).toLowerCase()}
          </button>
        </EmptyState>
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
