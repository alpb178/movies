/* eslint-disable react/jsx-key */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { useTable } from 'react-table';
import { List } from 'immutable';

const DataTable = ({ columns, data, handleRowClick, onFilter, actions }) => {
  const tableInstance = useTable({ columns, data });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

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
          {rows.map((row) => {
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
                    className="px-6 py-4 text-gray-800 whitespace-nowrap"
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
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
