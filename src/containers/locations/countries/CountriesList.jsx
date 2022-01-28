/* eslint-disable react/display-name */
import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';
import { XCircleIcon } from '@heroicons/react/outline';
import DataTable from '@/components/table';
import Loading from '@/components/common/Loading';
import EmptyState from '@/components/common/EmptyState';
import DeleteConfirmationDialog from '@/components/common/DeleteConfirmationDialog';
import CountriesFilter from '@/containers/locations/countries/CountriesFilter';
import useCountries from '@/hooks/location/country/useCountries';
import { LOCATION_DETAILS_PAGE } from '@/lib/constants';
import CountryForm from './CountryForm';
import TableActions from '@/components/table/TableActions';

const CountriesList = ({ loading }) => {
  const { t } = useTranslation('common');
  const router = useRouter();

  const [openFilters, setOpenFilters] = useState(false);
  const [openForm, setOpenForm] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null });
  const [selectedItem, setSelectedItem] = useState();
  const [filterValues, setFilterValues] = useState({
    name: '',
    code: ''
  });

  useEffect(() => {
    if (!openForm) {
      setSelectedItem(null);
    }
  }, [openForm]);

  const params = useMemo(() => {
    return {};
  }, []);

  const { data: countries } = useCountries({
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
      Header: t('code'),
      accessor: 'code'
    },
    {
      id: 'optionsUsers',
      displayName: 'optionsUsers',
      Cell: ({ row }) => (
        <TableActions
          onEdit={(event) => onUpdate(event, row.original)}
          onDelete={() => setDeleteConfirmation(true)}
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
      {t('add')} {t('countries', { count: 1 }).toLowerCase()}
    </button>
  );

  const options = {
    columns,
    data: countries?.rows,
    name: t('countries', { count: 2 }),
    handleRowClick: (row) => {
      const value = row.original.id;
      const path = LOCATION_DETAILS_PAGE(value);
      router.push(path);
    },
    onFilter: (
      <div className={`w-full px-6 ${openFilters && 'flex flex-col'}`}>
        <CountriesFilter open={openFilters} onSubmit={handleFilters} />

        <div className="flex">
          <FilterCriteria />
        </div>
      </div>
    ),
    actions: (
      <div className="space-x-6">
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
      {loading && <Loading />}

      {countries && countries.rows.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('countries', { count: 0 })}>{renderInsertButton()}</EmptyState>
      )}

      <CountryForm data={selectedItem} open={openForm} onOpen={setOpenForm} />

      <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        onOpen={setDeleteConfirmation}
        onDeleteConfirmation={onDeleteConfirmation}
        title={t('delete', { entity: 'countries' })}
        content={t('asd')}
      />
    </>
  );
};

CountriesList.propTypes = {
  row: PropTypes.object.isRequired,
  data: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  onGetCountries: PropTypes.func.isRequired,
  onSelectCountries: PropTypes.func.isRequired,
  onDeleteCountries: PropTypes.func.isRequired
};

export default CountriesList;
