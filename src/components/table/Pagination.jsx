import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/outline';
import useTranslation from 'next-translate/useTranslation';
import PropTypes from 'prop-types';

function Pagination({ tableInstance, pageSizes, onPageSizeChange }) {
  const { t } = useTranslation('common');

  const {
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
    <div className="flex items-center justify-end px-2 m-4 space-x-8">
      {/* <span>
        Go to page:{' '}
        <input
          type="number"
          defaultValue={pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            gotoPage(page);
          }}
          style={{ width: '56px' }}
        />
      </span> */}
      <div className="flex items-center space-x-2">
        <p>{t('table.rows-per-page')}</p>
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            onPageSizeChange(Number(e.target.value));
          }}
          className="bg-gray-100 border-0 rounded-md"
        >
          {pageSizes.map((pSize) => (
            <option key={pSize} value={pSize}>
              {pSize}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <button
          className={`${
            !canPreviousPage ? 'hover:cursor-not-allowed' : ''
          } hover:bg-gray-100 rounded p-2`}
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          <ChevronDoubleLeftIcon
            className={`w-6 h-6 ${canPreviousPage ? 'text-gray-800' : 'text-gray-400'}`}
          />
        </button>
        <button
          className={`${
            !canPreviousPage ? 'hover:cursor-not-allowed' : ''
          } hover:bg-gray-100 rounded p-2`}
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          <ChevronLeftIcon
            className={`w-6 h-6 ${canPreviousPage ? 'text-gray-800' : 'text-gray-400'}`}
          />
        </button>
        <span>
          {t('table.page-count', { currentPage: pageIndex + 1, lastPage: pageOptions.length })}
        </span>
        <button
          className={`${
            !canNextPage ? 'hover:cursor-not-allowed' : ''
          } hover:bg-gray-100 rounded p-2`}
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          <ChevronRightIcon
            className={`w-6 h-6 ${canNextPage ? 'text-gray-800' : 'text-gray-400'}`}
          />
        </button>
        <button
          className={`${
            !canNextPage ? 'hover:cursor-not-allowed' : ''
          } hover:bg-gray-100 rounded p-2`}
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          <ChevronDoubleRightIcon
            className={`w-6 h-6 ${canNextPage ? 'text-gray-800' : 'text-gray-400'}`}
          />
        </button>
      </div>
    </div>
  );
}

Pagination.defaultProps = {
  pageSizes: [10, 20, 30, 40, 50]
};

Pagination.propTypes = {
  tableInstance: PropTypes.object.isRequired,
  pageSizes: PropTypes.array,
  onPageSizeChange: PropTypes.func
};

export default Pagination;
