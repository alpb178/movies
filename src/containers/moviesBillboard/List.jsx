/* eslint-disable react/display-name */
import EmptyState from '@/components/common/EmptyState';
import Loading from '@/components/common/Loader';
import DataTable from '@/components/table';
import Deatils from '@/containers/moviesBillboard/Details';
import useBillboardMovies from '@/hooks/billboardMovies/useBillboardMovies';
import { DEFAULT_PAGE_SIZE } from '@/lib/constants';
import useTranslation from 'next-translate/useTranslation';
import Image from 'next/image';
import React, { useCallback, useEffect, useMemo, useState } from 'react';

const List = () => {
  const { t } = useTranslation('common');

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sort, setSort] = useState();
  const onPageChangeCallback = useCallback(setPage, []);
  const onSortChangeCallback = useCallback(setSort, []);
  const [openForm, setOpenForm] = useState(false);
  const [api_key, setApiKey] = useState('45bf6592c14a965b33549f4cc7e6c664');
  const [selectedItem, setSelectedItem] = useState();
  const [loading, setLoading] = useState(false);

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

    return queryParams;
  }, [api_key, page, pageSize, sort]);

  const { data, isLoading } = useBillboardMovies({
    args: params,
    options: {
      keepPreviousData: true
    }
  });

  const onUpdate = (item) => {
    setSelectedItem(item);
    setOpenForm(true);
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
    name: t('billboard-movie', { count: 2 }),
    columns,
    data: data?.results,
    count: data?.results.length,
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
      {isLoading && <Loading />}

      {data && data?.results?.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('billboard-movie', { count: 0 })}></EmptyState>
      )}

      {openForm && (
        <Deatils data={selectedItem} open={openForm} onOpen={setOpenForm} setLoading={setLoading} />
      )}
    </>
  );
};

export default List;
