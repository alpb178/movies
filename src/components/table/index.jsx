/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination } from 'react-table';
import { List } from 'immutable';
import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/outline';

const DataTable = ({ columns, data, handleRowClick, onFilter, actions }) => {
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 }
    },
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // Instead of using 'rows', we'll use page which has only the rows for the active page
    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = tableInstance;

  return (
    <div className="w-full bg-white border-b">
      <div className="flex flex-col">
        <div className="flex justify-end w-full p-6 pb-0 text-gray-600">{actions}</div>
        {onFilter}
      </div>

      <table {...getTableProps()} className="w-full">
        <thead className="border-b">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className="px-6 py-5 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                >
                  {column.render('Header')}
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

      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="flex items-center px-4 space-x-2">
        <button
          clasName={`${!canPreviousPage ? 'hover' : ''} border p-2`}
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <ChevronDoubleLeftIcon className="w-6 h-6" />
        </button>{' '}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          <ChevronLeftIcon className="w-6 h-6" />
        </button>{' '}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          <ChevronRightIcon className="w-6 h-6" />
        </button>{' '}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          <ChevronDoubleRightIcon className="w-6 h-6" />
        </button>{' '}
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{' '}
        </span>
        <span>
          | Go to page:{' '}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: '100px' }}
          />
        </span>{' '}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

DataTable.defaultProps = {
  data: List([]),
  handleRowClick: () => {}
};

DataTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.object,
  onFilter: PropTypes.node,
  actions: PropTypes.node,
  handleRowClick: PropTypes.func
};

export default DataTable;
