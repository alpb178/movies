/* eslint-disable react/display-name */
import EmptyState from '@/components/common/EmptyState';
import Loading from '@/components/common/Loader';
import DeleteConfirmationDialog from '@/components/dialog/DeleteConfirmationDialog';
import DataTable from '@/components/table';
import TableActions from '@/components/table/TableActions';
import useRecipes, { saveRecipe } from '@/hooks/recipe/useRecipes';
import {
  API_RECIPE_URL,
  DEFAULT_PAGE_SIZE,
  DELETE,
  RECIPES_DETAIL_PAGE,
  RECIPES_FORM_PAGE
} from '@/lib/constants';
import { formatPrice } from '@/lib/utils';
import { XCircleIcon } from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import RecipesFilter from './RecipesFilter';

const RecipesList = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);
  const [sort, setSort] = useState();
  const onPageChangeCallback = useCallback(setPage, []);
  const onSortChangeCallback = useCallback(setSort, []);
  const [openFilters, setOpenFilters] = useState(false);
  const queryClient = useQueryClient();
  const [selectedItem, setSelectedItem] = useState();
  const [deleteConfirmation, setDeleteConfirmation] = useState({ open: false, id: null });
  const [loading, setLoading] = useState(false);
  const [filterValues, setFilterValues] = useState({
    country: ''
  });

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

  const { data: recipes, isLoading } = useRecipes({
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
      await saveRecipe({
        args: { id: deleteConfirmation.id },
        options: {
          method: DELETE
        }
      });
      await queryClient.refetchQueries([API_RECIPE_URL]);
      toast(t('deleted.male', { entity: t('recipes', { count: 1 }) }));
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    router.push(RECIPES_FORM_PAGE());
  };

  const onUpdate = (event, row) => {
    event.stopPropagation();
    const value = row.id;
    const path = RECIPES_FORM_PAGE(value);
    router.push(path);
  };

  const formatPriceValue = (value) => <div>{formatPrice(value)}</div>;

  const columns = React.useMemo(() => [
    {
      Header: t('form.common.label.name'),
      accessor: 'name'
    },
    {
      Header: t('form.common.label.price'),
      accessor: 'price',
      Cell: ({ value }) => formatPriceValue(value)
    },
    {
      Header: t('form.common.label.misc-cost'),
      accessor: 'miscCost',
      Cell: ({ value }) => formatPriceValue(value)
    },
    {
      Header: t('form.common.label.count-ingredients'),
      accessor: 'ingredientsCount'
    },
    {
      id: 'optionsRecipes',
      displayName: 'optionsRecipes',
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
    <button type="button" className="btn-contained" onClick={() => handleAdd()}>
      {t('create', { entity: t('recipes', { count: 1 }).toLowerCase() })}
    </button>
  );

  const options = {
    name: t('recipes', { count: 2 }),
    columns,
    data: recipes?.rows,
    count: recipes?.count,
    setPage: onPageChangeCallback,
    setSortBy: onSortChangeCallback,
    pageSize,
    onPageSizeChange: setPageSize,
    onRowClick: (row) => {
      const value = row?.original?.id;
      const path = RECIPES_DETAIL_PAGE(value);
      router.push(path);
    },
    onFilter: (
      <div className={`w-full px-6 ${openFilters && 'flex flex-col'}`}>
        <RecipesFilter open={openFilters} onSubmit={handleFilters} />

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

      {recipes && recipes.rows.length > 0 ? (
        <DataTable {...options} />
      ) : (
        <EmptyState text={t('recipes', { count: 0 })}>{renderCreateButton()}</EmptyState>
      )}

      <DeleteConfirmationDialog
        open={deleteConfirmation.open}
        onOpen={setDeleteConfirmation}
        onDeleteConfirmation={onDeleteConfirmation}
        title={t('delete-title', { entity: t('recipes', { count: 1 }) })}
        content={t('delete-message.female', { entity: t('recipes', { count: 1 }) })}
      />
    </>
  );
};

RecipesList.propTypes = {
  row: PropTypes.object,
  data: PropTypes.object,
  loading: PropTypes.bool,
  onGetRecipes: PropTypes.func,
  onSelectPayment: PropTypes.func,
  onDeletePayment: PropTypes.func
};

export default RecipesList;
