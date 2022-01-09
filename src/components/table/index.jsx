/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { usePagination, useSortBy, useTable } from 'react-table';
import { List } from 'immutable';
import Pagination from './Pagination';
import { SortAscendingIcon, SortDescendingIcon } from '@heroicons/react/outline';

const DataTable = ({ columns, data, setSortBy, handleRowClick, onFilter, actions }) => {
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
      manualSortBy: true,
      autoResetSortBy: false,
      autoResetPage: false
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
        <div className="flex justify-end w-full p-6 pb-0 text-gray-600">{actions}</div>
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
                  onClick: () => handleRowClick(row)
                })}
                className={`${handleRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
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

      <Pagination tableInstance={tableInstance} />
    </div>
  );
};

DataTable.defaultProps = {
  data: List([]),
  setSortBy: () => {},
  handleRowClick: () => {}
};

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.object,
  setSortBy: PropTypes.func,
  onFilter: PropTypes.node,
  actions: PropTypes.node,
  handleRowClick: PropTypes.func
};

export default DataTable;
