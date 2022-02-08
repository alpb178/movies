/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
import { SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/outline';
import clsx from 'clsx';
import { List } from 'immutable';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';
import Pagination from './Pagination';

const DataTable = ({
  actions,
  columns,
  count,
  data,
  onRowClick,
  hiddenColumns,
  name,
  onFilter,
  onPageSizeChange,
  pageSize,
  setSortBy
}) => {
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { hiddenColumns, pageIndex: 0, pageSize },
      manualPagination: true,
      manualSortBy: true,
      autoResetSortBy: false,
      autoResetPage: false,
      pageCount: Math.ceil(count / pageSize)
    },
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { pageIndex, sortBy }
  } = tableInstance;

  useEffect(() => {
    const sortStr = sortBy.map((c) => `${c.id}:${c.desc ? 'desc' : 'asc'}`).join(',');
    setSortBy(sortStr);
  }, [pageIndex, sortBy]);

  return (
    <div className="w-full bg-white border-b">
      <div className="flex flex-col">
        <div
          className={clsx(
            'flex items-center w-full p-6 pb-0 text-gray-600',
            name ? 'justify-between' : 'justify-end'
          )}
        >
          {name ? <h3 className="mb-8 text-xl font-medium lg:text-3xl">{name}</h3> : null}
          <div className="flex justify-end w-ful">{actions}</div>
        </div>
        {onFilter}
      </div>

      <table {...getTableProps()} className="w-full border-b">
        <thead className="border-b">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps([
                    {
                      className: column.className,
                      style: column.style
                    },
                    column.getSortByToggleProps()
                  ])}
                  className="px-6 py-5 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  <div className="flex items-center group">
                    {column.render('Header')}

                    <span className="ml-2">
                      {column.isSorted ? (
                        column.isSortedDesc ? (
                          <SortDescendingIcon className="w-5 h-5" />
                        ) : (
                          <SortAscendingIcon className="w-5 h-5" />
                        )
                      ) : column.canSort ? (
                        <SortAscendingIcon className="w-5 h-5 transition-opacity duration-150 ease-in opacity-50 lg:opacity-0 lg:group-hover:opacity-50" />
                      ) : (
                        ''
                      )}
                    </span>
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="divide-y">
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps({
                  onClick: () => onRowClick(row)
                })}
                className={`${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
              >
                {row.cells.map((cell) => (
                  <td
                    {...cell.getCellProps()}
                    className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap xl:text-base"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>

      <Pagination tableInstance={tableInstance} onPageSizeChange={onPageSizeChange} />
    </div>
  );
};

DataTable.defaultProps = {
  data: List([]),
  onRowClick: () => {},
  hiddenColumns: [],
  name: '',
  setSortBy: () => {}
};

DataTable.propTypes = {
  count: PropTypes.number.isRequired,
  columns: PropTypes.array.isRequired,
  data: PropTypes.object,
  setSortBy: PropTypes.func,
  name: PropTypes.string,
  onFilter: PropTypes.node,
  actions: PropTypes.node,
  onRowClick: PropTypes.func,
  hiddenColumns: PropTypes.array
};

export default DataTable;
