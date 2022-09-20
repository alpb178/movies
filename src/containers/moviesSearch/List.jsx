/* eslint-disable react/display-name */
import EmptyState from '@/components/common/EmptyState';
import Loading from '@/components/common/Loader';
import DataTable from '@/components/table';
import Deatils from '@/containers/moviesBillboard/Details';
import usesearchMovies from '@/hooks/searchMovies/useSearchMovies';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
import { XCircleIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Filter from './Filter';

const List = () => {
  const { t } = useTranslation('common');
  const [with_genres] = useState(28);
  const [sort_by, setSort_by] = useState('popularity.asc');
  const [include_adult, setInclude_video] = useState('popularity.asc');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sort, setSort] = useState();
  const onPageChangeCallback = useCallback(setPage, []);
  const onSortChangeCallback = useCallback(setSort, []);
  const [openForm, setOpenForm] = useState(false);
  const [api_key, setApiKey] = useState('45bf6592c14a965b33549f4cc7e6c664');
  const [selectedItem, setSelectedItem] = useState();
  const [loading, setLoading] = useState(false);
  const [openFilters, setOpenFilters] = useState(true);
  const [filterValues, setFilterValues] = useState({
    name: ''
  });

  useEffect(() => {
    if (!openForm) {
      setSelectedItem(null);
    }
  }, [openForm]);

  const params = useMemo(() => {
    const queryParams = {};
    if (api_key) {
      queryParams.api_key = api_key;
    }
    if (filterValues.name !== '') {
      queryParams.query = filterValues.name;
    }
    if (page) {
      queryParams.page = page;
    }

    return queryParams;
  }, [filterValues, api_key, page, sort_by]);

  const { data, isLoading } = usesearchMovies({
    args: params,
    options: {
      keepPreviousData: true,
      enabled: filterValues.name !== ''
    }
  });

  const onUpdate = (item) => {
    setSelectedItem(item);
    setOpenForm(true);
  };

  const FilterCriteria = () => {};
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

  const formatImage = (value) => (
    <Image
      layout="intrinsic"
      width={72}
      height={72}
      className="rounded-full"
      src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${value}`}
      alt=""
    />
  );
  const columns = React.useMemo(() => [
    {
      Header: '',
      accessor: 'backdrop_path',
      Cell: ({ value }) => formatImage(value)
    },
    {
      Header: t('form.common.label.name'),
      accessor: 'original_title'
    }
  ]);

  const options = {
    name: '',
    columns,
    data: data?.results,
    count: data?.results?.length,
    setPage: onPageChangeCallback,
    setSortBy: onSortChangeCallback,
    pageSize,
    onPageSizeChange: setPageSize,
    onRowClick: (row) => {
      onUpdate(row);
    }
  };

  return (
    <>
      {(loading || isLoading) && <Loading />}
      {console.log(data?.results?.length)}

      <div className={`w-full px-6 py-4 ${openFilters && 'flex flex-col'}`}>
        <div className="mb-4">
          <Filter open={openFilters} onSubmit={handleFilters} />
        </div>
        <div className="flex">
          <FilterCriteria />
        </div>
      </div>

      {data && data?.results?.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('search', { count: 0 })}></EmptyState>
      )}

      {openForm && <Deatils data={selectedItem} open={openForm} onOpen={setOpenForm} />}
    </>
  );
};

export default List;
