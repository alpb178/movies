/* eslint-disable react/display-name */
import EmptyState from '@/components/common/EmptyState';
import Loading from '@/components/common/Loader';
import DeleteConfirmationDialog from '@/components/dialog/DeleteConfirmationDialog';
import DataTable from '@/components/table';
import TableActions from '@/components/table/TableActions';
import useProducts, { saveProduct } from '@/hooks/product/useProducts';
import { API_PRODUCTS_CATALOG_URL, DEFAULT_PAGE_SIZE, DELETE } from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { XCircleIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import ProductForm from './ProductForm';
import ProductsFilter from './ProductsFilter';

const ProductsList = () => {
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

  const { data: products, isLoading } = useProducts({
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
      await saveProduct({
        args: { id: deleteConfirmation.id },
        options: {
          method: DELETE
        }
      });
      await queryClient.invalidateQueries([API_PRODUCTS_CATALOG_URL]);
      toast(t('deleted.male', { entity: t('products', { count: 1 }) }));
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

  const formatPriceValue = (value) => (
    <div className="text-left w-28"> {value?.price ? formatPrice(value.price) : '-'} </div>
  );
  const formatCostValue = (value) => (
    <div className="text-left w-28">{formatPrice(value) || 0}</div>
  );
  const formatRecipeGroup = (value) => (
    <div className="text-center w-28">
      {value ? (value.includes('uncategorized') ? '-' : value) : '-'}
    </div>
  );

  const columns = React.useMemo(() => [
    {
      Header: t('form.common.label.name'),
      accessor: 'name'
    },
    {
      Header: t('form.common.label.cost'),
      accessor: 'cost',
      Cell: ({ value }) => formatCostValue(value)
    },
    {
      Header: t('form.common.label.price'),
      accessor: 'menuItem',
      Cell: ({ value }) => formatPriceValue(value)
    },
    {
      Header: t('form.common.label.recipe-group'),
      accessor: 'menuItem.recipeGroup.name',
      Cell: ({ value }) => formatRecipeGroup(value)
    },
    {
      Header: t('measure-units', { count: 1 }),
      accessor: 'measureUnit.name'
    },
    {
      id: 'optionsProducts',
      displayName: 'optionsProducts',
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
    <button type="button" className="btn-contained" onClick={() => setOpenForm(true)}>
      {t('create', { entity: t('products', { count: 1 }).toLowerCase() })}
    </button>
  );

  const options = {
    name: t('products', { count: 2 }),
    columns,
    data: products?.rows,
    count: products?.count,
    setPage: onPageChangeCallback,
    setSortBy: onSortChangeCallback,
    pageSize,
    onPageSizeChange: setPageSize,
    onFilter: (
      <div className={`w-full px-6 ${openFilters && 'flex flex-col'}`}>
        <ProductsFilter open={openFilters} onSubmit={handleFilters} />

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

      {products && products.rows.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('products', { count: 0 })}>{renderCreateButton()}</EmptyState>
      )}

      {openForm && (
        <ProductForm
          data={selectedItem}
          open={openForm}
          onOpen={setOpenForm}
          setLoading={setLoading}
          products={products}
        />
      )}

      <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        onOpen={setDeleteConfirmation}
        onDeleteConfirmation={onDeleteConfirmation}
        title={t('delete-title', { entity: t('products', { count: 1 }) })}
        content={t('delete-message.female', { entity: t('products', { count: 1 }) })}
      />
    </>
  );
};

ProductsList.propTypes = {
  row: PropTypes.object,
  data: PropTypes.object,
  loading: PropTypes.bool,
  onGetProducts: PropTypes.func,
  onSelectPayment: PropTypes.func,
  onDeletePayment: PropTypes.func
};

export default ProductsList;
